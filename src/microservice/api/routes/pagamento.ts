import { Router, Request } from 'express';

import parcelaNegociacaoResource from '../../../resource/ParcelaNegociacao';
import transacaoResource from '../../../resource/Transacao';

import auth from '../../../middleware/auth';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
  lojistaId: string;
}

const router = Router();

router.post('/boleto', auth, async (req: IRequest, res) => {
  const { user } = req;
  const { parcelaId } = req.body;

  const parcelaNegociacao = await parcelaNegociacaoResource.findById(parcelaId);

  if (!parcelaNegociacao) {
    throw new Error('parcela não encontrada!');
  }

  await transacaoResource.validaPagamentoBoleto({
    parcelaNegociacaoId: parcelaId,
    usuario: user,
    valorParcela: parcelaNegociacao.valorParcela,
    vencimento: parcelaNegociacao.vencimento,
  });

  return res.json({
    message: 'ok',
  });
});

export default router;
