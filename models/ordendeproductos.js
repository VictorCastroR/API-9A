'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ordendeproductos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ordendeproductos.init({
    id: DataTypes.INTEGER,
    id_producto: DataTypes.INTEGER,
    costo: DataTypes.DOUBLE,
    cantidad: DataTypes.INTEGER,
    detalles: DataTypes.STRING,
    notas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ordendeproductos',
  });
  return Ordendeproductos;
};