'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsToMany(models.group,{
          through:'user_group'
        })
      }
    }
  });
  return user;
};
