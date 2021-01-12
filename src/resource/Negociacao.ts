import negociacaoRepository from '../repository/Negociacao';
import { NegociacaoInstance } from '../models/Negociacao';
import BaseResource from './BaseResource';

import debitoResource from './Debito';
import reguaNegociacaoResource from './ReguaNegociacao';

// utils
import generateDate from '../utils/generateDate';

export class NegociacaoResource extends BaseResource<NegociacaoInstance> {
  constructor() {
    super(negociacaoRepository);
  }

  async create(data, options) {
    const debito = await debitoResource.findById(data.debitoId);
    const reguaNegociacao = await reguaNegociacaoResource.findById(
      data.reguaNegociacaoId
    );

    if (!debito || !reguaNegociacao) {
      throw new Error('data negociation not found');
    }

    const desconto = (debito.valor * reguaNegociacao.desconto) / 100;
    const negociado = debito.valor - desconto;

    const negociation = await negociacaoRepository.create({
      ...data,
      parcelamento: Number(data.parcelamento),
      dataVencimento: new Date(generateDate(data.dataVencimento)),
      dataRegistro: new Date(),
      desconto,
      negociado,
      divida: debito.valor,
      recebido: 0,
      atrasado: 0,
      situacao: 'processing',
    });

    return negociation;
  }
}

export default new NegociacaoResource();
