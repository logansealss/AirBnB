'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users',
      // [
      //   {
      //     email: 'demo@user.io',
      //     username: 'Demo',
      //     hashedPassword: bcrypt.hashSync('password'),
      //     firstName: 'John',
      //     lastName: 'Doe'
      //   },
      //   {
      //     email: 'james@user.io',
      //     username: 'JamesBowie',
      //     hashedPassword: bcrypt.hashSync('password2'),
      //     firstName: 'James',
      //     lastName: 'Bowie'
      //   },
      //   {
      //     email: 'honestabe@user.io',
      //     username: 'honestabe',
      //     hashedPassword: bcrypt.hashSync('password3'),
      //     firstName: 'Abraham',
      //     lastName: 'Lincoln'
      //   },
      //   {
      //     email: 'roughrider@user.io',
      //     username: 'Teddy',
      //     hashedPassword: bcrypt.hashSync('password3'),
      //     firstName: 'Theodore',
      //     lastName: 'Roosevelt'
      //   },
      // ]
      [
        {
          email: 'demo@user.io',
          username: 'Demo',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          email: 'alex@dam.com',
          username: 'ADam',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Alex',
          lastName: 'Dam'
        },
        {
          email: 'amanda@vien.com',
          username: 'avien',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Amanda',
          lastName: 'Vien'
        },
        {
          email: 'task@user.io',
          username: 'TaskMaster',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Brandon',
          lastName: 'Tasaki'
        },
        {
          email: 'gsong@gmail.com',
          username: 'oneoftheboys',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Gary',
          lastName: 'Song'
        },
        {
          email: 'jakem@hotmail.com',
          username: 'jakandbake',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Jake',
          lastName: 'Matillano'
        },
        {
          email: 'cman@yahoo.com',
          username: 'mr. helpful',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'John',
          lastName: 'Carrera'
        },
        {
          email: 'egg@eggs.com',
          username: 'egg',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Logan',
          lastName: 'Seals'
        },
        {
          email: 'samsuh@qq.com',
          username: 'quickquestion',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'Samuel',
          lastName: 'Suh'
        },
        {
          email: 'drogers@linux.net',
          username: 'TheGOAT',
          hashedPassword: bcrypt.hashSync('password'),
          firstName: 'David',
          lastName: 'Rogers'
        },
      ]
      , {});
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {});
  }
};
