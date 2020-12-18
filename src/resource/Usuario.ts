import usuarioRepository from '../repository/Usuario';
import { UsuarioInstance } from '../models/Usuario';
import BaseResource from './BaseResource';

import consumidorResource from './Consumidor';
import lojistaResource from './Lojista';

export class UsuarioResource extends BaseResource<UsuarioInstance> {
  constructor() {
    super(usuarioRepository, 'usuario');
  }

  async auth(data: { login: string; senha: string }) {
    return usuarioRepository.auth(data);
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

    const isClient = await usuarioRepository.findOne({
      where: {
        login: data.cpf,
        ativo: true,
      },
    });

    if (isClient) throw 'user already exists';

    const user = await usuarioRepository.create(payload);

    const consumer = await consumidorResource.create({
      usuarioId: user.id,
      cpf: data.cpf,
    });

    const token = await this.auth({ login: user.login, senha: user.senha });

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

    const isClient = await usuarioRepository.findOne({
      where: {
        login: data.cnpj,
        ativo: true,
      },
    });

    if (isClient) throw 'user already exists';

    const user = await usuarioRepository.create(payload);

    const shookeeper = await lojistaResource.create({
      usuarioId: user.id,
      ...data,
    });

    const token = await this.auth({ login: user.login, senha: user.senha });

    return {
      token,
      user,
      document: 'pj',
    };
  }
}

export default new UsuarioResource();
