const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize-config');

class Paquete extends Model {}

Paquete.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    concepto: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre'
    },
    precio: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        field: 'precio'
    },
    activo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'active',
        defaultValue: true,
    },
    cantidad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'cantidad'
    },
},
 {
    sequelize,
    modelName: "Paquete"
})

module.exports = Paquete