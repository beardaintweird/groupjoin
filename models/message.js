'use strict';
module.exports = (sequelize, DataTypes) => {
  var message = sequelize.define('message', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: DataTypes.STRING,
    sender_type: DataTypes.STRING,
    group_id: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    favorites: DataTypes.INTEGER,
    favorited_by: DataTypes.ARRAY(DataTypes.STRING),
    image_url: DataTypes.STRING
  });
  return message;
};
