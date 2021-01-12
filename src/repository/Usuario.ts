import jwt from 'jsonwebtoken';

import Usuario, { UsuarioInstance } from '../models/Usuario';
import BaseRepository from './BaseRepository';

import consumidorResource from '../resource/Consumidor';
import lojistaResource from '../resource/Lojista';

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
      throw new Error('user not found');
    }

    const document = validators.document(data.login);

    let token = '';

    if (document === 'pf') {
      const consumer = await consumidorResource.findOne({
        where: {
          usuarioId: user.id,
        },
      });

      token = jwt.sign({ user, consumidorId: consumer.id }, this.verifyToken);
    }

    if (document === 'pj') {
      const shopkeeper = await lojistaResource.findOne({
        where: {
          usuarioId: user.id,
        },
      });

      token = jwt.sign({ user, lojistaId: shopkeeper.id }, this.verifyToken);
    }

    return {
      token,
      user,
      document,
    };
  }
}

export default new UsuarioRepository();
