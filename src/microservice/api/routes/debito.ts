import { Router, Request, Response } from 'express';

import resourceController from '../../../resource/controller';
import debitoResource from '../../../resource/Debito';

// models
import Usuario from '../../../models/Usuario';
import Negociacao from '../../../models/Negociacao';
import Consumidor from '../../../models/Consumidor';
import Lojista from '../../../models/Lojista';
import ParcelaNegociacao from '../../../models/ParcelaNegociacao';

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
        attributes: ['nome'],
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
  indexConsumer: promiseHandler((req: IRequest, res: Response) =>
    debitoResource.findMany({
      where: {
        consumidorId: req.consumidorId,
      },
      include,
    })
  ),
  indexShoopeerk: promiseHandler((req: IRequest, res: Response) =>
    debitoResource.findMany({
      where: {
        lojistaId: req.lojistaId,
      },
      include,
    })
  ),
};

router.get('/consumidor', auth, controllerDebito.indexConsumer);
router.get('/lojista', auth, controllerDebito.indexShoopeerk);
router.get('/:id', auth, controller.show);

export default router;
