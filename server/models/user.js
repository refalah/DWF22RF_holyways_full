'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Donate, Fund}) {
      // define association here
      this.hasMany(Donate, {foreignKey: 'userId'});
      this.hasMany(Fund, {foreignKey: 'userId'})
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {msg: 'User must have a name'},
      //   notEmpty: {msg: 'User must not be empty'}
      // }
    }, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {msg: 'User must have an email'},
      //   notEmpty: {msg: 'Email must not be empty'},
      //   isEmail: {msg: 'Must be a valid email address'}
      // }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {msg: 'User must have a password'},
      //   notEmpty: {msg: 'Password must not be empty'},
      // }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};