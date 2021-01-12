import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type ReguaNegociacaoInstance = {
  id: string;
  idadeDivida: number;
  desconto: number;
  maximoParcela: number;
  atenuador: number;
  multa: number;
  juros: number;
  assessoria: number;
  reajuste: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const ReguaNegociacao = sequelize.define(
  'ReguaNegociacao',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    idadeDivida: Sequelize.INTEGER,
    desconto: Sequelize.INTEGER,
    maximoParcela: Sequelize.INTEGER,
    atenuador: Sequelize.INTEGER,
    multa: Sequelize.INTEGER,
    juros: Sequelize.INTEGER,
    assessoria: Sequelize.DECIMAL,
    reajuste: Sequelize.INTEGER,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'regua_negociacao',
  }
);

ReguaNegociacao.associate = (models) => {};

export default ReguaNegociacao;
