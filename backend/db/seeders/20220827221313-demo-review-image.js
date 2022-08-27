'use strict';

const reviewImages = [

  {
    reviewId: 1,
    url: 'https://images.pexels.com/photos/7711481/pexels-photo-7711481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    reviewId: 1,
    url: 'https://images.pexels.com/photos/5652173/pexels-photo-5652173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    reviewId: 4,
    url: 'https://images.pexels.com/photos/4194070/pexels-photo-4194070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('ReviewImages', reviewImages);
  },

  async down (queryInterface, Sequelize) {

      const Op = Sequelize.Op;
      await queryInterface.bulkDelete('ReviewImages', {
        id: { [Op.in]: [1, 2, 3] }
      }, {});
  }
};
