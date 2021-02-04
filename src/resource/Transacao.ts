import transacaoRepository from '../repository/Transacao';
import { TransacaoInstance } from '../models/Transacao';
import BaseResource from './BaseResource';

// resource
import parcelaNegociacaoResource from './ParcelaNegociacao';
import negociacaoResource from './Negociacao';
import carteiraResource from './Carteira';
import parcelaFuturaResource from './ParcelaFutura';
// service
import { pagarComCartao, pagarComBoleto } from '../services/pagarme';

export class TransacaoResource extends BaseResource<TransacaoInstance> {
  constructor() {
    super(transacaoRepository);
  }

  async pagamentoComCartao(data: {
    negociado: number;
    parcelamento: string;
    cardHash: string;
    usuario: any;
  }) {
    const { negociado, parcelamento, cardHash } = data;
    const {
      id, nome, login, email, celular, nascimento,
    } = data.usuario;

    const response = await pagarComCartao({
      price: negociado * 100,
      installments: Number(parcelamento),
      cardHash,
      name: nome,
      document: login,
      email,
      phoneNumber: celular,
      birthday: new Date(nascimento),
      usuarioId: id,
    });

    return response;
  }

  async validaPagamentoCartao(data) {
    const { valorDebito, valorDesconto } = data;

    const desconto = (valorDebito * valorDesconto) / 100;
    const negociado = valorDebito - desconto;

    const response = await this.pagamentoComCartao({
      ...data,
      negociado,
    });

    await this.create({
      negociacaoId: data.negociacaoId,
      pagarmeId: response.id,
      status: response.status,
    });

    return response;
  }

  async pagamentoComBoleto(data: {
    valorParcela: number;
    vencimento: string;
    usuario: any;
  }) {
    const { valorParcela, vencimento } = data;
    const {
      id, nome, login, email, celular, nascimento,
    } = data.usuario;

    const response = await pagarComBoleto({
      usuarioId: id,
      price: valorParcela * 100,
      name: nome,
      document: login,
      dueDate: new Date(vencimento),
      email,
      phoneNumber: celular,
      birthday: new Date(nascimento),
    });

    return response;
  }

  async validaPagamentoBoleto(data) {
    const response = await this.pagamentoComBoleto(data);

    await this.create({
      pagarmeId: response.id,
      status: response.status,
      parcelaNegociacaoId: data.parcelaNegociacaoId,
    });

    return response;
  }

  async registrarLancamentos(data: { lojistaId: string; valor: number }) {
    const { lojistaId, valor } = data;

    await carteiraResource.registrarComissao({
      lojistaId,
      valor,
    });
  }

  async transactionChanged(data) {
    const {
      id,
      current_status,
      transaction: { payment_method },
    } = data;

    const transacao = await this.findOne({
      where: {
        pagarmeId: id,
      },
    });

    if (!transacao) return;

    await this.updateById(transacao.id, {
      status: current_status,
    });

    const typePaymentMethodPaid = {
      async credit_card() {
        const countParcelas = await parcelaNegociacaoResource.count({
          where: {
            negociacaoId: transacao.negociacaoId,
          },
        });

        if (countParcelas === 1) {
          const parcela = await parcelaNegociacaoResource.findOne({
            where: {
              negociacaoId: transacao.negociacaoId,
            },
          });

          // pagar parcela
          await parcelaNegociacaoResource.pagarParcelaNegociacao({
            parcelaNegociacaoId: parcela.id,
          });

          const negociacao = await negociacaoResource.findById(
            transacao.negociacaoId,
          );

          // registrar o recebimento e a comissao
          await carteiraResource.registraLancamentos({
            lojistaId: negociacao.lojistaId,
            valor: parcela.valorParcela,
          });

          // atualizar a negociacao
          await negociacaoResource.receberValorParcelaNegociacao({
            negociacaoId: transacao.negociacaoId,
            valorParcela: parcela.valorParcela,
          });

          // quitar a negociacao
          await negociacaoResource.quitarNegociacao({
            negociacaoId: transacao.negociacaoId,
            valorNegociado: parcela.valorParcela,
          });

          return;
        }

        const parcela = await parcelaNegociacaoResource.findOne({
          where: {
            negociacaoId: transacao.negociacaoId,
            parcela: 1,
          },
        });

        // pagar parcela
        await parcelaNegociacaoResource.pagarParcelaNegociacao({
          parcelaNegociacaoId: parcela.id,
        });

        const negociacao = await negociacaoResource.findById(
          transacao.negociacaoId,
        );

        // registrar o recebimento e a comissao
        await carteiraResource.registraLancamentos({
          lojistaId: negociacao.lojistaId,
          valor: parcela.valorParcela,
        });

        // registrar as proximas parcelas a serem recebidas
        await parcelaFuturaResource.registrarProximasParcelas({
          negociacaoId: transacao.negociacaoId,
        });

        // atualizar a negociacao
        await negociacaoResource.receberValorParcelaNegociacao({
          negociacaoId: transacao.negociacaoId,
          valorParcela: parcela.valorParcela,
        });

        // TODO: tratar quando a ultima parcela for paga
      },
      async boleto() {
        const parcela = await parcelaNegociacaoResource.updateById(
          transacao.parcelaNegociacaoId,
          {
            situacao: 'pago',
          },
        );

        const negociacao = await negociacaoResource.findById(
          transacao.negociacaoId,
        );

        // registrar o recebimento e a comissao
        await carteiraResource.registraLancamentos({
          lojistaId: negociacao.lojistaId,
          valor: parcela.valorParcela,
        });
      },
    };

    const typePaymentMethodRefused = {
      async credit_card() {
        await negociacaoResource.updateById(transacao.negociacaoId, {
          situacao: 'recusado',
        });
      },
      boleto() {},
    };

    const statusTransaction = {
      async processing() {},
      async authorized() {},
      async paid() {
        await typePaymentMethodPaid[payment_method]();
      },
      async refunded() {},
      async waiting_payment() {},
      async pending_refund() {},
      async refused() {
        await typePaymentMethodRefused[payment_method]();
      },
      async analyzing() {},
      async pending_review() {},
    };

    statusTransaction[current_status]();
  }

  async subscriptionChanged(data) {}

  async recipientChanged(data) {}

  async verificaPostback(data) {
    console.log(JSON.stringify(data, null, 2));

    const objectReceived = {
      transaction: await this.transactionChanged(data),
      subscription: await this.subscriptionChanged(data),
      recipient: await this.recipientChanged(data),
    };

    await objectReceived[data.object];
  }
}

export default new TransacaoResource();
