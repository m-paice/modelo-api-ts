import { Router } from 'express';

import debitoResource from '../../../resource/Debito';
import usuarioResource from '../../../resource/Usuario';
import enderecoResource from '../../../resource/Endereco';
import consumidorResource from '../../../resource/Consumidor';
import lojistaResource from '../../../resource/Lojista';

import * as logger from '../../../utils/logger';

// utils
import generateDate from '../../../utils/generateDate';

import upload from '../../../services/multer';
import readingCsv, { DataCsv } from '../../../services/readingCsv';

// middleware of the admin
import authAdmin from '../../../middleware/authAdmin';

const router = Router();

router.post('/upload', authAdmin, upload.single('file'), async (req, res) => {
  const data = await readingCsv(req.file.path);

  const createUserIfNotExist = async (item: DataCsv) => {
    const { DOCUMENTO, NOME, FONE1, FONE2, EMAIL } = item;

    const user = await usuarioResource.findOne({
      where: {
        login: DOCUMENTO,
      },
    });

    if (!user) {
      // TODO: don't emit CREATED event
      const response = await usuarioResource.create({
        login: DOCUMENTO,
        nome: NOME,
        celular: FONE1 || FONE2,
        email: EMAIL,
        ativo: false,
      });

      logger.default.debugLogger(
        `usuario.CREATED = #${response.id} - ${response.nome}`
      );
      return response;
    }

    logger.default.debugLogger(`usuario.FOUND = #${user.id} - ${user.nome}`);
    return user;
  };

  const createAddress = async (item: DataCsv, userId: string) => {
    const { CEP, ENDERECO, NUMERO, COMPLEMENTO, BAIRRO, CIDADE, ESTADO } = item;

    if (!CEP) return;

    const response = await enderecoResource.create({
      cep: CEP,
      rua: ENDERECO,
      numero: NUMERO,
      complemento: COMPLEMENTO,
      bairro: BAIRRO,
      cidade: CIDADE,
      uf: ESTADO,
      usuarioId: userId,
    });

    if (response) {
      logger.default.debugLogger(`endereco.CREATED = #${response.id}`);
    }
  };

  const createConsumerIfNotExist = async (item: DataCsv, usuarioId: string) => {
    const { DOCUMENTO } = item;

    const consumer = await consumidorResource.findOne({
      where: {
        cpf: DOCUMENTO,
      },
    });

    if (!consumer) {
      const response = await consumidorResource.create({
        usuarioId,
        cpf: DOCUMENTO,
      });

      logger.default.debugLogger(
        `consumidor.CREATED = #${response.id} - ${response.cpf}`
      );

      return response;
    }

    logger.default.debugLogger(
      `consumidor.FOUND = #${consumer.id} - ${consumer.cpf}`
    );
    return consumer;
  };

  const createShopkeeperIfNotExist = async (
    item: DataCsv,
    usuarioId: string
  ) => {
    const { ASSOCIADO } = item;

    const shopkeeper = await lojistaResource.findOne({
      where: {
        razaoSocial: ASSOCIADO,
      },
    });

    if (!shopkeeper) {
      const response = await lojistaResource.create({
        usuarioId,
        razaoSocial: ASSOCIADO,
      });

      logger.default.debugLogger(
        `lojista.CREATED = #${response.id} - ${response.cnpj}`
      );

      return response;
    }

    logger.default.debugLogger(
      `lojista.FOUND = #${shopkeeper.id} - ${shopkeeper.cnpj}`
    );
    return shopkeeper;
  };

  const createDebitIfNotExist = async (
    item: DataCsv,
    consumidorId: string,
    lojistaId: string
  ) => {
    const debit = await debitoResource.findOne({
      where: {
        seqdiv: item.SEQDIV,
      },
    });

    if (!debit) {
      const response = await debitoResource.create({
        consumidorId,
        lojistaId,
        seqdiv: item.SEQDIV,
        inclusao: generateDate(item.INCLUSAO),
        status: item.STATUS,
        tipoDoc: item.TIPODOC,
        contrato: item.CONTRATO,
        valor: item.VALOR,
        vencimento: generateDate(item.VENCIMENTO),
      });

      logger.default.debugLogger(
        `debito.CREATED = #${response.id} - ${response.seqdiv}`
      );
    }

    logger.default.debugLogger(`debito.FOUND = #${debit.id} - ${debit.seqdiv}`);
    return debit;
  };

  data.forEach(async (item) => {
    // buscar ou criar usuário
    const user = await createUserIfNotExist(item);

    // verificar e criar endereco
    await createAddress(item, user.id);

    // buscar ou criar consumidor
    const consumer = await createConsumerIfNotExist(item, user.id);

    // buscar ou criar lojista
    const shookeeper = await createShopkeeperIfNotExist(item, user.id);

    // verificar e criar dados bancarios
    // verificar dados do lojista (email, telefone, endereço) [PLANILHA PABLO]

    // criar debito
    await createDebitIfNotExist(item, consumer.id, shookeeper.id);
  });

  return res.json({ message: 'ok' });
});

export default router;
