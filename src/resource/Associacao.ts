import associacaoRepository from '../repository/Associacao';
import { AssociacaoInstance } from '../models/Associacao';
import BaseResource from './BaseResource';

export class AssociacaoResource extends BaseResource<AssociacaoInstance> {
  constructor() {
    super(associacaoRepository);
  }
}

export default new AssociacaoResource();
