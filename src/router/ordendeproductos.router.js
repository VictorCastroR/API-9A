const router = require("express").Router();
const { faker } = require("@faker-js/faker");

const Ordendeproductos = require("../../models/ordendeproductos");
// Rutas para el método find()

router.get('/ordendeproductos', async (req, res) => {
 try{ 
  const ordendeproductos = await Ordendeproductos.findAll();
  res.status(200).json({
    ok:true,
    status: 200,
    body: ordendeproductos,
  });
} catch (error) {
  console.error("Error al recuperar una orden de producto:", error);
  res.status(500).json({
    ok: false,
    status: 500,
    message: "Error al recuperar una orden de producto",
    error: error.message, // Puedes personalizar esto según tus necesidades
  });
}
});

router.get('/ordendeproductos/:id', (req, res) => {
  Ordendeproductos.findById(req.params.id)
    .then(ordendeproductos => res.json(ordendeproductos))
    .catch(err => res.status(400).json(err));
});

// Rutas para el método create()

router.post('/ordendeproductos', (req, res) => {
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

router.put('/ordendeproductos/:id', (req, res) => {
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

router.delete('/ordendeproductos/:id', (req, res) => {
  Ordendeproductos.destroyById(req.params.id)
    .then(() => res.json({ message: 'Orden de producto eliminada correctamente' }))
    .catch(err => res.status(400).json(err));
});

module.exports = router