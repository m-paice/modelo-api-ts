import { addDays } from 'date-fns';
import { Op } from 'sequelize';

// instances
import { ParcelaNegociacaoInstance } from '../../../../models/ParcelaNegociacao';
// models
import Negociacao from '../../../../models/Negociacao';
import Consumidor from '../../../../models/Consumidor';
import Usuario from '../../../../models/Usuario';
// resources
import parcelaNegociacaoResource from '../../../../resource/ParcelaNegociacao';
// utils
import queuedAsyncMap from '../../../../utils/queuedAsyncMap';
// services
import nodemailer from '../../../../services/nodemailer';

const include = [
  {
    model: Negociacao,
    as: 'negociacao',
    attributes: ['consumidorId'],
    include: [
      {
        model: Consumidor,
        as: 'consumidor',
        attributes: ['usuarioId'],
        include: [
          {
            model: Usuario,
            as: 'usuario',
            attributes: ['nome', 'email'],
          },
        ],
      },
    ],
  },
];

export default class BoletoJob {
  async getPortionsNegociations() {
    // parcela a vencer em 2 dias
    const vencimento = addDays(new Date(), 2);

    return parcelaNegociacaoResource.findMany({
      where: {
        vencimento: {
          [Op.between]: [new Date(), vencimento],
        },
        dataPagamento: null,
        notificacao: {
          doisDiasAntes: false,
        },
      },
      include,
    });
  }

  async getPortionNegociationCurrentDay() {
    return parcelaNegociacaoResource.findMany({
      where: {
        vencimento: new Date(),
        dataPagamento: null,
        notificacao: {
          diaAtual: false,
        },
      },
      include,
    });
  }

  async handle() {
    const portionsNegociations = await this.getPortionsNegociations();

    await queuedAsyncMap(
      portionsNegociations,
      async (portion: ParcelaNegociacaoInstance) => {
        console.log(
          `#Boleto encontrado [${portion.id}] => enviando e-mail !!!`
        );
        const { usuario } = portion.negociacao.consumidor;

        const sendEmail = async () =>
          nodemailer({
            to: usuario.email,
            subject: 'billToVencer',
            message: `${usuario.nome} seu boleto vence nos prómixos 2 dias.`,
          });

        sendEmail();

        await parcelaNegociacaoResource.updateById(
          portion.id,
          {
            notificacao: {
              ...portion.notificacao,
              doisDiasAntes: true,
            },
          },
          { dontEmit: true }
        );
      }
    );
  }
}
