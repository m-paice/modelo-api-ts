import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

export type UsuarioInstance = {
  id: string;
  login: string;
  senha: string;
  nome: string;
  nascimento: string;
  email: string;
  celular: string;
  pessoais: {
    rg?: string;
  };
  token: {};
  createdAt?: Date;
  updatedAt?: Date;
};

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    nome: DataTypes.STRING,
    nascimento: DataTypes.STRING,
    email: DataTypes.STRING,
    celular: DataTypes.STRING,
    pessoais: DataTypes.JSONB,
    token: DataTypes.JSONB,
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
    tableName: "usuario",
  }
);

export default Usuario;
