module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('parcela_negociacao', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      negociacaoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'negociacao',
          key: 'id',
        },
      },
      parcela: Sequelize.INTEGER,
      vencimento: Sequelize.DATE,
      valorParcela: Sequelize.DECIMAL,
      dataPagamento: Sequelize.DATE,
      situacao: Sequelize.STRING,
      notificacao: Sequelize.JSONB,
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
    queryInterface.dropTable('parcela_negociacao'),
};
