import { Router, Request } from 'express';

import usersResource from '../../../resource/Users';

import { promiseHandler } from '../../../utils/routing';

const controllerUser = {
  create: promiseHandler(async (req: Request) => {
    const { serviceId, webhookUrl } = req.body;

    return usersResource.createUserAndToken({ serviceId, webhookUrl });
  }),
};

const router = Router();

router.post('/auth', controllerUser.create);

export default router;
