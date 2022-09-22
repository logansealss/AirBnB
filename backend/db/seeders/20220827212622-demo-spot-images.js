'use strict';

const spotImages = 
// [
//   {
//     spotId: 2,
//     url: 'https://cdn.pixabay.com/photo/2017/03/05/05/36/alamo-2117824_960_720.jpg',
//     preview: true
//   },
//   {
//     spotId: 2,
//     url: 'https://cdn.pixabay.com/photo/2016/09/04/16/37/the-alamo-1644473_960_720.jpg',
//     preview: false
//   },
//   {
//     spotId: 3,
//     url: 'https://cdn.pixabay.com/photo/2017/03/15/22/44/mt-rushmore-2147740_960_720.jpg',
//     preview: true
//   },
//   {
//     spotId: 3,
//     url: 'https://cdn.pixabay.com/photo/2012/09/01/20/26/mount-rushmore-national-monument-55481_960_720.jpg',
//     preview: false
//   },
//   {
//     spotId: 1,
//     url: 'https://cdn.pixabay.com/photo/2016/11/08/21/02/lincoln-memorial-1809428_960_720.jpg',
//     preview: true
//   },
//   {
//     spotId: 1,
//     url: 'https://cdn.pixabay.com/photo/2014/03/06/20/02/abraham-lincoln-memorial-281124_960_720.jpg',
//     preview: false
//   },
//   {
//     spotId: 1,
//     url: 'https://cdn.pixabay.com/photo/2016/08/28/18/52/lincoln-memorial-1626594_960_720.jpg',
//     preview: false
//   },
//   {
//     spotId: 4,
//     url: 'https://static5.depositphotos.com/1023345/422/i/450/depositphotos_4226742-stock-photo-abraham-lincoln-presidencial-museum.jpg',
//     preview: true
//   },
//   {
//     spotId: 4,
//     url: 'https://st.depositphotos.com/1023345/1343/i/450/depositphotos_13438690-stock-photo-abraham-lincoln-presidential-library.jpg',
//     preview: false
//   },
// ];

[
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1637052320795-f4127085b5b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxhUk9zQ3pQM1F0b3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1560806981-44bbc2c6708c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1583135630256-a25ea659d1d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://images.unsplash.com/photo-1585264550248-1778be3b6368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xTMDZHMzBNLVBoY3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1600645174997-bea67efe2fd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxhUk9zQ3pQM1F0b3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1616486701797-0f33f61038ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1571508601793-abb5eb1eeb50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://images.unsplash.com/photo-1618221520382-3d68e64f58ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjR8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1590912550141-1448da2bd5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHxhUk9zQ3pQM1F0b3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1611048268428-c7dddc465ee7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1612152668323-b7f49335ebde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTh8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1535230387253-9cd5be991a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzJ8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://images.unsplash.com/photo-1600489000300-e590b381ce48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzR8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnxhUk9zQ3pQM1F0b3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzZ8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1581404554128-5032fe7874be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzd8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzN8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDR8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1618222499121-d6528f6d9d77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDd8UzA2RzMwTS1QaGN8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: false
  },






  {
    spotId: 6,
    url: 'https://images.unsplash.com/photo-1599777560450-e462cffc5368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjZ8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 7,
    url: 'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzF8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 8,
    url: 'https://images.unsplash.com/photo-1606079129972-e23a496c399b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mzl8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 9,
    url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzN8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 10,
    url: 'https://images.unsplash.com/photo-1581974206939-b42731ea9dc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 11,
    url: 'https://images.unsplash.com/photo-1563720223809-b9a3d1694e2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 12,
    url: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjV8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 13,
    url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzB8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 14,
    url: 'https://images.unsplash.com/photo-1559329145-afaf18e3f349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzV8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },

  {
    spotId: 15,
    url: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MzR8YVJPc0N6UDNRdG98fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    preview: true
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('SpotImages', spotImages);
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages', {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35] }
    }, {});
  }
};
