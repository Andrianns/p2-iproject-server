'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favourite, { foreignKey: 'UserId' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Username cannot be empty.',
          },
          notEmpty: {
            msg: 'Username cannot be empty.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'This email is already exists',
        },
        validate: {
          notNull: {
            msg: 'Email cannot be empty.',
          },
          notEmpty: {
            msg: 'Email cannot be empty.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password cannot be empty.',
          },
          notEmpty: {
            msg: 'Password cannot be empty.',
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Phone Number cannot be empty.',
          },
          notEmpty: {
            msg: 'Phone Number cannot be empty.',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Role cannot be empty.',
          },
          notEmpty: {
            msg: 'Role cannot be empty.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate(instance, option) {
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return User;
};
