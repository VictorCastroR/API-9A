const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize-config');

class Role extends Model{}

Role.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    }
},{
    sequelize,
    modelName: 'Role'})

module.exports = Role;
