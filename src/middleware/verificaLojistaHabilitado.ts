import { Request, Response, NextFunction } from 'express';

// resource
import lojistaResource from '../resource/Lojista';
// model
import Usuario from '../models/Usuario';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
  lojistaId: string;
}

const verificaLojistaHabilitado = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { lojistaId } = req;

  if (lojistaId) {
    const lojista = await lojistaResource.findById(lojistaId, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['habilitado'],
        },
      ],
    });

    if (!lojista.usuario.habilitado) return res.json([]);

    return next();
  }

  return next();
};

export default verificaLojistaHabilitado;
