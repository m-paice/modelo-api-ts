import { Router, Request, Response } from 'express';

import usuarioResource from '../../../resource/Usuario';
import { promiseHandler } from '../../../utils/routing';

const router = Router();

const controller = {
  auth: promiseHandler((req: Request, res: Response) => {
    return usuarioResource.decoded(req.body);
  }),
};

router.post('/', controller.auth);

export default router;
