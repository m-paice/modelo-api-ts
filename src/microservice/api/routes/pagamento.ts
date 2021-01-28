import { Router, Request } from 'express';

import parcelaNegociacaoResource from '../../../resource/ParcelaNegociacao';
import usuarioResource from '../../../resource/Usuario';

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

  const usuario = await usuarioResource.findById(req.user.id);

  await pagarComBoleto({
    document: usuario.login,
    name: usuario.nome,
    price: parcelaNegociacao.valorParcela * 100,
    dueDate: new Date(parcelaNegociacao.vencimento),
    // dados opcioanis
    email: usuario.email,
    phoneNumber: `+55${usuario.celular.replace(/([^\d])+/gim, '')}`,
    birthday: new Date(usuario.nascimento),
  });

  // TODO: retornar o boleto para o usuário

  return res.json({
    message: 'ok',
  });
});

router.post('/cartao', async (req, res) =>
  res.json({
    message: 'ok',
  })
);

export default router;
