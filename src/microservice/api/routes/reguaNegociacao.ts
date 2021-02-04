import { Router } from 'express';

// resource
import resourceController from '../../../resource/controller';
import reguaNegociacaoResource from '../../../resource/ReguaNegociacao';

// middlare
import auth from '../../../middleware/auth';
import verificaLojistaHabilitado from '../../../middleware/verificaLojistaHabilitado';

const controller = resourceController(reguaNegociacaoResource);

const router = Router();

router.get('/', auth, verificaLojistaHabilitado, controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
