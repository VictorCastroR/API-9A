const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
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
        model:"PuntoEntrega",
        key: "id",
      }
    },
    direccion_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {  
        model:"Direccion",
        key: "id",
      }

    },
    pedido_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {  
        model:"Pedido",
        key: "id",
      }
    },
  },
  {
    sequelize,
    modelName: 'DireccionEntrega',
    tableName: 'direccionesEntrega', 
  }
);

DireccionEntrega.associations = function(model){
  DireccionEntrega.belongsTo(model.Direccion, {
    foreignKey: "direccion_id"
  })

  DireccionEntrega.belongsTo(model.PuntoEntrega, {
    foreignKey: "pe_id"
  })

  DireccionEntrega.belongsTo(model.Pedido, {
    foreignKey: "pedido_id"
  })
}



module.exports = DireccionEntrega;
