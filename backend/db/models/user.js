'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName } = this; // context will be the User instance
      return { id, username, email, firstName, lastName };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
    }
    static associate(models) {
      // define association here
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId'
      });

      User.belongsToMany(models.Spot, {
        through: models.Booking,
        foreignKey: 'userId',
        otherKey: 'spotId'
      });

      User.belongsToMany(models.Spot, {
        through: models.Review,
        foreignKey: 'userId',
        otherKey: 'spotId'
      });

      User.hasMany(models.Review, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      }
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['email', 'hashedPassword', 'createdAt', 'updatedAt', 'firstName', 'lastName']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};