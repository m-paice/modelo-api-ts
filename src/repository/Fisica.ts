import Fisica, { FisicaInstance } from "../models/Fisica";
import BaseRepository from "./BaseRepository";

class FisicaRepository extends BaseRepository<FisicaInstance> {
  constructor() {
    super(Fisica);
  }
}

export default new FisicaRepository();
