import acionistasRepository from "../repository/Acionistas";
import { AcionistasInstance } from "../models/Acionistas";
import BaseResource from "./BaseResource";

export class AcionistasResource extends BaseResource<AcionistasInstance> {
  constructor() {
    super(acionistasRepository);
  }
}

export default new AcionistasResource();
