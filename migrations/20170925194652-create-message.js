'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      sender_type: {
        type: Sequelize.STRING
      },
      group_id: {
        type: Sequelize.BIGINT
      },
      text: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      favorites: {
        type: Sequelize.INTEGER
      },
      favorited_by: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      image_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages');
  }
};
