require("dotenv").config();

module.exports = {
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
};
