module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('debito', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      consumidorId: {
        type: Sequelize.STRING,
      },
      lojistaId: {
        type: Sequelize.STRING,
      },
      seqdiv: {
        type: Sequelize.STRING,
      },
      inclusao: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      tipoDoc: {
        type: Sequelize.STRING,
      },
      contrato: {
        type: Sequelize.STRING,
      },
      valor: {
        type: Sequelize.STRING,
      },
      vencimento: {
        type: Sequelize.STRING,
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
