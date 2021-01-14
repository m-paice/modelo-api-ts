import { Router } from 'express';
import { uniq } from 'lodash';

import debitoResource from '../../../resource/Debito';
import usuarioResource from '../../../resource/Usuario';
import consumidorResource from '../../../resource/Consumidor';
import lojistaResource from '../../../resource/Lojista';
import reguaNegociacaoResource from '../../../resource/ReguaNegociacao';

// utils
import generateDate from '../../../utils/generateDate';
import queuedAsyncMap from '../../../utils/queuedAsyncMap';

import upload from '../../../services/multer';
import readingCsv from '../../../services/readingCsv';
import { DebitsData, RuleData } from '../../../utils/interfaces/readingCsv';

// middleware of the admin
import authAdmin from '../../../middleware/authAdmin';

const router = Router();

router.post(
  '/carregar-regras',
  authAdmin,
  upload.single('file'),
  async (req, res) => {
    const data = await readingCsv(req.file.path);

    data
      .map((item: RuleData) => ({
        IDADE_DIVIDA: Number(item.IDADE_DIVIDA),
        DESCONTO: Number(item.DESCONTO.replace('%', '').replace(',', '.')),
        MAXIMO_PARCELAS: Number(item.MAXIMO_PARCELAS),
        ATENUADOR: Number(item.ATENUADOR.replace('%', '')),
        MULTA: Number(item.MULTA.replace('%', '')),
        JUROS: Number(item.JUROS.replace('%', '').replace(',', '.')),
        ASSESSORIA: Number(item.ASSESSORIA.replace('%', '')),
        REAJUSTE: Number(item.REAJUSTE.replace('%', '').replace(',', '.')),
      }))
      .forEach(async (item) => {
        await reguaNegociacaoResource.create({
          idadeDivida: Number(item.IDADE_DIVIDA),
          desconto: Number(item.DESCONTO),
          maximoParcela: Number(item.MAXIMO_PARCELAS),
          atenuador: Number(item.ATENUADOR),
          multa: Number(item.MULTA),
          juros: Number(item.JUROS),
          assessoria: Number(item.ASSESSORIA),
          reajuste: Number(item.REAJUSTE),
        });
      });

    return res.json({ message: 'ok' });
  }
);

router.post(
  '/carregar-debitos',
  authAdmin,
  upload.single('file'),
  async (req, res) => {
    const data = await readingCsv(req.file.path);

    const usersConsumers = uniq(data.map((i: DebitsData) => i.DOCUMENTO));
    const usersShookeepers = uniq(data.map((i: DebitsData) => i.CNPJ));

    const createUserConsumer = async (login: string) => {
      // TODO: don't emit CREATED event
      const response = await usuarioResource.create({
        login,
        ativo: false,
      });

      return response;
    };

    const createUserShookeeper = async (login: string) => {
      // TODO: don't emit CREATED event
      const response = await usuarioResource.create({
        login,
        ativo: false,
      });

      return response;
    };

    const createConsumer = async (cpf: string, usuarioId: string) => {
      const response = await consumidorResource.create({
        usuarioId,
        cpf,
      });

      return response;
    };

    const createShopkeeper = async (cnpj: string, usuarioId: string) => {
      const response = await lojistaResource.create({
        usuarioId,
        cnpj,
      });

      return response;
    };

    const createDebit = async (item: DebitsData) => {
      // find consumer
      const consumer = await consumidorResource.findOne({
        where: {
          cpf: item.DOCUMENTO,
        },
      });

      // find shoopeerk
      const shoopeerk = await lojistaResource.findOne({
        where: {
          cnpj: item.CNPJ,
        },
      });

      // create debit
      return debitoResource.create({
        consumidorId: consumer.id,
        lojistaId: shoopeerk.id,
        seqdiv: item.SEQDIV,
        inclusao: generateDate(item.INCLUSAO),
        status: item.STATUS,
        tipoDoc: item.TIPODOC,
        contrato: item.CONTRATO,
        valor: Number(item.VALOR.replace('.', '').replace(',', '.')),
        vencimento: generateDate(item.VENCIMENTO),
      });
    };

    await queuedAsyncMap(usersConsumers, async (document: string) => {
      const user = await createUserConsumer(document);

      return createConsumer(document, user.id);
    });

    await queuedAsyncMap(usersShookeepers, async (document: string) => {
      const user = await createUserShookeeper(document);

      return createShopkeeper(document, user.id);
    });

    await queuedAsyncMap(data, (item: DebitsData) => createDebit(item));

    return res.json({ message: 'ok' });
  }
);

export default router;
