'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Members';
    return queryInterface.bulkInsert(options, [
      {
        teamId: 1,
        userId: 1
      },
      {
        teamId: 1,
        userId: 12
      },
      {
        teamId: 2,
        userId: 1
      },
      {
        teamId: 2,
        userId: 12
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Members';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 12] }
    }, {});
  }
};
