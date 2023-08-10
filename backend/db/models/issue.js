'use strict';
const {
  Model
} = require('sequelize');
const { issueStatus, issueLabel, issuePriority } = require('../../../enumGlobal');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Issue.belongsTo(models.User,
        { foreignKey: 'creatorId' })
      Issue.belongsTo(models.User,
        { foreignKey: 'assignedId' })
      Issue.belongsTo(models.Project,
        { foreignKey: 'projectId' })
    }
  }
  Issue.init({
    projectId: {
      type: DataTypes.INTEGER,
    },
    assignedId: {
      type: DataTypes.INTEGER
    },
    creatorId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM(...issueStatus)
    },
    label: {
      type: DataTypes.ENUM(...issueLabel)
    },
    priority: {
      type: DataTypes.ENUM(...issuePriority)
    }
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};
