module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('carteira', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      lojistaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'lojista',
          key: 'id',
        },
      },
      documento: Sequelize.STRING,
      nome: Sequelize.STRING,
      operacao: Sequelize.STRING,
      valor: Sequelize.DOUBLE,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('carteira'),
};
