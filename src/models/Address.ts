import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

export type AddresInstance = {
  id: string;
  zipcode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
};

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    zipcode: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    complement: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    city: DataTypes.STRING,
    uf: DataTypes.STRING,
  },
  {
    tableName: "address",
  }
);

Address.associate = (models) => {
  Address.belongsTo(models.Users, { foreignKey: "userId", as: "user" });
};

export default Address;
