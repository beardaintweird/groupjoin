'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_group = sequelize.define('user_group', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_group;
};
