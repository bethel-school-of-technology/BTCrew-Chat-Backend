'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    id: DataTypes.STRING,
    UserId: DataTypes.STRING,
    Sender: DataTypes.STRING,
    Recipient: DataTypes.STRING,
    MessagePrivate: DataTypes.STRING,
    MessagePublic: DataTypes.STRING,
    Username: DataTypes.STRING,
    Password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};