import lojistaRepository from "../repository/Lojista";
import { LojistaInstance } from "../models/Lojista";
import BaseResource from "./BaseResource";

export class LojistaResource extends BaseResource<LojistaInstance> {
  constructor() {
    super(lojistaRepository);
  }
}

export default new LojistaResource();
