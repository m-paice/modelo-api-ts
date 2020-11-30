import Sequelize from "sequelize";

import sequelize from "../services/sequelize";

const { DataTypes } = Sequelize;

export type DadosBancariosInstance = {
  id: string;
  tipo: string;
  banco: string;
  nomeInstituicao: string;
  agencia: string;
  conta: string;
  nomeTitular: string;
  documento: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const DadosBancarios = sequelize.define(
  "DadosBancarios",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tipo: DataTypes.STRING,
    banco: DataTypes.STRING,
    nomeInstituicao: DataTypes.STRING,
    agencia: DataTypes.STRING,
    conta: DataTypes.STRING,
    nomeTitular: DataTypes.STRING,
    documento: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "dadosbancarios",
  }
);

DadosBancarios.associate = (models) => {
  DadosBancarios.belongsTo(models.Lojista, {
    foreignKey: "lojistaId",
    as: "lojista",
  });
};

export default DadosBancarios;
