module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('debito', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    consumidorId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'consumidor',
        key: 'id',
      },
    },
    lojistaId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'lojista',
        key: 'id',
      },
    },
    seqdiv: Sequelize.STRING,
    inclusao: Sequelize.STRING,
    status: Sequelize.STRING,
    tipoDoc: Sequelize.STRING,
    contrato: Sequelize.STRING,
    valor: Sequelize.DOUBLE,
    vencimento: Sequelize.STRING,
    habilitado: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('debito'),
};
