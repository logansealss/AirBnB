'use strict';

const reviewInfo = 
[
  {
      spotId: 1,
      userId: 1,
      review: "Excellent place to stay. I couldn't get over how lush the decor was. And the beds were super comfy! I would definitely stay again.",
      stars: 4
  },
  {
      spotId: 1,
      userId: 8,
      review: "This place is just as impressive in person as in the photos. Checkin was easy and there weren’t a lot of rules for checkout. I really appreciate the attention to details and I would definitely stay here again!!",
      stars: 5
  },
  {
      spotId: 1,
      userId: 6,
      review: "Great location. Beautiful space. Decorated beautifully. We got this air bnb for our wedding weekend and loved everything about it.",
      stars: 4
  },
  {
      spotId: 2,
      userId: 2,
      review: "Amazing, felt like home away from home, highly recommend!!!",
      stars: 5
  },
  {
      spotId: 2,
      userId: 7,
      review: "If you are thinking of staying at Hillcrest think no more! It was terrible!",
      stars: 1
  },
  {
      spotId: 3,
      userId: 3,
      review: "This place is amazing. You won't regret staying here.",
      stars: 5
  },
  {
      spotId: 4,
      userId: 4,
      review: "The home is beautiful! The landscaping and back porches give it a place to enjoy during the day and evening. Loved it!",
      stars: 4
  },
  {
      spotId: 4,
      userId: 9,
      review: "It was just a great experience for us. The house was everything we hoped it would be and our host was thoughtful, communicative, responsive and deserves a raise. Thank you for making our trip amazing.",
      stars: 5
  },
  {
      spotId: 5,
      userId: 1,
      review: "Gorgeous home! We loved everything about it and would love to come back!",
      stars: 4
  },
  {
      spotId: 6,
      userId: 3,
      review: "Beautiful place. Well equipped.",
      stars: 4
  },
  {
      spotId: 6,
      userId: 9,
      review: "Great listing with a very unique character and plenty of room for a large group.",
      stars: 3
  },
  {
      spotId: 7,
      userId: 8,
      review: "I had a fantastic time in this beautifully amazing place!!",
      stars: 4
  },
  {
      spotId: 8,
      userId: 10,
      review: "Great stay in such a unique spot, character, history, charm and location made this trip better than any before, hosts really easy to reach and friendly!",
      stars: 5
  },
  {
      spotId: 8,
      userId: 8,
      review: "This place was perfect for our party! Everyone had a great time.",
      stars: 4
  },
  {
      spotId: 8,
      userId: 2,
      review: "The house was great - full of character and very large! The neighborhood had charm and was conveniently located to downtown. The outdoor areas were nice touches.",
      stars: 4
  },
  {
      spotId: 10,
      userId: 3,
      review: "it was a cool place except the host was especially mean to myself and my guests, they called the cops on me and demanded i leave at once, i never felt more unwelcome in my entire life, we had fun though.",
      stars: 1
  },
  {
      spotId: 11,
      userId: 8,
      review: "This house is incredible. The pictures really do not do it justice. The style is so unique and the beds were also extremely comfortable. Would definitely stay here again!",
      stars: 4
  },
  {
      spotId: 11,
      userId: 2,
      review: "Amazing spot! All the rooms had so much character & the backyard was fantastic.",
      stars: 5
  },
  {
      spotId: 13,
      userId: 1,
      review: "Without a doubt, the next time we stay overnight, we will book this spot. It is charming, super comfortable, and conveniently located. Excellent experience!",
      stars: 4
  },
  {
      spotId: 15,
      userId: 6,
      review: "Excellent stay. Location was awesome. Have stayed before and would again.",
      stars: 5
  },
  {
      spotId: 15,
      userId: 10,
      review: "Great place, wonderful stay! Bed was so comfortable and it was exactly as in the listing! Definitely one of my new favs!",
      stars: 4
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
