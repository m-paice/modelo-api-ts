import Sequelize from 'sequelize';
import { connection as config } from '../config/database';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
);

export default sequelize;
