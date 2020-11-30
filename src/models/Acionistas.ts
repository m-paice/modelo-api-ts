import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

export type AcionistasInstance = {
  id: string;
  nome: string;
  quota: string;
  cpf: string;
  dataNascimento: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const Acionistas = sequelize.define<AcionistasInstance, any, any>(
  "Acionistas",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome: Sequelize.STRING,
    quota: Sequelize.STRING,
    cpf: Sequelize.STRING,
    dataNascimento: Sequelize.DATE,
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
