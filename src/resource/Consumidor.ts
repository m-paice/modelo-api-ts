import consumidorRepository from '../repository/Consumidor';
import { ConsumidorInstance } from '../models/Consumidor';
import BaseResource from './BaseResource';

export class ConsumidorResource extends BaseResource<ConsumidorInstance> {
  constructor() {
    super(consumidorRepository);
  }
}

export default new ConsumidorResource();
