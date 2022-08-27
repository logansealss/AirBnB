'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [
        {
          email: 'demo@user.io',
          username: 'Demo',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          email: 'james@user.io',
          username: 'JamesBowie',
          hashedPassword: bcrypt.hashSync('password2'),
          firstName: 'James',
          lastName: 'Bowie'
        },
        {
          email: 'honestabe@user.io',
          username: 'honestabe',
          hashedPassword: bcrypt.hashSync('password3'),
          firstName: 'Abraham',
          lastName: 'Lincoln'
        },
        {
          email: 'roughrider@user.io',
          username: 'Teddy',
          hashedPassword: bcrypt.hashSync('password3'),
          firstName: 'Theodore',
          lastName: 'Roosevelt'
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo', 'JamesBowie', 'honestabe', 'Teddy'] }
    }, {});
  }
};
