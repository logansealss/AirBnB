'use strict';

const spotImages = [

  {
    spotId: 2,
    url: 'https://cdn.pixabay.com/photo/2017/03/05/05/36/alamo-2117824_960_720.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://cdn.pixabay.com/photo/2016/09/04/16/37/the-alamo-1644473_960_720.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://cdn.pixabay.com/photo/2017/03/15/22/44/mt-rushmore-2147740_960_720.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://cdn.pixabay.com/photo/2012/09/01/20/26/mount-rushmore-national-monument-55481_960_720.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://cdn.pixabay.com/photo/2016/11/08/21/02/lincoln-memorial-1809428_960_720.jpg',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://cdn.pixabay.com/photo/2014/03/06/20/02/abraham-lincoln-memorial-281124_960_720.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://cdn.pixabay.com/photo/2016/08/28/18/52/lincoln-memorial-1626594_960_720.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://static5.depositphotos.com/1023345/422/i/450/depositphotos_4226742-stock-photo-abraham-lincoln-presidencial-museum.jpg',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://st.depositphotos.com/1023345/1343/i/450/depositphotos_13438690-stock-photo-abraham-lincoln-presidential-library.jpg',
    preview: false
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('SpotImages', spotImages);
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
};
