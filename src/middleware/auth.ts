import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IRequest extends Request {
  user: any;
  consumidorId: string;
  lojistaId: string;
  associacaoId: string;
}

const auth = (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(' ')[1] : null;

  // temporariamente para as ações de usuário admin
  if (authorization === 'admin') return next();

  if (!token) return res.sendStatus(401);

  const decoded: any = jwt.verify(token, process.env.VERIFY_TOKEN);

  if (!decoded) return res.sendStatus(401);

  req.user = decoded.user;
  req.consumidorId = decoded.consumidorId;
  req.lojistaId = decoded.lojistaId;
  req.associacaoId = decoded.associacaoId;

  return next();
};

export default auth;
