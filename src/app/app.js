const express = require('express')
const morgan = require("morgan")
//Rutas
const usuarioRouter = require("../router/usuario.router")
const estadoRouter = require("../router/estado.router")
const direccionRouter = require("../router/direccion.router")
const puntoEntregaRouter = require("../router/puntoEntrega.router")
const paqueteRouter = require("../router/paquete.router")

const app = express()

app.use(morgan("dev"))

app.get('/', (req, res) =>{
    res.send("<h1><center>Aplicacion desarrollada por el Equipo Maravilla.SA.de.CV</center></h1>")
})

//Rutas accesibles
app.use(express.json())

app.use("/api/v1/", usuarioRouter)
app.use("/api/v1/", estadoRouter);
app.use("/api/v1/", direccionRouter);
app.use("/api/v1/", puntoEntregaRouter);
app.use("/api/v1/", paqueteRouter);


module.exports = app;