import reguaDividaRepository from "../repository/ReguaDivida";
import { ReguaDividaInstance } from "../models/ReguaDivida";
import BaseResource from "./BaseResource";

export class ReguaDividaResource extends BaseResource<ReguaDividaInstance> {
  constructor() {
    super(reguaDividaRepository);
  }
}

export default new ReguaDividaResource();
