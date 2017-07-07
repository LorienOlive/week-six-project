'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('likes', [
          {
            postId: 2,
            userId: 1,
            createdAt: "2017-02-26T12:31:56.451Z",
            updatedAt: "2017-02-26T12:31:56.451Z"
          },
          {
            postId: 3,
            userId: 2,
            createdAt: "2017-02-26T12:31:56.451Z",
            updatedAt: "2017-02-26T12:31:56.451Z"
          },
          {
            postId: 3,
            userId: 3,
            createdAt: "2017-02-26T12:31:56.451Z",
            updatedAt: "2017-02-26T12:31:56.451Z"
          },
          {
            postId: 4,
            userId: 1,
            createdAt: "2017-02-26T12:31:56.451Z",
            updatedAt: "2017-02-26T12:31:56.451Z"
          },
          {
            postId: 5,
            userId: 1,
            createdAt: "2017-02-26T12:31:56.451Z",
            updatedAt: "2017-02-26T12:31:56.451Z"
          },
          {
            postId: 5,
            userId: 2,
            createdAt: "2017-02-26T12:31:56.451Z",
            updatedAt: "2017-02-26T12:31:56.451Z"
          },
          {
            postId: 5,
            userId: 3,
            createdAt: "2017-02-26T12:31:56.451Z",
            updatedAt: "2017-02-26T12:31:56.451Z"
          }], {});
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('likes', null, {});
  }
};
