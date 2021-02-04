import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type ParcelaFuturaInstance = {
  id: string;
  parcelaNegociacaoId: string;
  expiraEm: Date;
  resolvida: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const ParcelaFutura = sequelize.define(
  'ParcelaFutura',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    expiraEm: Sequelize.DATE,
    resolvida: Sequelize.BOOLEAN,
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
    tableName: 'parcela_futura',
  }
);

ParcelaFutura.associate = (models) => {
  ParcelaFutura.belongsTo(models.ParcelaNegociacao, {
    foreignKey: 'parcelaNegociacaoId',
    as: 'parcelaNegociacao',
  });
};

export default ParcelaFutura;
