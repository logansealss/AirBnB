'use strict';

const reviewInfo = [

  {
    spotId: 1,
    userId: 2,
    review: 'A nice memorial. I wish that I could have seen it while I was alive though!',
    stars: 4
  },
  {
    spotId: 2,
    userId: 3,
    review: 'Smaller than I thought it would be.',
    stars: 2
  },
  {
    spotId: 1,
    userId: 4,
    review: "Nice, but where is mine?",
    stars: 3
  },
  {
    spotId: 3,
    userId: 2,
    review: 'A beautiful place.',
    stars: 5
  },

];

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Reviews', reviewInfo);
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
