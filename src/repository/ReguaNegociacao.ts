import ReguaNegociacao, {
  ReguaNegociacaoInstance,
} from '../models/ReguaNegociacao';
import BaseRepository from './BaseRepository';

class ReguaNegociacaoRepository extends BaseRepository<ReguaNegociacaoInstance> {
  constructor() {
    super(ReguaNegociacao);
  }
}

export default new ReguaNegociacaoRepository();
