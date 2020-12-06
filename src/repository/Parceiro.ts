import Parceiro, { ParceiroInstance } from '../models/Parceiro';
import BaseRepository from './BaseRepository';

class ParceiroRepository extends BaseRepository<ParceiroInstance> {
  constructor() {
    super(Parceiro);
  }
}

export default new ParceiroRepository();
