'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    title: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});

like.associate = function(models) {
        like.belongsTo(models.user, {
          as: 'userData',
          foreignKey: 'userId'
        })
        like.belongsTo(models.post, {
          as: 'postData',
          foreignKey: 'postId'
        })
    }
  return like;
};
