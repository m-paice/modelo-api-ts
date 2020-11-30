import dadosBancariosRepository from "../repository/DadosBancarios";
import { DadosBancariosInstance } from "../models/DadosBancarios";
import BaseResource from "./BaseResource";

export class DadosBancariosResource extends BaseResource<DadosBancariosInstance> {
  constructor() {
    super(dadosBancariosRepository);
  }
}

export default new DadosBancariosResource();
