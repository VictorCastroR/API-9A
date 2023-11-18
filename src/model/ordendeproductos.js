const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize-config");

class Ordendeproductos extends Model{}

Ordendeproductos.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    producto_id:{
      allowNull:false,
      type: DataTypes.INTEGER,
      references: {  
        model:"Producto",
        key: "id",
      }
    },
    pedido_id:{
      allowNull:false,
      type: DataTypes.INTEGER,
      references: {  
        model:"Pedidos",
        key: "id",
      }
    },
    costo:{
      allowNull:false,
      type: DataTypes.DOUBLE,
    },
    cantidad:{
      allowNull:false,
      type: DataTypes.INTEGER,
    },
    detalles:{
      allowNull:false,
      type: DataTypes.STRING,
    },
    notas:{
      allowNull:false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Ordendeproductos",
  }
);

Ordendeproductos.associations = function(models){
  Ordendeproductos.belongsTo (models.Producto, {
    foreignKey: "id_producto"
  })
  Ordendeproductos.belongsTo (models.Pedido, {
    foreignKey: "id_pedido"
  })
}

module.exports = Ordendeproductos