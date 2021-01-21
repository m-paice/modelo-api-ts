import { Router, Request } from 'express';

import resourceController from '../../../resource/controller';
import consumidorResource from '../../../resource/Consumidor';
import lojistaResource from '../../../resource/Lojista';
import usuarioResource from '../../../resource/Usuario';

import Usuario from '../../../models/Usuario';

import { promiseHandler } from '../../../utils/routing';

import auth from '../../../middleware/auth';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
  lojistaId: string;
  associacaoId: string;
}

const controller = resourceController(consumidorResource);

const router = Router();

const controllerAssociacao = {
  ...controller,
  index: promiseHandler(async (req: IRequest) => {
    const response = await lojistaResource.findMany({
      where: {
        associacaoId: req.associacaoId,
      },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome', 'habilitado'],
        },
      ],
    });

    return response;
  }),
  updateLojista: promiseHandler(async (req: IRequest) => {
    const { params, body } = req;
    const { habilitado } = body;

    const shopkeeper = await lojistaResource.findById(params.id);

    await usuarioResource.updateById(shopkeeper.usuarioId, {
      habilitado,
    });

    return lojistaResource.findById(shopkeeper.id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['nome', 'habilitado'],
        },
      ],
    });
  }),
};

router.get('/lojista', auth, controllerAssociacao.index);
router.put('/lojista/:id', auth, controllerAssociacao.updateLojista);

export default router;
