import jwt from 'jsonwebtoken';

import Usuario, { UsuarioInstance } from '../models/Usuario';
import BaseRepository from './BaseRepository';

class UsuarioRepository extends BaseRepository<UsuarioInstance> {
  private verifyToken = process.env.VERIFY_TOKEN || '';

  constructor() {
    super(Usuario);
  }

  async auth(data: { login: string; senha: string }) {
    const user: any = await Usuario.findOne({
      where: {
        login: data.login,
        senha: data.senha,
      },
    });

    if (!user) {
      throw 'user not found';
    }

    const token = jwt.sign({ id: user.id }, this.verifyToken);

    return token;
  }
}

export default new UsuarioRepository();
