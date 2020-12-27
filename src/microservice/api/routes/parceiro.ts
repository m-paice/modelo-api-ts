import { Router, Request, Response } from 'express';

import resourceController from '../../../resource/controller';
import parceiroResource from '../../../resource/Parceiro';
import usuarioResource from '../../../resource/Usuario';
import { promiseHandler } from '../../../utils/routing';

const controller = resourceController(parceiroResource);

const router = Router();

const controllerUsuario = {
  ...controller,
  create: promiseHandler(async (req: Request, res: Response) => {
    const user = await usuarioResource.create({
      ...req.body,
      login: req.body.documento,
    });

    return parceiroResource.create({ ...req.body, usuarioId: user.id });
  }),
};

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controllerUsuario.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
