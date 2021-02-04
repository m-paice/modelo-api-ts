import { Router, Request } from 'express';

// resource
import carteiraResource from '../../../resource/Carteira';
// models
import Lojista from '../../../models/Lojista';
// utils
import { promiseHandler } from '../../../utils/routing';
// middleware
import auth from '../../../middleware/auth';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
  lojistaId: string;
}

const router = Router();

const controller = {
  index: promiseHandler(async (req: IRequest) => {
    const { lojistaId } = req;

    return carteiraResource.findMany({
      where: {
        lojistaId,
      },
      include: [
        {
          model: Lojista,
          as: 'lojista',
        },
      ],
    });
  }),
};

router.get('/', auth, controller.index);

export default router;
