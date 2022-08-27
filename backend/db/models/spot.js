'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    lat: {
        type: DataTypes.DECIMAL(8,6),
        allowNull: false,
        validate: {
          min: -90,
          max: 90
        }
      },
    lng: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
        validate: {
          min: -180,
          max: 180
        }
      },
    name: {
        type: DataTypes.STRING(49),
        allowNull: false,
        validate: {
          len: [1,49]
        }
      },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};