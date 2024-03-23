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
    icono: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    precioMin: {
        allowNull: false,
        type: DataTypes.DECIMAL
    },
    precioMax: {
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