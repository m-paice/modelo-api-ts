import { Op } from 'sequelize';

import parcelasFuturasResouce from '../../../../resource/ParcelaFutura';
import parcelaNegociacaoResource from '../../../../resource/ParcelaNegociacao';
import carteiraResource from '../../../../resource/Carteira';
import negociacaoResource from '../../../../resource/Negociacao';

// models
import Negociacao from '../../../../models/Negociacao';

import queuedAsyncMap from '../../../../utils/queuedAsyncMap';

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
            include: [
              {
                model: Negociacao,
                as: 'negociacao',
                attributes: ['lojistaId'],
              },
            ],
          }
        );

        // pagar parcelas
        await parcelaNegociacaoResource.pagarParcelaNegociacao({
          parcelaNegociacaoId: parcelaNegociacao.id,
        });

        // registrar os lancamentos (recebimento - comissao)
        await carteiraResource.registraLancamentos({
          lojistaId: parcelaNegociacao.negociacao.lojistaId,
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
