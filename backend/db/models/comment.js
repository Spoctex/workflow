'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User,
        { foreignKey: 'posterId' })
      Comment.hasMany(models.Comment,
        { foreignKey: 'replyOf', as:'Replies' })
    }
  }
  Comment.init({
    issueId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    posterId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    replyOf: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
