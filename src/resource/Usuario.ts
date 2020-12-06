import usuarioRepository from '../repository/Usuario';
import { UsuarioInstance } from '../models/Usuario';
import BaseResource from './BaseResource';

import consumidorResource from './Consumidor';
import lojistaResource from './Lojista';

export class UsuarioResource extends BaseResource<UsuarioInstance> {
  constructor() {
    super(usuarioRepository);
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
    };

    const user = await usuarioRepository.create(payload);
    await consumidorResource.create({
      usuarioId: user.id,
      cpf: data.cpf,
    });

    await this.auth({ login: user.login, senha: user.senha });
  }

  async criarLojista(data: {
    cnpj: string;
    senha: string;
    nome: string;
    nascimento: string;
    email: string;
    celular: string;
  }) {
    const payload = {
      ...data,
      login: data.cnpj,
    };

    const user = await usuarioRepository.create(payload);
    await lojistaResource.create({
      usuarioId: user.id,
      ...data,
    });

    await this.auth({ login: user.login, senha: user.senha });
  }
}

export default new UsuarioResource();
