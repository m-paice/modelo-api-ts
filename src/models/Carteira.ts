import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type CarteiraInstance = {
  id: string;
  lojistaId: string;
  documento: string;
  nome: string;
  operacao: string;
  valor: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const Carteira = sequelize.define<CarteiraInstance, any, any>(
  'Carteira',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    documento: Sequelize.STRING,
    nome: Sequelize.STRING,
    operacao: Sequelize.STRING,
    valor: Sequelize.DOUBLE,
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
    tableName: 'carteira',
  }
);

Carteira.associate = (models) => {
  Carteira.belongsTo(models.Lojista, {
    foreignKey: 'lojistaId',
    as: 'lojista',
  });
};

export default Carteira;
