import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type NegociacaoInstance = {
  id: string;
  consumidorId: string;
  lojistaId: string;
  debitoId: string;
  dataRegistro: Date;
  divida: number;
  desconto: number;
  negociado: number;
  recebido: number;
  atrasado: number;
  situacao: string;
  formaPagamento: string;
  parcelamento: number;
  dataVencimento: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const Negociacao = sequelize.define(
  'Negociacao',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    dataRegistro: Sequelize.DATE,
    divida: Sequelize.DECIMAL,
    desconto: Sequelize.DECIMAL,
    negociado: Sequelize.DECIMAL,
    recebido: Sequelize.DECIMAL,
    atrasado: Sequelize.DECIMAL,
    situacao: Sequelize.STRING,
    formaPagamento: Sequelize.STRING,
    parcelamento: Sequelize.INTEGER,
    dataVencimento: Sequelize.DATE,
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
    tableName: 'negociacao',
  }
);

Negociacao.associate = (models) => {
  Negociacao.belongsTo(models.Consumidor, {
    foreignKey: 'consumidorId',
    as: 'consumidor',
  });
  Negociacao.belongsTo(models.Lojista, {
    foreignKey: 'lojistaId',
    as: 'lojista',
  });
  Negociacao.belongsTo(models.Debito, {
    foreignKey: 'debitoId',
    as: 'debito',
  });
};

export default Negociacao;
