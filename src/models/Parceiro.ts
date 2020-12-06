import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type FisicaInstance = {
  id: string;
  usuarioId: string;
  descricao: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Parceiro = sequelize.define(
  'Parceiro',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    descricao: Sequelize.STRING,
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
    tableName: 'parceiro',
  },
);

Parceiro.associate = (models) => {
  Parceiro.belongsTo(models.Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario',
  });
};

export default Parceiro;
