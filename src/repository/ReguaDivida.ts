import ReguaDivida, { ReguaDividaInstance } from "../models/ReguaDivida";
import BaseRepository from "./BaseRepository";

class ReguaDividaRepository extends BaseRepository<ReguaDividaInstance> {
  constructor() {
    super(ReguaDivida);
  }
}

export default new ReguaDividaRepository();
