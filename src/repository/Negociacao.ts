import Negociacao, { NegociacaoInstance } from '../models/Negociacao';
import BaseRepository from './BaseRepository';

class NegociacaoRepository extends BaseRepository<NegociacaoInstance> {
  constructor() {
    super(Negociacao);
  }
}

export default new NegociacaoRepository();
