const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");
const Pedido = require("./pedido.model"); // Asegúrate de tener el nombre correcto del archivo
const Ingrediente = require("./ingrediente.model"); // Asegúrate de tener el nombre correcto del archivo

class Producto extends Model {}

Producto.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    precio: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
    ingredientes_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Ingredientes", // Nombre de la tabla a la que se hace referencia
        key: "id", // Clave primaria de la tabla a la que se hace referencia
      },
    },
  },
  {
    sequelize,
    modelName: "Producto",
  }
);

// Relación muchos a muchos con Pedido
Producto.belongsToMany(Pedido, {
  through: "PedidoProducto",
  foreignKey: "producto_id",
  otherKey: "pedido_id",
});

// Relación uno a muchos con Ingrediente
Producto.belongsTo(Ingrediente, {
  foreignKey: "ingredientes_id",
});

module.exports = Producto;
