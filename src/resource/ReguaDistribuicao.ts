import reguaDistribuicaoRepository from "../repository/ReguaDistribuicao";
import { ReguaDistribuicaoInstance } from "../models/ReguaDistribuicao";
import BaseResource from "./BaseResource";

export class ReguaDistribuicaoResource extends BaseResource<ReguaDistribuicaoInstance> {
  constructor() {
    super(reguaDistribuicaoRepository);
  }
}

export default new ReguaDistribuicaoResource();
