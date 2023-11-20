const router = require('express').Router();
const PedidoProducto = require('../model/pedidoproducto.model');


router.get('/pedido/:pedido_id/productos', async (req, res) => {
  try {
    const { pedido_id } = req.params;
    const productos = await PedidoProducto.findAll({
      where: {
        pedido_id: pedido_id,
      },
    });
    res.status(200).json({
      ok: true,
      status: 200,
      body: productos,
    });
  } catch (error) {
    console.error('Error al obtener productos de un pedido:', error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al obtener productos de un pedido',
      error: error.message,
    });
  }
});


router.post('/pedido/:pedido_id/producto/:producto_id', async (req, res) => {
  try {
    const { pedido_id, producto_id } = req.params;
    const { cantidad } = req.body;

    //await PedidoProducto.sync()
    const nuevoPedidoProducto = await PedidoProducto.create({
      pedido_id: pedido_id,
      producto_id: producto_id,
      cantidad: cantidad,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: 'Producto agregado al pedido correctamente',
      body: nuevoPedidoProducto,
    });
  } catch (error) {
    console.error('Error al agregar producto a un pedido:', error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al agregar producto a un pedido',
      error: error.message,
    });
  }
});

// Eliminar un producto de un pedido
router.delete('/pedido/:pedido_id/producto/:producto_id', async (req, res) => {
  try {
    const { pedido_id, producto_id } = req.params;

    await PedidoProducto.destroy({
      where: {
        pedido_id: pedido_id,
        producto_id: producto_id,
      },
    });

    res.status(200).json({
      ok: true,
      status: 200,
      message: 'Producto eliminado del pedido correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar producto de un pedido:', error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: 'Error al eliminar producto de un pedido',
      error: error.message,
    });
  }
});

module.exports = router;
