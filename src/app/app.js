const express = require("express")
const morgan = require("morgan")

//Archivos Router
const roleRouter = require("../router/role.router")
const userRouter = require("../router/user.router")
const addressRouter = require("../router/address.router")
const professionRouter = require("../router/profession.router")



//Middlewares
const app = express()
app.use(express.json());
app.use(morgan("dev"))


//Ruta raiz
app.get('/', (req, res) => {
    res.send('<h1><center>Aplicacion desarrollada por Victor Castro</center></h1>');
});


//Rutas validas
const urlBase = '/api/v1'

app.use(urlBase, roleRouter)
app.use(urlBase, userRouter)
app.use(urlBase, addressRouter)
app.use(urlBase, professionRouter)


//Exportacion del modulo
module.exports = app