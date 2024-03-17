const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

class Profession extends Model {}

Profession.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    },
    rubro: {
        allowNull: false,
        type: DataTypes.STRING
    },
    precio: {
        allowNull: false,
        type: DataTypes.DECIMAL
    },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize,
    modelName: 'Profession'
});

module.exports = Profession;