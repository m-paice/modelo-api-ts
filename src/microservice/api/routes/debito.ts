import { Router, Request } from 'express';

import resourceController from '../../../resource/controller';
import debitoResource from '../../../resource/Debito';

// models
import Usuario from '../../../models/Usuario';
import Negociacao from '../../../models/Negociacao';
import Consumidor from '../../../models/Consumidor';
import Lojista from '../../../models/Lojista';
import ParcelaNegociacao from '../../../models/ParcelaNegociacao';
import Endereco from '../../../models/Endereco';
import DadosBancarios from '../../../models/DadosBancarios';

import { promiseHandler } from '../../../utils/routing';

import auth from '../../../middleware/auth';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
  lojistaId: string;
}

const controller = resourceController(debitoResource);

const router = Router();

const include = [
  {
    model: Consumidor,
    as: 'consumidor',
    include: [
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['nome'],
        include: [
          {
            model: Endereco,
            as: 'endereco',
          },
        ],
      },
    ],
  },
  {
    model: Lojista,
    as: 'lojista',
    include: [
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['nome', 'email', 'celular'],
        include: [
          {
            model: Endereco,
            as: 'endereco',
          },
        ],
      },
      {
        model: DadosBancarios,
        as: 'dadosBancarios',
      },
    ],
  },
  {
    model: Negociacao,
    as: 'negociacao',
    include: [
      {
        model: ParcelaNegociacao,
        as: 'parcelas',
      },
    ],
  },
];

const controllerDebito = {
  ...controller,
  indexConsumer: promiseHandler(async (req: IRequest) => {
    const response = await debitoResource.findMany({
      where: {
        consumidorId: req.consumidorId,
      },
      include,
    });

    return response;
  }),
  indexShoopeerk: promiseHandler(async (req: IRequest) => {
    const response = await debitoResource.findMany({
      where: {
        lojistaId: req.lojistaId,
      },
      include,
    });

    return response;
  }),
};

router.get('/consumidor', auth, controllerDebito.indexConsumer);
router.get('/lojista', auth, controllerDebito.indexShoopeerk);
router.get('/:id', auth, controller.show);

export default router;
