'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'imagen', {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'imagen'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'imagen');
  }
};