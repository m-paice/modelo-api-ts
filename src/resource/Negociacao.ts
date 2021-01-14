import { addMonths } from 'date-fns';
import negociacaoRepository from '../repository/Negociacao';
import { NegociacaoInstance } from '../models/Negociacao';
import BaseResource from './BaseResource';

import debitoResource from './Debito';
import reguaNegociacaoResource from './ReguaNegociacao';
import parcelaNegociacaoResource from './ParcelaNegociacao';

// utils
import generateDate from '../utils/generateDate';

export class NegociacaoResource extends BaseResource<NegociacaoInstance> {
  constructor() {
    super(negociacaoRepository);
  }

  async create(data, options) {
    const debito = await debitoResource.findById(data.debitoId);
    const reguaNegociacao = await reguaNegociacaoResource.findById(
      data.reguaNegociacaoId,
    );

    if (!debito || !reguaNegociacao) {
      throw new Error('data negociation not found');
    }

    const desconto = (debito.valor * reguaNegociacao.desconto) / 100;
    const negociado = debito.valor - desconto;

    // cria a negociacao
    const negociation = await negociacaoRepository.create({
      ...data,
      parcelamento: Number(data.parcelamento),
      dataRegistro: new Date(),
      desconto,
      negociado,
      divida: debito.valor,
      recebido: 0,
      atrasado: 0,
      situacao: 'em dia',
    });

    // criar as parcelas da negociacao
    Array.from({ length: data.parcelamento }).forEach(async (item, index) => {
      const vencimento = index === 0
        ? negociation.dataVencimento
        : addMonths(negociation.dataVencimento, index);
      const valorParcela = negociation.negociado / negociation.parcelamento;

      await parcelaNegociacaoResource.create({
        negociacaoId: negociation.id,
        parcela: index + 1,
        vencimento,
        valorParcela,
        situacao: 'proxima',
      });
    });

    return negociation;
  }
}

export default new NegociacaoResource();
