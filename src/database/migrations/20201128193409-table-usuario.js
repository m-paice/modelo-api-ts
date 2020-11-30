module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nascimento: Sequelize.STRING,
      email: Sequelize.STRING,
      celular: Sequelize.STRING,
      pessoais: Sequelize.JSONB,
      termos: Sequelize.JSONB,
      token: Sequelize.JSONB,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable("usuario"),
};
