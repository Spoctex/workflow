'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
      {
        issueId:1,
        posterId:12,
        comment:'Test comment with reply'
      },
      {
        issueId:1,
        posterId:12,
        replyOf:1,
        comment:'Test reply'
      },
      {
        issueId:1,
        posterId:12,
        comment:'Test comment without reply'
      },
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
