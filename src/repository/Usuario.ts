import Usuario, { UsuarioInstance } from "../models/Usuario";
import BaseRepository from "./BaseRepository";

class UsuarioRepository extends BaseRepository<UsuarioInstance> {
  constructor() {
    super(Usuario);
  }
}

export default new UsuarioRepository();
