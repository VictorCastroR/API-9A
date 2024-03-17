const sequelize = require('../config/sequelize-config');
const { Model, DataTypes} = require('sequelize')

const Address = require('./address.model');
const Role = require('./role.model');
const Profession = require('./profession.model');


class User extends Model {}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    fullName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'fullName'
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        field: 'email',
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'password',
        validate: {
            len: [8]
        }
    },
    isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'isActive',
        defaultValue: 3
    },
    phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'phoneNumber'
    },
    ine: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'ine'
    },
    criminalRecord: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'criminalRecord'
    },
    photo: {
        allowNull: true,
        type: DataTypes.TEXT,
        field: 'photo'
    }
},{
    sequelize,
    modelName: "User"
})

//Indicar relaciones
User.hasOne(Address)
User.belongsTo(Role)
User.belongsTo(Profession)


module.exports = User

