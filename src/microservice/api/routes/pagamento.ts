import { Router, Request } from 'express';

import parcelaNegociacaoResource from '../../../resource/ParcelaNegociacao';

import { pagarComBoleto } from '../../../services/pagarme';

import auth from '../../../middleware/auth';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
  lojistaId: string;
}

const router = Router();

router.post('/boleto', auth, async (req: IRequest, res) => {
  const { parcelaId } = req.body;

  const parcelaNegociacao = await parcelaNegociacaoResource.findById(parcelaId);

  if (!parcelaNegociacao) {
    throw new Error('parcela não encontrada!');
  }

  const usuario = req.user;

  await pagarComBoleto({
    id: usuario.id,
    document: usuario.login,
    name: usuario.nome,
    price: parcelaNegociacao.valorParcela * 100,
    dueDate: new Date(parcelaNegociacao.vencimento),
    email: usuario.email,
    phoneNumber: usuario.celular,
    birthday: new Date(usuario.nascimento),
  });

  // TODO: retornar o boleto para o usuário

  return res.json({
    message: 'ok',
  });
});

router.post('/cartao', async (req, res) => {
  const message = 'ok';

  return res.json({
    message,
  });
});

export default router;
