const router = require('express').Router();
const { verificarToken } = require('../middleware/jwtMiddleware');
const DireccionEntrega = require('../model/direccionEntrega.model');
const PuntoEntrega = require('../model/puntoEntrega.model');
const Direccion = require('../model/direccion.model');
const Pedido = require('../model/pedido.model');

router.get('/direccionesentrega', async (req, res) => {
  try {
    const direccionesEntrega = await DireccionEntrega.findAll();
    res.status(200).json({
      ok: true,
      status: 200,
      body: direccionesEntrega,
    });
  } catch (error) {
    console.error('Error al obtener direcciones de entrega:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/direccionesentrega/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const direccionEntrega = await DireccionEntrega.findOne({
      where: { id: id },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      body: direccionEntrega,
    });
  } catch (error) {
    console.error('Error al obtener dirección de entrega:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.post('/direccionesentrega', async (req, res) => {
  try {
    const dataDireccionEntrega = req.body;
    await DireccionEntrega.sync()

    const createDireccionEntrega = await DireccionEntrega.create({
      pe_id: dataDireccionEntrega.pe_id,
      direccion_id: dataDireccionEntrega.direccion_id,
      pedido_id: dataDireccionEntrega.pedido_id,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: 'Dirección de entrega creada correctamente',
      body: createDireccionEntrega,
    });
  } catch (error) {
    console.error('Error al crear dirección de entrega:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
