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

  const response = await transacaoResource.validaPagamentoBoleto({
    parcelaNegociacaoId: parcelaId,
    usuario: user,
    valorParcela: parcelaNegociacao.valorParcela,
    vencimento: parcelaNegociacao.vencimento,
  });

  await parcelaNegociacaoResource.updateById(parcelaId, {
    situacao: 'aguardando',
    boletoUrl: response.boleto_url,
  });

  return res.sendStatus(200);
});

export default router;
