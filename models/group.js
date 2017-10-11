'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING
  });

  group.associate = function(models){
    group.belongsToMany(models.user, {
      through:'user_group'
    });
    group.hasMany(models.message);
  }
  return group;
};
