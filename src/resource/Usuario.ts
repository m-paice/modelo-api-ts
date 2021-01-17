import usuarioRepository from '../repository/Usuario';
import { UsuarioInstance } from '../models/Usuario';
import BaseResource from './BaseResource';

import consumidorResource from './Consumidor';
import lojistaResource from './Lojista';
import enderecoResource from './Endereco';
import dadosBancariosResource from './DadosBancarios';

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

  async userConsumerInative(userId: string, payload) {
    const user = await this.updateById(userId, payload, { dontEmit: true });
    await this.emitCreated(user);

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

  async userShoopeerkInative(userId: string, payload) {
    const user = await this.updateById(userId, payload, {
      dontEmit: true,
    });
    await this.emitCreated(user);

    const shoopeerk = await lojistaResource.findOne({
      where: {
        usuarioId: user.id,
      },
    });

    await this.criarEndereco({ ...payload, usuarioId: user.id });
    await this.criarDadosBancarios({ ...payload, lojistaId: shoopeerk.id });

    const token = await this.auth({
      user: user.id,
      lojistaId: shoopeerk.id,
    });

    return {
      token,
      user,
      document: 'pj',
    };
  }

  async criarEndereco(data) {
    return enderecoResource.create(data);
  }

  async criarDadosBancarios(data) {
    return dadosBancariosResource.create(data);
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
    const isClient = await this.findOne({
      where: {
        login: data.cpf,
        ativo: true,
      },
    });

    if (isClient) throw 'user already exists';

    // quando o sistema já cadastrou o usuário
    const isClientInative = await this.findOne({
      where: {
        login: data.cpf,
        ativo: false,
      },
    });

    if (isClientInative) {
      return this.userConsumerInative(isClientInative.id, payload);
    }

    const user = await this.create(payload);

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
    const isClient = await this.findOne({
      where: {
        login: data.cnpj,
        ativo: true,
      },
    });

    if (isClient) throw 'user already exists';

    // quando o sistema já cadastrou o usuário
    const isClientInative = await this.findOne({
      where: {
        login: data.cnpj,
        ativo: false,
      },
    });

    if (isClientInative) {
      return this.userShoopeerkInative(isClientInative.id, payload);
    }

    const user = await this.create(payload);

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
