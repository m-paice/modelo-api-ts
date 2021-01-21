import Associacao, { AssociacaoInstance } from '../models/Associacao';
import BaseRepository from './BaseRepository';

class AssociacaoRepository extends BaseRepository<AssociacaoInstance> {
  constructor() {
    super(Associacao);
  }
}

export default new AssociacaoRepository();
