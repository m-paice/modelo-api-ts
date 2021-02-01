import { Router } from 'express';

import authRoutes from './auth';
import adminRoutes from './admin';
import usuarioRoutes from './usuario';
import parceiroRoutes from './parceiro';
import debitoRoutes from './debito';
import lojistaRoutes from './lojista';
import consumidorRoutes from './consumidor';
import reguaNegociacaoRoutes from './reguaNegociacao';
import negociacaoRoutes from './negociacao';
import associacaoRoutes from './associcao';
import pagamentoRoutes from './pagamento';

// resource
import transacaoResource from '../../../resource/Transacao';

import * as loggers from '../../../utils/logger';

const routes = Router();

routes.use(loggers.default.requestLogger);

// const auth = authenticatedRoute()

// TODO: definir um middleware de autenticação para está rota.
routes.use('/admin', adminRoutes);

routes.use('/auth', authRoutes);

routes.use('/usuario', usuarioRoutes);
routes.use('/lojista', lojistaRoutes);
routes.use('/consumidor', consumidorRoutes);
routes.use('/parceiro', parceiroRoutes);
routes.use('/debito', debitoRoutes);
routes.use('/regua-negociacao', reguaNegociacaoRoutes);
routes.use('/negociacao', negociacaoRoutes);
routes.use('/associacao', associacaoRoutes);
routes.use('/pagamento', pagamentoRoutes);

routes.post('/postback', async (req, res) => {
  await transacaoResource.verificaPostback(req.body);

  return res.json({
    message: 'ok',
  });
});

export default routes;
