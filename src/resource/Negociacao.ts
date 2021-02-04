import { addMonths } from 'date-fns';

// repository
import negociacaoRepository from '../repository/Negociacao';
// model
import { NegociacaoInstance } from '../models/Negociacao';
// resource
import BaseResource from './BaseResource';
import debitoResource from './Debito';
import reguaNegociacaoResource from './ReguaNegociacao';
import parcelaNegociacaoResource from './ParcelaNegociacao';
import transacaoResource from './Transacao';

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
        const vencimento =
          index === 0
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
      })
    );

    // validar o pagamento
    if (data.formaPagamento === 'cartao') {
      await transacaoResource.validaPagamentoCartao({
        ...data,
        negociacaoId: negociation.id,
        valorDebito: debito.valor,
        valorDesconto: reguaNegociacao.desconto,
      });
    }

    return negociation;
  }

  async quitarNegociacao(data: {
    negociacaoId: string;
    valorNegociado: number;
  }) {
    const { negociacaoId, valorNegociado } = data;

    await this.updateById(negociacaoId, {
      situacao: 'quitado',
      negociado: valorNegociado,
    });
  }

  async receberValorParcelaNegociacao(data: {
    negociacaoId: string;
    valorParcela: number;
  }) {
    const { negociacaoId, valorParcela } = data;

    const negociacao = await this.findById(negociacaoId);

    await this.updateById(negociacaoId, {
      recebido: negociacao.recebido + valorParcela,
    });
  }

  async destroyById(id, options) {
    const parcelas = await parcelaNegociacaoResource.findMany({
      where: {
        negociacaoId: id,
      },
    });

    const transacoes = await transacaoResource.findMany({
      where: {
        negociacaoId: id,
      },
    });

    // remover todas as parcelas
    Promise.all(
      parcelas.map(async (item) =>
        parcelaNegociacaoResource.destroyById(item.id)
      )
    );

    // remover todas as transações
    Promise.all(
      transacoes.map(async (item) => transacaoResource.destroyById(item.id))
    );

    return negociacaoRepository.destroyById(id, options);
  }
}

export default new NegociacaoResource();
