import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

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
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    cpf: Sequelize.STRING,
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
