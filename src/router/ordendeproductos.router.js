const express = require('express');
const sequelize = require('sequelize');
const Ordendeproductos = require('./models/Ordendeproductos');

const app = express();

// Rutas para el método find()

app.get('/ordendeproductos', (req, res) => {
  Ordendeproductos.findAll()
    .then(ordenesdeproductos => res.json(ordenesdeproductos))
    .catch(err => res.status(400).json(err));
});

app.get('/ordendeproductos/:id', (req, res) => {
  Ordendeproductos.findById(req.params.id)
    .then(ordendeproductos => res.json(ordendeproductos))
    .catch(err => res.status(400).json(err));
});

// Rutas para el método create()

app.post('/ordendeproductos', (req, res) => {
  const ordendeproductos = new Ordendeproductos({
    id_producto: req.body.id_producto,
    costo: req.body.costo,
    cantidad: req.body.cantidad,
    detalles: req.body.detalles,
    notas: req.body.notas,
  });

  ordendeproductos.save()
    .then(ordendeproductos => res.json(ordendeproductos))
    .catch(err => res.status(400).json(err));
});

// Rutas para el método update()

app.put('/ordendeproductos/:id', (req, res) => {
  const ordendeproductos = new Ordendeproductos({
    id: req.params.id,
    id_producto: req.body.id_producto,
    costo: req.body.costo,
    cantidad: req.body.cantidad,
    detalles: req.body.detalles,
    notas: req.body.notas,
  });

  ordendeproductos.update()
    .then(ordendeproductos => res.json(ordendeproductos))
    .catch(err => res.status(400).json(err));
});

// Rutas para el método destroy()

app.delete('/ordendeproductos/:id', (req, res) => {
  Ordendeproductos.destroyById(req.params.id)
    .then(() => res.json({ message: 'Orden de producto eliminada correctamente' }))
    .catch(err => res.status(400).json(err));
});

app.listen(3306, () => console.log('Servidor iniciado en el puerto 3306'));
