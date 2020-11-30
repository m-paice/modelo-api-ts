import DadosBancarios, {
  DadosBancariosInstance,
} from "../models/DadosBancarios";
import BaseRepository from "./BaseRepository";

class DadosBancariosRepository extends BaseRepository<DadosBancariosInstance> {
  constructor() {
    super(DadosBancarios);
  }
}

export default new DadosBancariosRepository();
