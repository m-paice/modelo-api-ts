module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('parcela_futura', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      parcelaNegociacaoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'parcela_negociacao',
          key: 'id',
        },
      },
      expiraEm: Sequelize.DATE,
      resolvida: Sequelize.BOOLEAN,
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
    queryInterface.dropTable('parcela_futura'),
};
