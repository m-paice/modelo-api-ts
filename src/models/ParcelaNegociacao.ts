import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

import { NegociacaoInstance } from './Negociacao';

export type ParcelaNegociacaoInstance = {
  id: string;
  negociacaoId: string;
  parcela: number;
  vencimento: Date;
  valorParcela: number;
  dataPagamento: Date;
  situacao: string;
  notificacao: {
    doisDiasAntes: boolean;
    diaAtual: boolean;
    umDiaDepois: boolean;
    cincoDiasDopois: boolean;
  };
  negociacao?: NegociacaoInstance;
  createdAt?: Date;
  updatedAt?: Date;
};

const ParcelaNegociacao = sequelize.define(
  'ParcelaNegociacao',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    parcela: Sequelize.INTEGER,
    vencimento: Sequelize.DATE,
    valorParcela: Sequelize.DOUBLE,
    dataPagamento: Sequelize.DATE,
    situacao: Sequelize.STRING,
    notificacao: Sequelize.JSONB,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    tableName: 'parcela_negociacao',
    paranoid: true,
  }
);

ParcelaNegociacao.associate = (models) => {
  ParcelaNegociacao.belongsTo(models.Negociacao, {
    foreignKey: 'negociacaoId',
    as: 'negociacao',
  });
};

export default ParcelaNegociacao;
