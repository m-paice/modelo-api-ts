import usuarioRepository from '../repository/Usuario';
import { UsuarioInstance } from '../models/Usuario';
import BaseResource from './BaseResource';

import consumidorResource from './Consumidor';
import lojistaResource from './Lojista';

export class UsuarioResource extends BaseResource<UsuarioInstance> {
  constructor() {
    super(usuarioRepository, 'usuario');
  }

  async auth(user) {
    return usuarioRepository.generateToken(user);
  }

  async decoded(data: { login: string; senha: string }) {
    return usuarioRepository.decodedToken(data);
  }

  async recreateClientInative(userId: string, payload) {
    const user = await usuarioRepository.updateById(userId, payload);
    const consumer = await consumidorResource.findOne({
      where: {
        usuarioId: userId,
      },
    });

    const token = await this.auth({
      userId: user.id,
      consumidorId: consumer.id,
    });

    return {
      token,
      user,
      document: 'pf',
    };
  }

  async criarConsumidor(data: {
    cpf: string;
    senha: string;
    nome: string;
    nascimento: string;
    email: string;
    celular: string;
  }) {
    const payload = {
      ...data,
      login: data.cpf,
      ativo: true,
    };

    if (!payload.senha) {
      throw 'password not found. password is required.';
    }

    // quando documento (cpf) já existir
    const isClient = await usuarioRepository.findOne({
      where: {
        login: data.cpf,
        ativo: true,
      },
    });

    if (isClient) throw 'user already exists';

    // quando o sistema já cadastrou o usuário
    const isClientInative = await usuarioRepository.findOne({
      where: {
        login: data.cpf,
        ativo: false,
      },
    });

    if (isClientInative)
      return this.recreateClientInative(isClientInative.id, payload);

    const user = await usuarioRepository.create(payload);

    const consumer = await consumidorResource.create({
      usuarioId: user.id,
      cpf: data.cpf,
    });

    const token = await this.auth({
      userId: user.id,
      consumidorId: consumer.id,
    });

    return {
      token,
      user,
      document: 'pf',
    };
  }

  async criarLojista(data: {
    cnpj: string;
    senha: string;
    razaoSocial: string;
  }) {
    const payload = {
      ...data,
      login: data.cnpj,
      nome: data.razaoSocial,
      ativo: true,
    };

    if (!payload.senha) {
      throw 'password not found. password is required.';
    }

    // quando documento (cpf) já existir
    const isClient = await usuarioRepository.findOne({
      where: {
        login: data.cnpj,
        ativo: true,
      },
    });

    if (isClient) throw 'user already exists';

    // quando o sistema já cadastrou o usuário
    const isClientInative = await usuarioRepository.findOne({
      where: {
        login: data.cnpj,
        ativo: false,
      },
    });

    if (isClientInative) {
      const user = await usuarioRepository.updateById(
        isClientInative.id,
        payload
      );

      const token = await this.auth(user);

      return {
        token,
        user,
        document: 'pj',
      };
    }

    const user = await usuarioRepository.create(payload);

    const shookeeper = await lojistaResource.create({
      usuarioId: user.id,
      ...data,
    });

    const token = await this.auth({
      user: user.id,
      lojistaId: shookeeper.id,
    });

    return {
      token,
      user,
      document: 'pj',
    };
  }
}

export default new UsuarioResource();
