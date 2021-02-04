import jwt from 'jsonwebtoken';

import Usuario, { UsuarioInstance } from '../models/Usuario';
import BaseRepository from './BaseRepository';

import consumidorResource from '../resource/Consumidor';
import lojistaResource from '../resource/Lojista';
import associacaoResource from '../resource/Associacao';

import HttpError from '../utils/error/HttpError';

import validators from '../utils/validators';

class UsuarioRepository extends BaseRepository<UsuarioInstance> {
  private verifyToken = process.env.VERIFY_TOKEN || '';

  constructor() {
    super(Usuario);
  }

  async generateToken(user) {
    return jwt.sign({ ...user }, this.verifyToken);
  }

  async userAssociation(user) {
    const association = await associacaoResource.findOne({
      where: {
        cnpj: user.login,
      },
    });

    const token = jwt.sign(
      { user, associacaoId: association.id },
      this.verifyToken
    );

    return {
      token,
      user,
      document: 'associacao',
    };
  }

  async decodedToken(data: { login: string; senha: string }) {
    const user: any = await Usuario.findOne({
      where: {
        login: data.login,
        senha: data.senha,
      },
    });

    if (!user) {
      return new HttpError(500, 'usuário não encontrado.');
    }

    if (user.login === '00.000.000/0001-00') {
      // TODO: verificar uma outra forma de buscar usuario associacao
      return this.userAssociation(user);
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

      console.log('shopkeeper: ', shopkeeper.id);

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
