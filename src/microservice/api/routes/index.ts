import { Router } from 'express';

import adminRoutes from './admin';
import usuarioRoutes from './usuario';
import parceiroRoutes from './parceiro';
import debitoRoutes from './debito';

const routes = Router();

// const auth = authenticatedRoute()

// TODO: definir um middleware de autenticação para está rota.
routes.use('/admin', adminRoutes);

routes.use('/usuario', usuarioRoutes);
routes.use('/parceiro', parceiroRoutes);
routes.use('/debito', debitoRoutes);

export default routes;
