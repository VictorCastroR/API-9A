const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Usuario = require('./usuario.model');
const DireccionEntrega = require('./direccionEntrega.model');

class Pedido extends Model {}

Pedido.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    costoTotal: {
        allowNull: false,
        type: DataTypes.DECIMAL,  
        field: 'costoTotal',  
    },
    descuento: {
        allowNull: true,
        type: DataTypes.DECIMAL,
        field: 'descuento', 
    },
    isCompleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'isCompleted',
        defaultValue: false
    },
    usuario_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'usuario_id',
    },
    direccionEntrega_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: DireccionEntrega,
          key: "id",
        }
    },
},
{
    sequelize,
    modelName: "Pedido"
});

Pedido.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    targetKey: 'id', 
});

module.exports = Pedido;
