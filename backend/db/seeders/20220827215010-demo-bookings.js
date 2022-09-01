'use strict';


const bookingInfo = [

  {
    userId: 3,
    spotId: 2,
    startDate: '2022-11-15',
    endDate: '2022-11-18'
  },
  {
    userId: 2,
    spotId: 1,
    startDate: '2022-12-12',
    endDate: '2022-12-14'
  },
  {
    userId: 4,
    spotId: 4,
    startDate: '2022-10-30',
    endDate: '2022-11-01'
  },
  {
    userId: 1,
    spotId: 2,
    startDate: '2022-11-21',
    endDate: '2022-11-25'
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Bookings', bookingInfo);
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Bookings', {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
