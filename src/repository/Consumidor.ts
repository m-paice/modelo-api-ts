import Consumidor, { ConsumidorInstance } from '../models/Consumidor';
import BaseRepository from './BaseRepository';

class ConsumidorRepository extends BaseRepository<ConsumidorInstance> {
  constructor() {
    super(Consumidor);
  }
}

export default new ConsumidorRepository();
