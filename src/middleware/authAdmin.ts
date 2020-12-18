import { Request, Response, NextFunction } from 'express';

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token && token === process.env.ADMIN_TOKEN) {
    return next();
  }

  return res.sendStatus(401);
};

export default authAdmin;
