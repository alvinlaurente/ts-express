const uuid = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User', [
      {
        id: uuid.v4(),
        name: 'Test User 1',
        email: 'usertest1@vokraf.com',
        password: bcrypt.hashSync('usertest', 10),
      },
      {
        id: uuid.v4(),
        name: 'Test User 2',
        email: 'usertest2@vokraf.com',
        password: bcrypt.hashSync('usertest', 10),
      },
    ]);
  },
};
