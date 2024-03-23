const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Profession = require('./profession.model');
const User = require('./user.model');

class Contract extends Model {}

Contract.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    consumerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    workerId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    professionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: Profession,
            key: 'id'
        }
    },
    specifications: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    startDate: {
        allowNull: false,
        type: DataTypes.DATE
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM('Pendiente', 'Aceptado', 'Rechazado', 'En Proceso', 'Terminado', 'Cancelado')
    },
    beforeImage: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    duringImage: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    afterImage: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    workerRating: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    workerComment: {
        allowNull: true,
        type: DataTypes.TEXT
    },

    consumerRating: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    consumerComment: {
        allowNull: true,
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Contract'
});

// Definir las relaciones entre Contrato y Usuario
Contract.belongsTo(User, { foreignKey: 'consumerId', as: 'consumer' });
Contract.belongsTo(User, { foreignKey: 'workerId', as: 'worker' });
Contract.belongsTo(Profession, { foreignKey: 'professionId', as: 'profession' });

module.exports = Contract;
