module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('negociacao', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      consumidorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'consumidor',
          key: 'id',
        },
      },
      lojistaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'lojista',
          key: 'id',
        },
      },
      debitoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'debito',
          key: 'id',
        },
      },
      dataRegistro: Sequelize.DATE,
      divida: Sequelize.DOUBLE,
      desconto: Sequelize.DOUBLE,
      negociado: Sequelize.DOUBLE,
      recebido: Sequelize.DOUBLE,
      atrasado: Sequelize.DOUBLE,
      situacao: Sequelize.STRING,
      formaPagamento: Sequelize.STRING,
      parcelamento: Sequelize.INTEGER,
      dataVencimento: Sequelize.DATE,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('negociacao'),
};
