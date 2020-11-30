import Endereco, { EnderecoInstance } from "../models/Endereco";
import BaseRepository from "./BaseRepository";

class EnderecoRepository extends BaseRepository<EnderecoInstance> {
  constructor() {
    super(Endereco);
  }
}

export default new EnderecoRepository();
