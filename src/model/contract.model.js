const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Profession = require('./profession.model');

class Contract extends Model {}

Contract.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    fechaServicio: {
        allowNull: false,
        type: DataTypes.DATE // Fecha en la que se realizará el servicio
    },
    horaServicio: {
        allowNull: false,
        type: DataTypes.TIME // Hora en la que se realizará el servicio
    },
    materialesProporcionados: {
        allowNull: false,
        type: DataTypes.BOOLEAN // Indica si el cliente proporcionará los materiales (true/false)
    },
    cicloVida: {
        allowNull: false,
        type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Terminado', 'Cancelado') // Estado del contrato
    }
}, {
    sequelize,
    modelName: 'Contract'
});

// Definir la relación entre Contrato y Profesión
Contract.belongsTo(Profession);

module.exports = Contract;
