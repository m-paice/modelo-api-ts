import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type ParcelaNegociacaoInstance = {
  id: string;
  negociacaoId: string;
  parcela: number;
  vencimento: Date;
  valorParcela: number;
  dataPagamento: Date;
  situacao: string;
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
    valorParcela: Sequelize.DECIMAL,
    dataPagamento: Sequelize.DATE,
    situacao: Sequelize.STRING,
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
    tableName: 'parcela_negociacao',
  }
);

ParcelaNegociacao.associate = (models) => {
  ParcelaNegociacao.belongsTo(models.Negociacao, {
    foreignKey: 'negociacaoId',
    as: 'negociacao',
  });
};

export default ParcelaNegociacao;
