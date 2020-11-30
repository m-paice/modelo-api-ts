import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

export type FisicaInstance = {
  id: string;
  cpf: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Fisica = sequelize.define(
  "Fisica",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cpf: DataTypes.STRING,
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
    tableName: "fisica",
  }
);

Fisica.associate = (models) => {
  Fisica.belongsTo(models.Usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
  });
};

export default Fisica;
