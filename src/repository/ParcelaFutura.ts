import ParcelaFutura, { ParcelaFuturaInstance } from '../models/ParcelaFutura';
import BaseRepository from './BaseRepository';

class ParcelaFuturaRepository extends BaseRepository<ParcelaFuturaInstance> {
  constructor() {
    super(ParcelaFutura);
  }
}

export default new ParcelaFuturaRepository();
