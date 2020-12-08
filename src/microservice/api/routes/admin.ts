import { Router } from 'express';

import debitoResource from '../../../resource/Debito';
import usuarioResource from '../../../resource/Usuario';
import consumidorResource from '../../../resource/Consumidor';
import lojistaResource from '../../../resource/Lojista';

import * as logger from '../../../utils/logger';

import upload from '../../../services/multer';
import readingCsv, { DataCsv } from '../../../services/readingCsv';

const router = Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  const data = await readingCsv(req.file.path);

  const createUserIfNotExist = async (item: DataCsv) => {
    const { DOCUMENTO, NOME } = item;

    const user = await usuarioResource.findOne({
      where: {
        login: DOCUMENTO,
      },
    });

    if (!user) {
      const response = await usuarioResource.create({
        login: DOCUMENTO,
        nome: NOME,
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
    const { DOCUMENTO, ASSOCIADO } = item;

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

  data.forEach(async (item) => {
    // buscar ou criar usuário
    const user = await createUserIfNotExist(item);

    // buscar ou criar consumidor
    const consumer = await createConsumerIfNotExist(item, user.id);

    // buscar ou criar lojista
    const shookeeper = await createShopkeeperIfNotExist(item, user.id);

    // criar debito (validar se deve buscar débito do usuário)
    const response = await debitoResource.create({
      consumidorId: consumer.id,
      lojistaId: shookeeper.id,
      seqdiv: item.SEQDIV,
      inclusao: item.INCLUSAO,
      status: item.STATUS,
      tipoDoc: item.TIPODOC,
      contrato: item.CONTRATO,
      valor: item.VALOR,
      vencimento: item.VENCIMENTO,
    });

    logger.default.debugLogger(
      `debito.CREATED = #${response.id} - consumidor:${consumer.id} - lojista:${shookeeper.id}`
    );
  });

  return res.json({ message: 'ok' });
});

export default router;
