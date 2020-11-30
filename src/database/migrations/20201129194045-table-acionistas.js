module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("acionistas", {
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
          model: "lojista",
          key: "id",
        },
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false,
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable("acionistas"),
};
