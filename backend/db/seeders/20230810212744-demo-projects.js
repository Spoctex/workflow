'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Projects';
    return queryInterface.bulkInsert(options, [
      {
        name: "Global",
        teamId: 1,
        leadId: 12,
        description: ''
      },
      {
        name: "Demo's Project",
        teamId: 1,
        leadId: 12,
        description: ''
      },
      {
        name: "Not Demo's Project",
        teamId: 1,
        leadId: 1,
        description: ''
      },
      {
        name: "Global",
        teamId: 2,
        leadId: 1,
        description: ''
      },
      {
        name: "Not Demo's Project",
        teamId: 2,
        leadId: 1,
        description: ''
      },
      {
        name: "Demo's Project",
        teamId: 2,
        leadId: 12,
        description: ''
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
    options.tableName = 'Projects';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      leadId: { [Op.in]: [1, 12] }
    }, {});
  }
};
