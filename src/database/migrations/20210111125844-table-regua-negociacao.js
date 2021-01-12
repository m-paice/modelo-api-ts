module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('regua_negociacao', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      idadeDivida: Sequelize.INTEGER,
      desconto: Sequelize.INTEGER,
      maximoParcela: Sequelize.INTEGER,
      atenuador: Sequelize.INTEGER,
      multa: Sequelize.INTEGER,
      juros: Sequelize.INTEGER,
      assessoria: Sequelize.DECIMAL,
      reajuste: Sequelize.INTEGER,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('regua_negociacao'),
};
