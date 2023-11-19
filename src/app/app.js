const express = require('express')
const morgan = require("morgan")
const cors = require("cors")
//Rutas
const usuarioRouter = require("../router/usuario.router")
const estadoRouter = require("../router/estado.router")
const direccionRouter = require("../router/direccion.router")
const ingredientesRouter = require("../router/ingredientes.router")
const ordendeproductosRouter = require("../router/ordendeproductos.router")
const puntoEntregaRouter = require("../router/puntoEntrega.router")
const paqueteRouter = require("../router/paquete.router")
const productoRouter =require("../router/producto.router")
const direccionEntrega = require("../router/direccionEntrega.router")

const app = express()
app.use(cors())
app.use(morgan("dev"))

app.get('/', (req, res) =>{
    res.send("<h1><center>Aplicacion desarrollada por el Equipo Maravilla.SA.de.CV</center></h1>")
})


//Rutas accesibles
app.use(express.json())

app.use("/api/v1/", usuarioRouter)
app.use("/api/v1/", estadoRouter);
app.use("/api/v1/", direccionRouter);
app.use("/api/v1", ingredientesRouter);
app.use("/api/v1", ordendeproductosRouter);
app.use("/api/v1/", productoRouter);
app.use("/api/v1/", puntoEntregaRouter);
app.use("/api/v1/", paqueteRouter);
app.use("/api/v1", direccionEntrega)


module.exports = app;