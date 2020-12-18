require('dotenv').config();

module.exports = {
  // migrations sequelize
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  options: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    operatorsAliases: false,
    timestamps: true,
  },
  logging: false,

  // connection sequelize
  connection: {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      operatorsAliases: false,
      logging: false,
    },
  },
};
