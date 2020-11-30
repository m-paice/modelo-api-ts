import usuarioRepository from "../repository/Usuario";
import { UsuarioInstance } from "../models/Usuario";
import BaseResource from "./BaseResource";

export class UsuarioResource extends BaseResource<UsuarioInstance> {
  constructor() {
    super(usuarioRepository);
  }

  async criarFisica(data: {
    cpf: string;
    senha: string;
    nome: string;
    nascimento: string;
    email: string;
    celular: string;
  }) {
    try {
      const payload = {
        ...data,
        login: data.cpf,
      };

      const response = await await usuarioRepository.create(payload, {});

      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new UsuarioResource();
