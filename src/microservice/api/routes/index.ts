import { Router } from 'express';

import adminRoutes from './admin';
import usuarioRoutes from './usuario';
import parceiroRoutes from './parceiro';
import debitoRoutes from './debito';
import lojistaRoutes from './lojista';
import consumidorRoutes from './consumidor';

import * as loggers from '../../../utils/logger';

const routes = Router();

routes.use(loggers.default.requestLogger);

// const auth = authenticatedRoute()

// TODO: definir um middleware de autenticação para está rota.
routes.use('/admin', adminRoutes);

routes.use('/usuario', usuarioRoutes);
routes.use('/lojista', lojistaRoutes);
routes.use('/consumidor', consumidorRoutes);
routes.use('/parceiro', parceiroRoutes);
routes.use('/debito', debitoRoutes);

export default routes;
