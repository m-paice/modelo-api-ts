import Carteira, { CarteiraInstance } from '../models/Carteira';
import BaseRepository from './BaseRepository';

class CarteiraRepository extends BaseRepository<CarteiraInstance> {
  constructor() {
    super(Carteira);
  }
}

export default new CarteiraRepository();
