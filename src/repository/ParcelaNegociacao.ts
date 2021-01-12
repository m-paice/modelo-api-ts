import ParcelaNegociacao, {
  ParcelaNegociacaoInstance,
} from '../models/ParcelaNegociacao';
import BaseRepository from './BaseRepository';

class ParcelaNegociacaoRepository extends BaseRepository<ParcelaNegociacaoInstance> {
  constructor() {
    super(ParcelaNegociacao);
  }
}

export default new ParcelaNegociacaoRepository();
