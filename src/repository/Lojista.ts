import Lojista, { LojistaInstance } from "../models/Lojista";
import BaseRepository from "./BaseRepository";

class LojistaRepository extends BaseRepository<LojistaInstance> {
  constructor() {
    super(Lojista);
  }
}

export default new LojistaRepository();
