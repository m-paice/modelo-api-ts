module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("reguadistribuicao", {
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
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      regra: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      percentual: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      fixa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transacao: {
        type: Sequelize.JSONB,
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

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable("reguadistribuicao"),
};
