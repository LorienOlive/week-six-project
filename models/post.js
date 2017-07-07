'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    post: DataTypes.STRING(140)
  }, {});

post.associate = function(models) {
        post.hasMany(models.like, {
          as: 'likeData'
        })
        post.belongsTo(models.user, {
          as: 'userData',
          foreignKey: 'userId'
        })
      }
  return post;
};
