'use strict';

const { User, Spot } = require('../models');

const spotInfo = 
// [
//   {
//     ownerId: 3,
//     address: '2 Lincoln Memorial Cir NW',
//     city: 'Washington',
//     state: 'DC',
//     country: 'United States of America',
//     lat: 38.8893,
//     lng: 77.0502,
//     name: 'Lincoln Memorial',
//     description: 'The Lincoln Memorial is a U.S. national memorial built to honor the 16th president of the United States, Abraham Lincoln.',
//     price: 750
//   },
//   {
//     ownerId: 2,
//     address: '300 Alamo Plaza',
//     city: 'San Antonio',
//     state: 'Texas',
//     country: 'United States of America',
//     lat: 29.4260,
//     lng: 98.4861,
//     name: 'The Alamo',
//     description: 'The Alamo Mission, commonly called the Alamo and originally known as the Misión San Antonio de Valero, is a historic Spanish mission and fortress compound founded in the 18th century by Roman Catholic missionaries in what is now San Antonio, Texas.',
//     price: 500
//   },
//   {
//     ownerId: 4,
//     address: '13000 SD-244',
//     city: 'Keystone',
//     state: 'South Dakota',
//     country: 'United States of America',
//     lat: 43.8791,
//     lng: 103.4591,
//     name: 'Mount Rushmore',
//     description: 'Mount Rushmore National Memorial is a massive sculpture carved into Mount Rushmore in the Black Hills region of South Dakota.',
//     price: 550
//   },
//   {
//     ownerId: 3,
//     address: '212 N 6th St',
//     city: 'Springfield',
//     state: 'Illinois',
//     country: 'United States of America',
//     lat: 39.8033,
//     lng: 89.6472,
//     name: 'Abraham Lincoln Presidential Library and Museum',
//     description: 'The Abraham Lincoln Presidential Library and Museum documents the life of the 16th U.S. president, Abraham Lincoln, and the course of the American Civil War.',
//     price: 400
//   },
// ];
[
  {
      ownerId: 2,
      address: '219 Old Gonzales Ave',
      city: 'Maineville',
      state: 'Ohio',
      country: 'United States',
      lat: 38.8893,
      lng: 77.0502,
      name: 'Gilbert Manor',
      description: 'This large house has a futuristic look and is in good condition.  The interior is done in colors that remind you of the night sky.  The yard is enormous and looks very formal.  Also, rumor has it that a group of thieves used it as a meeting place.',
      price: 333
  },
  {
      ownerId: 3,
      address: '65 Lakewood St',
      city: 'Roselle',
      state: 'Illinois',
      country: 'United States',
      lat: 44.3963,
      lng: -103.4563,
      name: 'Doolan Cottage',
      description: 'This small house looks fairly modern and is in average condition.  The interior is done in colors that remind you of the beach.  The yard is tiny and resembles a meadow.',
      price: 615
  },
  {
      ownerId: 2,
      address: '387 Sycamore Drive',
      city: 'Staten Island',
      state: 'New York',
      country: 'United States',
      lat: 33.3853,
      lng: -98.8157,
      name: 'Moynihan Cottages',
      description: 'This small house looks a bit old-fashioned and is in good condition.  The interior is done in autumn colors.  The yard is tiny and looks very formal.  Also, the house used to belong to a famous poet.',
      price: 987
  },
  {
      ownerId: 8,
      address: '669 Pin Oak Court',
      city: 'Evans',
      state: 'Georgia',
      country: 'United States',
      lat: 27.3863,
      lng: -103.6086,
      name: 'Gleeson Chateau',
      description: 'This moderately-sized house has a fairytale-like look to it and is in good condition.  The interior is done in colors that remind you of a cloudy sky.  The yard is small and resembles a meadow.',
      price: 415
  },
  {
      ownerId: 6,
      address: '282 Princeton Dr',
      city: 'Hanover',
      state: 'Pennsylvania',
      country: 'United States',
      lat: 38.3863,
      lng: -117.5272,
      name: 'Weddall Terrace',
      description: 'This large house has a fairytale-like look to it and is in average condition.  The interior is done in vibrant colors.  The yard is small and looks very formal.',
      price: 489
  },
  {
      ownerId: 6,
      address: '806 West Roberts Ave',
      city: 'Kansas City',
      state: 'Missouri',
      country: 'United States',
      lat: 31.3843,
      lng: -120.5777,
      name: 'Walsham House',
      description: 'This large house looks like an old castle and is in average condition.  The interior is done in muted colors.  The yard is tiny and looks very formal.',
      price: 649
  },
  {
      ownerId: 4,
      address: '802 Nut Swamp St',
      city: 'Pomona',
      state: 'California',
      country: 'United States',
      lat: 26.3853,
      lng: -90.4786,
      name: 'McKerras Lodge',
      description: 'This enormous house almost looks extraterrestrial and is in good condition.  The interior is done in pastel colors.  The yard is small and looks very formal.  Also, it has been empty for a long time.',
      price: 685
  },
  {
      ownerId: 5,
      address: '7 Hamilton Road',
      city: 'Loxahatchee',
      state: 'Florida',
      country: 'United States',
      lat: 45.3853,
      lng: -96.5246,
      name: 'Abberton Place',
      description: 'This enormous house looks very modern and is in good condition.  The interior is done in spring colors.  The yard is small and looks very formal.',
      price: 333
  },
  {
      ownerId: 10,
      address: '487 East Big Rock Cove St',
      city: 'Fort Mill',
      state: 'South Carolina',
      country: 'United States',
      lat: 37.3963,
      lng: -120.6465,
      name: 'Forrest Place',
      description: 'This large house has a retro look to it and is in good condition.  The interior is done in colors that remind you of Halloween.  The yard is moderately-sized and resembles a meadow.',
      price: 250
  },
  {
      ownerId: 9,
      address: '1 La Sierra Rd',
      city: 'Mcminnville',
      state: 'Tennessee',
      country: 'United States',
      lat: 32.3843,
      lng: -109.7672,
      name: 'Corney Side',
      description: 'This moderately-sized house looks fairly modern and is in excellent condition. The interior is done in colors that remind you of a fruit salad. The yard is large and is neatly-trimmed. People claim to hear strange noises coming from the house at night.',
      price: 439
  },
  {
      ownerId: 7,
      address: '604 North Jones Street',
      city: 'Natchez',
      state: 'Mississippi',
      country: 'United States',
      lat: 31.3953,
      lng: -124.5169,
      name: 'Moody Gardens',
      description: 'This moderately-sized house looks very old-fashioned and is in average condition.  The interior is done in autumn colors.  The yard is large and resembles a meadow.  Also, strange lights have been seen moving in the house at night.',
      price: 987
  },
  {
      ownerId: 5,
      address: '84 Wakehurst Dr',
      city: 'Bangor',
      state: 'Maine',
      country: 'United States',
      lat: 37.3843,
      lng: -100.6267,
      name: 'Watson Tower',
      description: 'This tiny house has a futuristic look and is in good condition.  The interior is done in rich colors.  The yard is large and looks very formal.',
      price: 977
  },
  {
      ownerId: 2,
      address: '43 Wild Rose St',
      city: 'Pembroke Pines',
      state: 'Florida',
      country: 'United States',
      lat: 49.3863,
      lng: -97.7046,
      name: 'McGuire Building',
      description: 'This enormous house looks very old-fashioned and is in excellent condition.  The interior is done in nautical colors.  The yard is large and is overgrown with wild plants.  Also, the house used to belong to a famous singer.',
      price: 620
  },
  {
      ownerId: 1,
      address: '877 Pumpkin Hill Court',
      city: 'New Bern',
      state: 'North Carolina',
      country: 'United States',
      lat: 45.3963,
      lng: -79.7470,
      name: 'Grain Mansion',
      description: 'This enormous house looks very old-fashioned and is in poor condition.  The interior is done in nautical colors.  The yard is large and looks very formal.',
      price: 574
  },
  {
      ownerId: 7,
      address: '72 Fawn Road',
      city: 'Wenatchee',
      state: 'Washington',
      country: 'United States',
      lat: 45.3963,
      lng: -79.7470,
      name: 'Read House',
      description: 'This small house has a futuristic look and is in average condition.  The interior is done in spring colors.  The yard is moderately-sized and is neatly-trimmed.',
      price: 685
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', spotInfo);
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    }, {});
  }
};
