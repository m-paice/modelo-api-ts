import transacaoRepository from '../repository/Transacao';
import { TransacaoInstance } from '../models/Transacao';
import BaseResource from './BaseResource';

// resource
import parcelaNegociacaoResource from './ParcelaNegociacao';
import negociacaoResource from './Negociacao';
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
    const { id, nome, login, email, celular, nascimento } = data.usuario;

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
    const { id, nome, login, email, celular, nascimento } = data.usuario;

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
  }

  async transactionChanged(data) {
    const { id, current_status } = data;

    const transacao = await this.findOne({
      where: {
        pagarmeId: id,
      },
    });

    if (!transacao) return;

    await this.updateById(transacao.id, {
      status: current_status,
    });

    const statusTransaction = {
      async processing() {},
      async authorized() {},
      async paid() {
        if (data.payment_method === 'boleto') {
          await parcelaNegociacaoResource.updateById(
            transacao.parcelaNegociacaoId,
            {
              dataPagamento: new Date(),
              situacao: 'pago',
            }
          );
        }
      },
      async refunded() {},
      async waiting_payment() {},
      async pending_refund() {},
      async refused() {
        await negociacaoResource.updateById(transacao.negociacaoId, {
          situacao: 'recusado',
        });
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
