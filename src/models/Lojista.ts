import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

import { UsuarioInstance } from './Usuario';

export type LojistaInstance = {
  id: string;
  usuarioId: string;
  associacaoId: string;
  razaoSocial: string;
  fantasia: string;
  cnpj: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  dataFundacao: Date;
  usuario: UsuarioInstance;
  createdAt?: Date;
  updatedAt?: Date;
};

const Lojista = sequelize.define(
  'Lojista',
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
    tableName: 'lojista',
  }
);

Lojista.associate = (models) => {
  Lojista.belongsTo(models.Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario',
  });
  Lojista.belongsTo(models.Associacao, {
    foreignKey: 'associacaoId',
    as: 'associacao',
  });
  Lojista.hasOne(models.DadosBancarios, {
    foreignKey: 'lojistaId',
    as: 'dadosBancarios',
  });
};

export default Lojista;
