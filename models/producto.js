const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/sequelize-config");

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
      fileId: "nombre",
    },
    descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
      fileId: "descripcion",
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
// Si es necesario, también puedes establecer la relación entre las tablas aquí
Producto.belongsTo(sequelize.models.Ingredientes, {
  foreignKey: "ingredientes_id",
});
module.exports = Producto;