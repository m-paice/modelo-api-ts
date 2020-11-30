import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

export type AcionistasInstance = {
  id: string;
  nome: string;
  quota: string;
  cpf: string;
  dataNascimento: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const Acionistas = sequelize.define(
  "Acionistas",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    quota: DataTypes.STRING,
    cpf: DataTypes.STRING,
    dataNascimento: DataTypes.DATE,
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
    tableName: "acionistas",
  }
);

Acionistas.associate = (models) => {
  Acionistas.belongsTo(models.Lojista, {
    foreignKey: "lojistaId",
    as: "lojista",
  });
};

export default Acionistas;
