import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type AssociacaoInstance = {
  id: string;
  usuarioId: string;
  cnpj: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Associacao = sequelize.define<AssociacaoInstance, any, any>(
  'Associacao',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    cnpj: Sequelize.STRING,
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
    tableName: 'associacao',
  }
);

Associacao.associate = (models) => {
  Associacao.hasOne(models.Lojista, {
    foreignKey: 'associacaoId',
    as: 'lojistas',
  });
};

export default Associacao;
