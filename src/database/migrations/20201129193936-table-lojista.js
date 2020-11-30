module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("lojista", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      razaoSocial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fantasia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inscricaoMunicipal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inscricaoEstadual: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataFundacao: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable("lojista"),
};
