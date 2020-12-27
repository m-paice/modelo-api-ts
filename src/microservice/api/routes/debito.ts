import { Router, Request, Response } from 'express';

import resourceController from '../../../resource/controller';
import debitoResource from '../../../resource/Debito';

import { promiseHandler } from '../../../utils/routing';

import auth from '../../../middleware/auth';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
}

const controller = resourceController(debitoResource);

const router = Router();

const controllerDebito = {
  ...controller,
  index: promiseHandler((req: IRequest, res: Response) =>
    // load debts of the authenticated user

    debitoResource.findMany({
      where: {
        consumidorId: req.consumidorId,
      },
      ...req.query,
    })
  ),
};

router.get('/', auth, controllerDebito.index);
router.get('/:id', auth, controller.show);

export default router;
