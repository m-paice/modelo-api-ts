import { Router } from 'express';

import resourceController from '../../../resource/controller';
import debitoResource from '../../../resource/Debito';

const controller = resourceController(debitoResource);

const router = Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

export default router;
