'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('users', [{
        username: 'FinnH23',
        password: 'algebraic',
        displayname: 'Finn the Human',
        createdAt: '2016-02-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z'
      },
      { username: 'jdogggg01',
        password: 'iluvrainicorn',
        displayname: 'Jake the Dog',
        createdAt: '2016-03-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z'
      },
      { username: 'beemoh',
        password: 'puppies',
        displayname: 'BMO',
        createdAt: '2016-01-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z'
      },
      {
        username: 'bubblepk99',
        password: 'scienceizcool',
        displayname: 'Princess Bubblegum',
        createdAt: '2016-03-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z'
      },
      {
        username: 'rainbows',
        password: 'somethingjapanese',
        displayname: 'Lady Rainicorn',
        createdAt: '2016-03-09T12:31:56.451Z',
        updatedAt: '2016-04-09T12:31:56.451Z'
      }], {});
  },

  down: function (queryInterface, Sequelize) {

      Example:
      return queryInterface.bulkDelete('users', null, {});
  }
};
