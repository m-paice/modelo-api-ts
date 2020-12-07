import Debito, { DebitoInstance } from '../models/Debito';
import BaseRepository from './BaseRepository';

class DebitoRepository extends BaseRepository<DebitoInstance> {
  constructor() {
    super(Debito);
  }
}

export default new DebitoRepository();
