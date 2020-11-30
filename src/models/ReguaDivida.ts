import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    dataFim: DataTypes.DATE,
    ativo: DataTypes.BOOLEAN,
    prioridade: DataTypes.INTEGER,
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
