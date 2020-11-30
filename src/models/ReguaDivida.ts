import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

export type ReguaDividaInstance = {
  id: string;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  ativo: boolean;
  prioridade: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const ReguaDivida = sequelize.define(
  "ReguaDivida",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome: Sequelize.STRING,
    dataInicio: Sequelize.DATE,
    dataFim: Sequelize.DATE,
    ativo: Sequelize.BOOLEAN,
    prioridade: Sequelize.INTEGER,
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
    tableName: "reguadivida",
  }
);

ReguaDivida.associate = (models) => {
  ReguaDivida.belongsTo(models.Lojista, {
    foreignKey: "lojistaId",
    as: "lojista",
  });
};

export default ReguaDivida;
