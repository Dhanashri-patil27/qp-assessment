'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('grocery_items', {
      fields: ['name'],
      type: 'unique',
      name: 'unique_name_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('grocery_items', 'unique_name_constraint');
  }
};
