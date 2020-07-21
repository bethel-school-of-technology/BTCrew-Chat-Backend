'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  messages.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Sender: DataTypes.STRING,
    Recipient: DataTypes.STRING,
    MessagePrivate: DataTypes.STRING,
    MessagePublic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'messages',
  });
  return messages;
};