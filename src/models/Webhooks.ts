import { DataTypes, Sequelize } from 'sequelize';

export type WebhooksInstace = {
  type: string
  driverId: string
  webhookUrl: string
}

const Webhooks = (sequelize: Sequelize) => {
  const WebhooksRef = sequelize.define('webhooks', {
    type: DataTypes.STRING,
    driverId: DataTypes.STRING,
    webhookUrl: DataTypes.STRING,
  },
  {
    tableName: 'webhooks',
  });

  return WebhooksRef;
};

export default Webhooks;
