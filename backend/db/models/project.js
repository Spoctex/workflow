'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User,
        { foreignKey: 'leadId' })
      Project.belongsTo(models.Team,
        { foreignKey: 'teamId' })
      Project.hasMany(models.Issue,
        { foreignKey: 'projectId' })
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING
    },
    teamId: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
    leadId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
