import Acionistas, { AcionistasInstance } from '../models/Acionistas';
import BaseRepository from './BaseRepository';

class AcionistasRepository extends BaseRepository<AcionistasInstance> {
  constructor() {
    super(Acionistas);
  }
}

export default new AcionistasRepository();
