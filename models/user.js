'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING
  }, {});

user.associate = function(models) {
    user.hasMany(models.post, {
      as: 'userData'
      })
    user.hasMany(models.like, {
      as: 'likeData'
      })
  }
  return user;
};
