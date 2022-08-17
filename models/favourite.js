'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User, { foreignKey: 'UserId' });
      Favourite.belongsTo(models.Team, { foreignKey: 'TeamId' });
    }
  }
  Favourite.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User Id cannot be empty.',
          },
          notEmpty: {
            msg: 'User Id cannot be empty.',
          },
        },
      },
      TeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: {
          msg: 'This team is already in your favourites',
        },
        validate: {
          notNull: {
            msg: 'Team Id cannot be empty.',
          },
          notEmpty: {
            msg: 'Team Id cannot be empty.',
          },
        },
      },
      power: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Power cannot be empty.',
          },
          notEmpty: {
            msg: 'Power cannot be empty.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Favourite',
    }
  );
  return Favourite;
};
