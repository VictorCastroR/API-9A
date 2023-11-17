const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize-config');
const Usuario = require('./usuario.model');

class Pedido extends Model {}

Pedido.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    costolTotal: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'costolTotal',
    },
    descuento: {
        allowNull: false,
        type: DataTypes.DECIMAL,
        field: 'decuento',
    },
    isCompleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'costolTotal',
        defaultValue: false
    },
    usuario_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'usuario_id',
    } 
},
 {
    sequelize,
    modelName: "Pedido"
})

Pedido.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    targetKey: 'id', 
  });

module.exports = Pedido