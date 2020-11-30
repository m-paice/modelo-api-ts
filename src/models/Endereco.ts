import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

export type EnderecoInstance = {
  id: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
};

const Endereco = sequelize.define(
  "Endereco",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cep: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
  },
  {
    tableName: "endereco",
  }
);

Endereco.associate = (models) => {
  Endereco.belongsTo(models.Usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
  });
};

export default Endereco;
