import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type ConsumidorInstance = {
  id: string;
  usuarioId: string;
  cpf: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Consumidor = sequelize.define(
  'Consumidor',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    cpf: Sequelize.STRING,
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
    tableName: 'consumidor',
  }
);

Consumidor.associate = (models) => {
  Consumidor.belongsTo(models.Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario',
  });
  Consumidor.hasMany(models.Debito, {
    foreignKey: 'id',
    as: 'debitos',
  });
};

export default Consumidor;
