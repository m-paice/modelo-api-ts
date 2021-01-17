module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('dados_bancarios', {
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
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      banco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomeInstituicao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomeTitular: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      documento: {
        type: Sequelize.STRING,
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
    queryInterface.dropTable('dados_bancarios'),
};
