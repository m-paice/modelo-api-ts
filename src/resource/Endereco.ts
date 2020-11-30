import enderecoRepository from "../repository/Endereco";
import { EnderecoInstance } from "../models/Endereco";
import BaseResource from "./BaseResource";

export class EnderecoResource extends BaseResource<EnderecoInstance> {
  constructor() {
    super(enderecoRepository);
  }
}

export default new EnderecoResource();
