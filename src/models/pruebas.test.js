const { Model, DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize-config');

    async function testConnection(){
        try{
           await sequelize.authenticate()
           console.log("<------------Conexion Testeada correctamente------------>")
        }catch(err){ 
            console.log("Fallo la prueba de conexion: --> ", err)
        }

    }

    testConnection();
    