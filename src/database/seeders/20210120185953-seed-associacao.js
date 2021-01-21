module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'associacao',
      [
        {
          id: '08c2d233-e286-4fc3-9273-405e9a95db7f',
          usuarioId: '98e71427-c085-446b-829c-9260332f1fb0',
          cnpj: '00.000.000/0001-00',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('associacao', null, {}),
};
