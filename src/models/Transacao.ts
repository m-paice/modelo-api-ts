import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type TransacaoInstance = {
  id: string;
  parcelaNegociacaoId: string;
  negociacaoId: string;
  pagarmeId: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Transacao = sequelize.define(
  'Transacao',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    pagarmeId: Sequelize.INTEGER,
    status: Sequelize.STRING,
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
    tableName: 'transacao',
    paranoid: true,
  }
);

Transacao.associate = (models) => {
  Transacao.belongsTo(models.ParcelaNegociacao, {
    foreignKey: 'parcelaNegociacaoId',
    as: 'parcelaNegociacao',
  });
  Transacao.belongsTo(models.Negociacao, {
    foreignKey: 'negociacaoId',
    as: 'negociacao',
  });
};

export default Transacao;
