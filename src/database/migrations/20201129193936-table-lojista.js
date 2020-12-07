module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('lojista', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      usuarioId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id',
        },
      },
      razaoSocial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fantasia: Sequelize.STRING,
      cnpj: Sequelize.STRING,
      inscricaoMunicipal: Sequelize.STRING,
      inscricaoEstadual: Sequelize.STRING,
      dataFundacao: Sequelize.DATE,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('lojista'),
};
