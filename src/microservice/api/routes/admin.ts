import { Router } from 'express';
import { uniqBy } from 'lodash';

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

    const usersConsumers = uniqBy(
      data.map((i: DebitsData) => ({
        cpf: i.DOCUMENTO,
        nome: i.NOME,
      })),
      'cpf'
    );
    const usersShookeepers = uniqBy(
      data.map((i: DebitsData) => ({
        cnpj: i.CNPJ,
        nome: i.ASSOCIADO,
      })),
      'cnpj'
    );

    const createUserConsumer = async (data: {
      login: string;
      nome: string;
    }) => {
      const { login, nome } = data;

      // TODO: don't emit CREATED event
      const response = await usuarioResource.create({
        login,
        nome,
        ativo: false,
      });

      return response;
    };

    const createUserShookeeper = async (data: {
      login: string;
      nome: string;
    }) => {
      const { login, nome } = data;

      // TODO: don't emit CREATED event
      const response = await usuarioResource.create({
        login,
        nome,
        ativo: false,
      });

      return response;
    };

    const createConsumer = async (data: {
      usuarioId: string;
      cpf: string;
      nome: string;
    }) => {
      const { usuarioId, cpf, nome } = data;

      const response = await consumidorResource.create({
        usuarioId,
        cpf,
        nome,
      });

      return response;
    };

    const createShopkeeper = async (data: {
      usuarioId: string;
      cnpj: string;
      nome: string;
    }) => {
      const { usuarioId, cnpj, nome } = data;

      const response = await lojistaResource.create({
        usuarioId,
        cnpj,
        razaoSocial: nome,
        fantasia: nome,
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

    await queuedAsyncMap(
      usersConsumers,
      async (data: { cpf: string; nome: string }) => {
        const user = await createUserConsumer({
          login: data.cpf,
          nome: data.nome,
        });

        return createConsumer({
          usuarioId: user.id,
          cpf: data.cpf,
          nome: data.nome,
        });
      }
    );

    await queuedAsyncMap(
      usersShookeepers,
      async (data: { cnpj: string; nome: string }) => {
        const user = await createUserShookeeper({
          login: data.cnpj,
          nome: data.nome,
        });

        return createShopkeeper({
          usuarioId: user.id,
          cnpj: data.cnpj,
          nome: data.nome,
        });
      }
    );

    await queuedAsyncMap(data, (item: DebitsData) => createDebit(item));

    return res.json({ message: 'ok' });
  }
);

export default router;
