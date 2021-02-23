import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type UsersInstance = {
  id: string;
  serviceId: string;
  webhookUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Users = sequelize.define(
  'Users',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    serviceId: Sequelize.STRING,
    webhookUrl: Sequelize.STRING,
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
    tableName: 'users',
  }
);

Users.associate = (models) => {};

export default Users;
