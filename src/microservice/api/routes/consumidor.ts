import { Router } from 'express';

import resourceController from '../../../resource/controller';
import consumidorResource from '../../../resource/Consumidor';

const controller = resourceController(consumidorResource);

const router = Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
