import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type DebitoInstance = {
  id: string;
  consumidorId: string;
  lojistaId: string;
  seqdiv: string;
  inclusao: string;
  status: string;
  tipoDoc: string;
  contrato: string;
  valor: string;
  vencimento: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Debito = sequelize.define(
  'Debito',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    seqdiv: Sequelize.STRING,
    inclusao: Sequelize.STRING,
    status: Sequelize.STRING,
    tipoDoc: Sequelize.STRING,
    contrato: Sequelize.STRING,
    valor: Sequelize.STRING,
    vencimento: Sequelize.STRING,
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
    tableName: 'debito',
  }
);

Debito.associate = (models) => {
  Debito.belongsTo(models.Consumidor, {
    foreignKey: 'consumidorId',
    as: 'consumidor',
  });
  Debito.belongsTo(models.Lojista, {
    foreignKey: 'lojistaId',
    as: 'lojista',
  });
};

export default Debito;
