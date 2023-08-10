'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Issues';
    return queryInterface.bulkInsert(options, [
      {
        projectId:1,
        creatorId:12,
        title:"Demo Global",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:2,
        creatorId:12,
        title:"Demo's Issue",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:2,
        creatorId:1,
        title:"Not Demo's Issue",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:3,
        creatorId:1,
        title:"Not Demo's Issue",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:3,
        creatorId:12,
        title:"Demo's Issue",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:4,
        creatorId:1,
        title:"Not Demo Global",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:5,
        creatorId:1,
        title:"Not Demo's Issue",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:5,
        creatorId:12,
        title:"Demo's Issue",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:6,
        creatorId:12,
        title:"Demo's Issue",
        description:'description',
        status:'Backlog'
      },
      {
        projectId:6,
        creatorId:1,
        title:"Not Demo's Issue",
        description:'description',
        status:'Backlog'
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
    options.tableName = 'Issues';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      creatorId: { [Op.in]: [1, 12] }
    }, {});
  }
};
