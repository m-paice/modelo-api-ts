import { Op } from 'sequelize';

import parcelasFuturasResouce from '../../../../resource/ParcelaFutura';
import parcelaNegociacaoResource from '../../../../resource/ParcelaNegociacao';
import carteiraResource from '../../../../resource/Carteira';
import negociacaoResource from '../../../../resource/Negociacao';

// models
import Negociacao from '../../../../models/Negociacao';
import Consumidor from '../../../../models/Consumidor';
import Usuario from '../../../../models/Usuario';

import queuedAsyncMap from '../../../../utils/queuedAsyncMap';

const include = [
  {
    model: Negociacao,
    as: 'negociacao',
    include: [
      {
        model: Consumidor,
        as: 'consumidor',
        include: [
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['nome'],
          },
        ],
      },
    ],
  },
];

export default class PagamentoJob {
  async verificaParcelasFuturas() {
    return parcelasFuturasResouce.findMany({
      where: {
        expiraEm: {
          [Op.lte]: new Date(),
        },
        resolvida: false,
      },
    });
  }

  async handle() {
    const parcelasFuturas = await this.verificaParcelasFuturas();

    if (parcelasFuturas.length) {
      console.log(
        `[worker]:: ${parcelasFuturas.length} parcelas futuras encontradas.`
      );

      await queuedAsyncMap(parcelasFuturas, async (parcelaFutura) => {
        await parcelasFuturasResouce.updateById(parcelaFutura.id, {
          resolvida: true,
        });

        const parcelaNegociacao = await parcelaNegociacaoResource.updateById(
          parcelaFutura.parcelaNegociacaoId,
          {
            dataPagamento: new Date(),
            situacao: 'pago',
          },
          {
            include,
          }
        );

        // pagar parcelas
        await parcelaNegociacaoResource.pagarParcelaNegociacao({
          parcelaNegociacaoId: parcelaNegociacao.id,
        });

        // registrar os lancamentos (recebimento - comissao)
        await carteiraResource.registraLancamentos({
          lojistaId: parcelaNegociacao.negociacao.lojistaId,
          reguaNegociacaoId: parcelaNegociacao.negociacao.reguaNegociacaoId,
          documento: parcelaNegociacao.negociacao.consumidor.cpf,
          nome: parcelaNegociacao.negociacao.consumidor.usuario.nome,
          valor: parcelaNegociacao.valorParcela,
        });

        // atualizar a negociacao
        await negociacaoResource.receberValorParcelaNegociacao({
          negociacaoId: parcelaNegociacao.negociacaoId,
          valorParcela: parcelaNegociacao.valorParcela,
        });
      });
    }
  }
}
