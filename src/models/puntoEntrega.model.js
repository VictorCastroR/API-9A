const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');



  class PuntoEntrega extends Model {}

  PuntoEntrega.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
    codigoPostal: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'codigoPostal',
    },
    notas: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'notas',
    },
    activo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'active',
        defaultValue: true,
    },

  },{
    sequelize,
    modelName: "PuntoEntrega"
})


  module.exports = PuntoEntrega;
	