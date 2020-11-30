import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

export type LojistaInstance = {
  id: string;
  razaoSocial: string;
  fantasia: string;
  cnpj: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  dataFundacao: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const Lojista = sequelize.define(
  "Lojista",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    razaoSocial: Sequelize.STRING,
    fantasia: Sequelize.STRING,
    cnpj: Sequelize.STRING,
    inscricaoMunicipal: Sequelize.STRING,
    inscricaoEstadual: Sequelize.STRING,
    dataFundacao: Sequelize.DATE,
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
    tableName: "lojista",
  }
);

Lojista.associate = (models) => {
  Lojista.belongsTo(models.Usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
  });
};

export default Lojista;
