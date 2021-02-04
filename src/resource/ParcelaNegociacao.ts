import ParcelaNegociacaoRepository from '../repository/ParcelaNegociacao';
import { ParcelaNegociacaoInstance } from '../models/ParcelaNegociacao';
import BaseResource from './BaseResource';

export class ParcelaNegociacaoResource extends BaseResource<ParcelaNegociacaoInstance> {
  constructor() {
    super(ParcelaNegociacaoRepository);
  }

  async pagarParcelaNegociacao(data: { parcelaNegociacaoId: string }) {
    const { parcelaNegociacaoId } = data;

    await this.updateById(parcelaNegociacaoId, {
      dataPagamento: new Date(),
      situacao: 'pago',
    });
  }
}

export default new ParcelaNegociacaoResource();
