import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type ReguaDistribuicaoInstance = {
  id: string;
  tipo: string;
  regra: string;
  percentual: number;
  fixa: string;
  transacao: {};
  createdAt?: Date;
  updatedAt?: Date;
};

const ReguaDistribuicao = sequelize.define(
  'ReguaDistribuicao',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    tipo: Sequelize.STRING,
    regra: Sequelize.STRING,
    percentual: Sequelize.INTEGER,
    fixa: Sequelize.STRING,
    transacao: Sequelize.JSONB,
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
    tableName: 'regua_distribuicao',
  }
);

ReguaDistribuicao.associate = (models) => {
  ReguaDistribuicao.belongsTo(models.Lojista, {
    foreignKey: 'lojistaId',
    as: 'lojista',
  });
};

export default ReguaDistribuicao;
