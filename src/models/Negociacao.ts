import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

import { ConsumidorInstance } from './Consumidor';
import { ReguaNegociacaoInstance } from './ReguaNegociacao';
import { ParcelaNegociacaoInstance } from './ParcelaNegociacao';

export type NegociacaoInstance = {
  id: string;
  consumidorId: string;
  lojistaId: string;
  debitoId: string;
  reguaNegociacaoId: string;
  dataRegistro: Date;
  divida: number;
  desconto: number;
  negociado: number;
  recebido: number;
  atrasado: number;
  situacao: string;
  formaPagamento: string;
  parcelamento: number;
  dataVencimento: Date;
  consumidor: ConsumidorInstance;
  parcelas: [ParcelaNegociacaoInstance];
  reguaNegociacao: ReguaNegociacaoInstance;
  createdAt?: Date;
  updatedAt?: Date;
};

const Negociacao = sequelize.define(
  'Negociacao',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    dataRegistro: Sequelize.DATE,
    divida: Sequelize.INTEGER,
    desconto: Sequelize.INTEGER,
    negociado: Sequelize.INTEGER,
    recebido: Sequelize.INTEGER,
    atrasado: Sequelize.INTEGER,
    situacao: Sequelize.STRING,
    formaPagamento: Sequelize.STRING,
    parcelamento: Sequelize.INTEGER,
    dataVencimento: Sequelize.DATE,
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
    tableName: 'negociacao',
    paranoid: true,
  }
);

Negociacao.associate = (models) => {
  Negociacao.belongsTo(models.Consumidor, {
    foreignKey: 'consumidorId',
    as: 'consumidor',
  });
  Negociacao.belongsTo(models.Lojista, {
    foreignKey: 'lojistaId',
    as: 'lojista',
  });
  Negociacao.belongsTo(models.Debito, {
    foreignKey: 'debitoId',
    as: 'debito',
  });
  Negociacao.belongsTo(models.ReguaNegociacao, {
    foreignKey: 'reguaNegociacaoId',
    as: 'reguaNegociacao',
  });
  Negociacao.hasMany(models.ParcelaNegociacao, {
    foreignKey: 'negociacaoId',
    as: 'parcelas',
  });
};

export default Negociacao;
