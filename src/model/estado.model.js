const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize-config');

class Estado extends Model {}

Estado.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre'
    }
},
 {
    sequelize,
    modelName: "Estado"
})

module.exports = Estado