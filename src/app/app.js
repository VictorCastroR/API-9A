const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Rutas
const usuarioRouter = require('../router/usuario.router');
const estadoRouter = require('../router/estado.router');
const direccionRouter = require('../router/direccion.router');
const ingredientesRouter = require('../router/ingredientes.router');
const puntoEntregaRouter = require('../router/puntoEntrega.router');
const paqueteRouter = require('../router/paquete.router');
const productoRouter = require('../router/producto.router');
const direccionEntregaRouter = require('../router/direccionEntrega.router');
const pedidoRouter = require('../router/pedido.router');
const pedidoproductoRouter = require('../router/pedidoproducto.router');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('<h1><center>Aplicacion desarrollada por el Equipo Maravilla.SA.de.CV</center></h1>');
});

// Rutas accesibles
const apiBase = '/api/v1';

app.use(apiBase, usuarioRouter);
app.use(apiBase, estadoRouter);
app.use(apiBase, direccionRouter);
app.use(apiBase, ingredientesRouter);
app.use(apiBase, productoRouter);
app.use(apiBase, puntoEntregaRouter);
app.use(apiBase, paqueteRouter);
app.use(apiBase, direccionEntregaRouter);
app.use(apiBase, pedidoRouter);
app.use(apiBase, pedidoproductoRouter);

module.exports = app;
