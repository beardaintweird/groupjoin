'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: DataTypes.STRING,
    phone_number: DataTypes.BIGINT,
    image_url: DataTypes.STRING
  });
  user.associate = function(models){
    user.belongsToMany(models.group,{
      through:'user_group'
    })
  }
  return user;
};
