import { Router } from 'express';

// resource
import resourceController from '../../../resource/controller';
import carteiraResource from '../../../resource/Carteira';
// middleware
import auth from '../../../middleware/auth';
import verificaLojistaHabilitado from '../../../middleware/verificaLojistaHabilitado';

const controller = resourceController(carteiraResource);

const router = Router();

router.get('/', auth, verificaLojistaHabilitado, controller.index);

export default router;
