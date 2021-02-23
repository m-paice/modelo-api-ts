import { Router } from 'express';

import usersRoutes from './users';
import syncRoutes from './sync';

import * as loggers from '../../../utils/logger';

const routes = Router();

routes.use(loggers.default.requestLogger);

routes.use('/users', usersRoutes);
routes.use('/sync', syncRoutes);

export default routes;
