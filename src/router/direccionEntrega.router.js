const router = require('express').Router();
const { verificarToken } = require('../middleware/jwtMiddleware');
const DireccionEntrega = require('../model/direccionEntrega.model');
const PuntoEntrega = require('../model/puntoEntrega.model');
const Direccion = require('../model/direccion.model');
const Usuario = require('../model/usuario.model');


router.get('/direccionesentrega', async (req, res) => {
  try {
    const direccionesEntrega = await DireccionEntrega.findAll({
      include: [PuntoEntrega, Direccion, Usuario],
    });

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
      include: [PuntoEntrega, Direccion, Usuario],
    });

    if (!direccionEntrega) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: 'Dirección de entrega no encontrada',
      });
    }

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
    const { pe_id, direccion_id, usuario_id} = req.body;

    // Validar que solo se mande un id de dirección
    if ((pe_id && direccion_id) || (!pe_id && !direccion_id)) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: 'Debes proporcionar solo un id de dirección (Punto de entrega o direccion propia)',
      });
    }
    await DireccionEntrega.sync();
  // Verificar si el usuario ya tiene una dirección de entrega activa
  const direccionActiva = await DireccionEntrega.findOne({
    where: {
      usuario_id: usuario_id,
      status: true,
    },
  });

  if (direccionActiva) {
    return res.status(400).json({
      ok: false,
      status: 400,
      message: 'Ya tienes una dirección de entrega activa. Debes desactivarla antes de agregar una nueva',
    });
  }
    

    const createDireccionEntrega = await DireccionEntrega.create({
      pe_id: pe_id,
      direccion_id: direccion_id,
      usuario_id: usuario_id
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
