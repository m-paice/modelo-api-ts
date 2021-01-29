import { addMonths } from 'date-fns';
import negociacaoRepository from '../repository/Negociacao';
import { NegociacaoInstance } from '../models/Negociacao';
import BaseResource from './BaseResource';

import debitoResource from './Debito';
import reguaNegociacaoResource from './ReguaNegociacao';
import parcelaNegociacaoResource from './ParcelaNegociacao';

import { pagarComCartao } from '../services/pagarme';

export class NegociacaoResource extends BaseResource<NegociacaoInstance> {
  constructor() {
    super(negociacaoRepository);
  }

  // @ts-ignore
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
    await Promise.all(
      Array.from({ length: data.parcelamento }).map((_, index) => {
        const vencimento = index === 0
          ? negociation.dataVencimento
          : addMonths(negociation.dataVencimento, index);
        const valorParcela = negociation.negociado / negociation.parcelamento;

        return parcelaNegociacaoResource.create({
          negociacaoId: negociation.id,
          parcela: index + 1,
          vencimento,
          valorParcela,
          situacao: 'proxima',
        });
      }),
    );

    if (data.formaPagamento === 'cartao') {
      const countParcelas = await parcelaNegociacaoResource.count({
        where: {
          negociacaoId: negociation.id,
        },
      });

      const primeiraParcela = await parcelaNegociacaoResource.findOne({
        where: {
          negociacaoId: negociation.id,
          parcela: 1,
        },
      });

      const {
        id, nome, login, email, celular, nascimento,
      } = data.usuario;

      await pagarComCartao({
        price: negociado * 100,
        installments: Number(data.parcelamento),
        cardHash: data.cardHash,
        name: nome,
        document: login,
        email,
        phoneNumber: celular,
        birthday: new Date(nascimento),
        usuarioId: id,
      });

      await parcelaNegociacaoResource.updateById(primeiraParcela.id, {
        dataPagamento: new Date(),
        situacao: 'pago',
      });

      if (countParcelas === 1) {
        // parcelas que tem apenas 1 deve ser quitada
        await this.updateById(negociation.id, {
          recebido: negociado,
          situacao: 'quitado',
        });
      } else {
        await this.updateById(negociation.id, {
          recebido: primeiraParcela.valorParcela,
        });
      }
    }

    return negociation;
  }
}

export default new NegociacaoResource();
