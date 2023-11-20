const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Direccion = require('./direccion.model');
const PuntoEntrega = require('./puntoEntrega.model');
const Usuario = require('./usuario.model');

class DireccionEntrega extends Model {}

DireccionEntrega.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    pe_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {  
        model: PuntoEntrega,
        key: "id",
      }
    },
    direccion_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {  
        model: Direccion,
        key: "id",
      }
    },
    usuario_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {  
        model: Usuario,
        key: "id",
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  },
  {
    sequelize,
    modelName: 'DireccionEntrega',
    tableName: 'direccionesEntrega', 
  }
);

DireccionEntrega.associations = function(models) {
  DireccionEntrega.belongsTo(models.Direccion, {
    foreignKey: "direccion_id",
    as: "direccion", 
  });

  DireccionEntrega.belongsTo(models.PuntoEntrega, {
    foreignKey: "pe_id",
    as: "puntoEntrega", 
  });

  DireccionEntrega.belongsTo(models.Usuario, {
    foreignKey: "usuario_id",
    as: "usuario", 
  });
}

module.exports = DireccionEntrega;
