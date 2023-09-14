'use strict';

const { issues } = require('../seeds/issueSeeds');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Issues';
    return queryInterface.bulkInsert(options, issues, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Issues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      creatorId: { [Op.in]: [1, 12] }
    }, {});
  }
};
