const { Model, DataTypes } = require("sequelize");
const sequelize = require("../src/config/sequelize-config");

class Ingredientes extends Model {} 

Ingredientes.init(
  {
    id: {
      allowNullL: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    cantidad: {
      allowNullL: false,
      type: DataTypes.FLOAT,
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING,
      fileId: "nombre",
    },
    unidad_medida: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Ingredientes",
  }
); 

module.exports = Ingredientes