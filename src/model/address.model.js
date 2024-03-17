const sequelize = require('../config/sequelize-config');
const { Model, DataTypes } = require('sequelize');

class Address extends Model {}

Address.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    street: {
        allowNull: false,
        type: DataTypes.STRING
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING
    },
    state: {
        allowNull: false,
        type: DataTypes.STRING
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING
    },
    postalCode: {
        allowNull: false,
        type: DataTypes.STRING
    },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize,
    modelName: 'Address'
});

module.exports = Address;