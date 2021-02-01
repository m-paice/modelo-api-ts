module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('transacao', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      parcelaNegociacaoId: {
        type: Sequelize.UUID,
        // allowNull: false,
        references: {
          model: 'parcela_negociacao',
          key: 'id',
        },
      },
      negociacaoId: {
        type: Sequelize.UUID,
        // allowNull: false,
        references: {
          model: 'negociacao',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pagarmeId: Sequelize.INTEGER,
      status: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('transacao'),
};
