'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ingredientes.init({
    id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    cantidad: DataTypes.FLOAT,
    unidad_medida: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredientes',
  })
  Ingredientes.belongsTo({
      foreignKey: 'id', // clave primaria en el modelo Estado
    });
  
  return Ingredientes;2
  
};