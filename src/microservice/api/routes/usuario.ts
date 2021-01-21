import { Router, Request } from 'express';

import resourceController from '../../../resource/controller';
import usuarioResource from '../../../resource/Usuario';
import { promiseHandler } from '../../../utils/routing';

const controller = resourceController(usuarioResource);

const router = Router();

const controllerUsuario = {
  ...controller,
  create: promiseHandler((req: Request) => {
    if (req.body.document === 'consumidor') {
      return usuarioResource.criarConsumidor(req.body);
    }

    return usuarioResource.criarLojista(req.body);
  }),
};

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controllerUsuario.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
