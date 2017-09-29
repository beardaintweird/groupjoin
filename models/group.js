'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsToMany(models.user, {
          through:'user_group'
        });
        this.hasMany(models.message);
      }
    }
  });
  return group;
};
