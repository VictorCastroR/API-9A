const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Usuario = require('./usuario.model');

  class Direccion extends Model {}

Direccion.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  usuario_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'usuario_id',
  },
  calle: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'calle',
  },
  numero: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'numero',
  },
  colonia: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'colonia',
  },
  ciudad: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'ciudad',
  },
  estado: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'estado',
  },
  codigo_postal: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'codigo_postal',
  },
}, {
  sequelize,
  modelName: "Direccion"
})

Direccion.belongsTo(Usuario,{
  foreignKey: "usuario_id",
  targetKey: "id", // clave primaria en el modelo Usuario
})

module.exports = Direccion
