module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'usuario',
      [
        {
          id: '98e71427-c085-446b-829c-9260332f1fb0',
          login: '00.000.000/0001-00',
          senha: '123456',
          nome: 'Associação Comercial',
          nascimento: '01/01/2020',
          email: 'suporte_associacao_comercial@email.com',
          celular: null,
          pessoais: null,
          termos: null,
          token: null,
          ativo: true,
          habilitado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('usuario', null, {}),
};
