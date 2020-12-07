import { Router } from 'express';

import debitoResource from '../../../resource/Debito';
import usuarioResource from '../../../resource/Usuario';
import consumidorResource from '../../../resource/Consumidor';
import lojistaResource from '../../../resource/Lojista';

import upload from '../../../services/multer';
import readingCsv, { DataCsv } from '../../../services/readingCsv';

const router = Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  const data = await readingCsv(req.file.path);

  const createUserIfNotExist = async (item: DataCsv) => {
    const user = await usuarioResource.findOne({
      where: {
        login: item.NOME,
      },
    });

    if (!user) {
      const response = await usuarioResource.create({
        login: item.DOCUMENTO,
        nome: item.NOME,
        ativo: false,
      });

      return response;
    }

    return user;
  };

  const createConsumerIfNotExist = async (item: DataCsv, usuarioId: string) => {
    const consumer = await consumidorResource.findOne({
      where: {
        cpf: item.DOCUMENTO,
      },
    });

    if (!consumer) {
      const response = await consumidorResource.create({
        usuarioId,
        cpf: item.DOCUMENTO,
      });

      return response;
    }

    return consumer;
  };

  const createShopkeeperIfNotExist = async (
    item: DataCsv,
    usuarioId: string
  ) => {
    const shopkeeper = await lojistaResource.findOne({
      where: {
        razaoSocial: item.DOCUMENTO,
      },
    });

    if (!shopkeeper) {
      const response = await lojistaResource.create({
        usuarioId,
        razaoSocial: item.ASSOCIADO,
      });

      return response;
    }

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
    await debitoResource.create({
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
  });

  return res.json({ message: 'ok' });
});

export default router;
