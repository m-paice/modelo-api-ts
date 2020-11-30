import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    razaoSocial: DataTypes.STRING,
    fantasia: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    inscricaoMunicipal: DataTypes.STRING,
    inscricaoEstadual: DataTypes.STRING,
    dataFundacao: DataTypes.DATE,
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
