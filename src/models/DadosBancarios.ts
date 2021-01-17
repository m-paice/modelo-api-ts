import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type DadosBancariosInstance = {
  id: string;
  lojistaId: string;
  tipo: string;
  banco: string;
  nomeInstituicao: string;
  agencia: string;
  conta: string;
  nomeTitular: string;
  documento: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const DadosBancarios = sequelize.define(
  'DadosBancarios',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    tipo: Sequelize.STRING,
    banco: Sequelize.STRING,
    nomeInstituicao: Sequelize.STRING,
    agencia: Sequelize.STRING,
    conta: Sequelize.STRING,
    nomeTitular: Sequelize.STRING,
    documento: Sequelize.STRING,
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
    tableName: 'dados_bancarios',
  }
);

DadosBancarios.associate = (models) => {
  DadosBancarios.belongsTo(models.Lojista, {
    foreignKey: 'lojistaId',
    as: 'lojista',
  });
};

export default DadosBancarios;
