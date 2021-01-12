import ParcelaNegociacaoRepository from '../repository/ParcelaNegociacao';
import { ParcelaNegociacaoInstance } from '../models/ParcelaNegociacao';
import BaseResource from './BaseResource';

export class ParcelaNegociacaoResource extends BaseResource<ParcelaNegociacaoInstance> {
  constructor() {
    super(ParcelaNegociacaoRepository);
  }
}

export default new ParcelaNegociacaoResource();
