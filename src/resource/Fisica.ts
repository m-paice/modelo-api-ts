import fisicaRepository from "../repository/Fisica";
import { FisicaInstance } from "../models/Fisica";
import BaseResource from "./BaseResource";

export class FisicaResource extends BaseResource<FisicaInstance> {
  constructor() {
    super(fisicaRepository);
  }
}

export default new FisicaResource();
