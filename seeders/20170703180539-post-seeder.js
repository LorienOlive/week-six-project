'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('posts', [{
        post: "Dang girl, if you weren't a figment of my imagination, I'd wanna to have your baby...",
        createdAt: '2016-02-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z',
        userId: 2
      },
      {
        post: "I feel like I got hit with a Dracula by King Kong",
        createdAt: '2016-03-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z',
        userId: 3
      },
      {
        post: "That's it! The answer was so simple, I was too smart to see it!",
        createdAt: '2016-03-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z',
        userId: 4
      },
      {
        post: "海ト応写コスメナ目7広ドふびひ提留整ん声核ン文地なゅ情票わせ落圧レムスエ聴落転かせは会講のたばた。",
        createdAt: '2016-03-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z',
        userId: 5
      },
      {
        post: "Who wants to play video games?",
        createdAt: '2016-03-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z',
        userId: 2
      }], {});
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('posts', null, {});

  }
};
