'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task,{foreignKey : 'userId'})
    }
  };
  User.init({
    fullname: {
        type : DataTypes.STRING,
        validate : {
            notEmpty : {
                args : true,
                msg : "Fullname cannot empty"
            }
        }
    },
    email: {
        type : DataTypes.STRING,
        validate : {
            notEmpty : {
                args : true,
                msg : "Email cannot empty"
            }
        }
    },
    password: {
        type : DataTypes.STRING,
        validate : {
            checkLength(value) { 
                if (value.length < 6) throw new Error('Password must be more than 6 character')
            }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
        beforeCreate(instance){
            instance.password = hashPassword(instance.password)
        }
    }
  });
  return User;
};