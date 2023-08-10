'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsToMany(models.User,
        {
          through: models.Member,
          foreignKey: 'teamId',
          otherKey: 'userId'
        })
      Team.belongsTo(models.User,
        { foreignKey: 'ownerId' })
      Team.hasMany(models.Project,
        { foreignKey: 'teamId' })
    }
  }
  Team.init({
    name: {
      type: DataTypes.STRING
    },
    ownerId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
