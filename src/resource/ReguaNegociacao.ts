import reguaNegociacaoRepository from '../repository/ReguaNegociacao';
import { ReguaNegociacaoInstance } from '../models/ReguaNegociacao';
import BaseResource from './BaseResource';

export class ReguaNegociacaoResource extends BaseResource<ReguaNegociacaoInstance> {
  constructor() {
    super(reguaNegociacaoRepository);
  }
}

export default new ReguaNegociacaoResource();
