import Transacao, { TransacaoInstance } from '../models/Transacao';
import BaseRepository from './BaseRepository';

class TransacaoRepository extends BaseRepository<TransacaoInstance> {
  constructor() {
    super(Transacao);
  }
}

export default new TransacaoRepository();
