import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

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
  'Usuario',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    login: Sequelize.STRING,
    senha: Sequelize.STRING,
    nome: Sequelize.STRING,
    nascimento: Sequelize.STRING,
    email: Sequelize.STRING,
    celular: Sequelize.STRING,
    pessoais: Sequelize.JSONB,
    token: Sequelize.JSONB,
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
    tableName: 'usuario',
  },
);

export default Usuario;
