import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

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
  "ReguaDistribuicao",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tipo: DataTypes.STRING,
    regra: DataTypes.STRING,
    percentual: DataTypes.INTEGER,
    fixa: DataTypes.STRING,
    transacao: DataTypes.JSONB,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "reguadistribuicao",
  }
);

ReguaDistribuicao.associate = (models) => {
  ReguaDistribuicao.belongsTo(models.Lojista, {
    foreignKey: "lojistaId",
    as: "lojista",
  });
};

export default ReguaDistribuicao;
