'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Donate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Fund}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId'})
      this.belongsTo(Fund, {foreignKey: 'fundId'})
    }
    toJSON(){
      return {...this.get(), userId: undefined}
    }
  };
  Donate.init({
    donateAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proofAttachment: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'donates',
    modelName: 'Donate',
  });
  return Donate;
};