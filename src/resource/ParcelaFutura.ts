import { addMonths } from 'date-fns';
import { Op } from 'sequelize';

import parcelaFuturaRepository from '../repository/ParcelaFutura';
import { ParcelaFuturaInstance } from '../models/ParcelaFutura';
import BaseResource from './BaseResource';

// resource
import parcelaNegociacaoResource from './ParcelaNegociacao';

export class ParcelaFuturaResource extends BaseResource<ParcelaFuturaInstance> {
  constructor() {
    super(parcelaFuturaRepository);
  }

  async registrarProximasParcelas(data: { negociacaoId: string }) {
    const { negociacaoId } = data;

    const parcelasNegociacao = await parcelaNegociacaoResource.findMany({
      where: {
        negociacaoId,
        parcela: {
          [Op.ne]: 1,
        },
      },
      order: [['parcela', 'ASC']],
    });

    Promise.all(
      parcelasNegociacao.map(async (item) =>
        this.create({
          parcelaNegociacaoId: item.id,
          expiraEm: addMonths(new Date(), item.parcela - 1),
          resolvida: false,
        })
      )
    );
  }
}

export default new ParcelaFuturaResource();
