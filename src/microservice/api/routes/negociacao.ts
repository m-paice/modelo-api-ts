import { Router } from 'express';

import resourceController from '../../../resource/controller';
import negociacaoResource from '../../../resource/Negociacao';

// middlewares
import auth from '../../../middleware/auth';

const controller = resourceController(negociacaoResource);

const router = Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
