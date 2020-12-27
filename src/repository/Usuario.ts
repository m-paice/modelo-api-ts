import jwt from 'jsonwebtoken';

import Usuario, { UsuarioInstance } from '../models/Usuario';
import BaseRepository from './BaseRepository';

import validators from '../utils/validators';

class UsuarioRepository extends BaseRepository<UsuarioInstance> {
  private verifyToken = process.env.VERIFY_TOKEN || '';

  constructor() {
    super(Usuario);
  }

  async generateToken(user) {
    return jwt.sign({ ...user }, this.verifyToken);
  }

  async decodedToken(data: { login: string; senha: string }) {
    const user: any = await Usuario.findOne({
      where: {
        login: data.login,
        senha: data.senha,
      },
    });

    if (!user) {
      throw 'user not found';
    }

    const token = jwt.sign({ user }, this.verifyToken);

    const document = validators.document(data.login);

    return {
      token,
      user,
      document,
    };
  }
}

export default new UsuarioRepository();
