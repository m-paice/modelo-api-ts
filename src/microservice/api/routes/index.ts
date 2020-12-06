import { Router } from 'express';

import usuarioRoutes from './usuario';
import parceiroRoutes from './parceiro';

const routes = Router();

// const auth = authenticatedRoute()

routes.use('/usuario', usuarioRoutes);
routes.use('/parceiro', parceiroRoutes);

export default routes;
