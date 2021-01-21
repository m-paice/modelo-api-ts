import { Router, Request } from 'express';

import usuarioResource from '../../../resource/Usuario';
import { promiseHandler } from '../../../utils/routing';

const router = Router();

const controller = {
  auth: promiseHandler((req: Request) => usuarioResource.decoded(req.body)),
};

router.post('/', controller.auth);

export default router;
