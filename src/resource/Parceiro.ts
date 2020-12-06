import parceiroRepository from '../repository/Parceiro';
import { ParceiroInstance } from '../models/Parceiro';
import BaseResource from './BaseResource';

export class ParceiroResource extends BaseResource<ParceiroInstance> {
  constructor() {
    super(parceiroRepository);
  }
}

export default new ParceiroResource();
