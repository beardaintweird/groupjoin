'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_group = sequelize.define('user_group', {
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  });
  return user_group;
};
