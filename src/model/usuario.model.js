const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize-config');
const Estado = require('./estado.model');

    class Usuario extends Model {}

    Usuario.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'nombre'
        },
        username: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
            field: 'username',
            index: true
        },
        correo_electronico: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            field: 'correo_electronico',
            validate: {
                isEmail: true
            }
        },
        contrasena: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'contrasena',
            validate: {
                len: [8]
            }
        },
        estado_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'estado_id',
            defaultValue: 3
        },
        imagen: {
            allowNull: true,
            type: DataTypes.TEXT,
            field: 'imagen'
        }
    }, {
        sequelize,
        modelName: "Usuario"
    })
    Usuario.belongsTo(Estado, {
        foreignKey: 'estado_id',
        targetKey: 'id', // clave primaria en el modelo Estado
      });

    module.exports = Usuario

