import Sequelize from 'sequelize';

import sequelize from '../services/sequelize';

export type EnderecoInstance = {
  id: string;
  usuarioId: string;
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
  'Endereco',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    cep: Sequelize.STRING,
    rua: Sequelize.STRING,
    numero: Sequelize.STRING,
    complemento: Sequelize.STRING,
    bairro: Sequelize.STRING,
    cidade: Sequelize.STRING,
    uf: Sequelize.STRING,
  },
  {
    tableName: 'endereco',
  }
);

Endereco.associate = (models) => {
  Endereco.belongsTo(models.Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario',
  });
};

export default Endereco;
