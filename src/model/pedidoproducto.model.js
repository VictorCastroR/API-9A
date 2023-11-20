const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Pedido = require('./pedido.model');
const Producto = require('./producto.model');

class PedidoProducto extends Model {}

PedidoProducto.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    cantidad: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    // Otros campos relacionados con la relación muchos a muchos
  },
  {
    sequelize,
    modelName: 'PedidoProducto',
    tableName: 'pedidos_productos', // Opcional: para especificar el nombre de la tabla
  }
);

Pedido.belongsToMany(Producto, {
  through: PedidoProducto,
  foreignKey: 'pedido_id',
  otherKey: 'producto_id',
});

Producto.belongsToMany(Pedido, {
  through: PedidoProducto,
  foreignKey: 'producto_id',
  otherKey: 'pedido_id',
});

module.exports = PedidoProducto;
