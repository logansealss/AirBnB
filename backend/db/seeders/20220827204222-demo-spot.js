'use strict';

const { User, Spot } = require('../models');

const spotInfo = [
  {
    ownerId: 3,
    address: '2 Lincoln Memorial Cir NW',
    city: 'Washington',
    state: 'DC',
    country: 'United States of America',
    lat: 38.8893,
    lng: 77.0502,
    name: 'Lincoln Memorial',
    description: 'The Lincoln Memorial is a U.S. national memorial built to honor the 16th president of the United States, Abraham Lincoln.',
    price: 750
  },
  {
    ownerId: 2,
    address: '300 Alamo Plaza',
    city: 'San Antonio',
    state: 'Texas',
    country: 'United States of America',
    lat: 29.4260,
    lng: 98.4861,
    name: 'The Alamo',
    description: 'The Alamo Mission, commonly called the Alamo and originally known as the Misión San Antonio de Valero, is a historic Spanish mission and fortress compound founded in the 18th century by Roman Catholic missionaries in what is now San Antonio, Texas.',
    price: 500
  },
  {
    ownerId: 4,
    address: '13000 SD-244',
    city: 'Keystone',
    state: 'South Dakota',
    country: 'United States of America',
    lat: 43.8791,
    lng: 103.4591,
    name: 'Mount Rushmore',
    description: 'Mount Rushmore National Memorial is a massive sculpture carved into Mount Rushmore in the Black Hills region of South Dakota.',
    price: 550
  },
  {
    ownerId: 3,
    address: '212 N 6th St',
    city: 'Springfield',
    state: 'Illinois',
    country: 'United States of America',
    lat: 39.8033,
    lng: 89.6472,
    name: 'Abraham Lincoln Presidential Library and Museum',
    description: 'The Abraham Lincoln Presidential Library and Museum documents the life of the 16th U.S. president, Abraham Lincoln, and the course of the American Civil War.',
    price: 400
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', spotInfo);
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
