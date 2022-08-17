'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Favourite, { foreignKey: 'TeamId' });
    }
  }
  Team.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      stadium: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Team',
    }
  );
  return Team;
};
