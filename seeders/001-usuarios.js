const now = new Date()
const { hashSync } = require('bcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'Maurício',
          sobrenome: 'Correia Dantas',
          email: 'mauricio.dantascp@gmail.com',
          password:'$2b$10$4P9ofTvzLRHdVAtWJr4dAunskgYIgT1QAXePqIWKvL0P7IzhdZX0u', // 123456
          codeVerify: 123456,
          isVerify: true,
          nomeEmpresa: 'Endeavor Comp.',
          cnpj: '12345678',
          createdAt: now,
          updatedAt: now
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {})
  }
}
