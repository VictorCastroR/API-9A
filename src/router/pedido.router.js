const router = require("express").Router();
const sequelize = require('../config/sequelize-config');
const { verificarToken } = require('../middleware/jwtMiddleware');
const Pedido = require('../model/pedido.model'); 
const Producto = require('../model/producto.model');
const DireccionEntrega = require('../model/direccionEntrega.model');
const PuntoEntrega = require('../model/puntoEntrega.model');
const Direccion = require('../model/direccion.model');


const PedidoProducto = require('../model/pedidoproducto.model');
router.get("/pedidos", async (req, res) => {
    const pedidos = await Pedido.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: pedidos
    });
});

router.get("/pedidos/:id", async (req, res) => {
    const id = req.params.id
    const pedido = await Pedido.findOne({
        where: {
            id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: pedido
    });
});

router.post('/pedidos', async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
      const { descuento = 0, usuario_id, direccionEntrega_id, productos } = req.body;
      await Pedido.sync();

      // Calcular costo total y aplicar descuento
      let costoTotal = 0;
      let descuentoTotal = descuento || 0;

      for (const { producto_id, cantidad } of productos) {
        const producto = await Producto.findByPk(producto_id);

        if (producto) {
          costoTotal += producto.precio * cantidad;
        }
      }
    
      // Aplicar descuento
      costoTotal -= descuentoTotal;

      // Crear el pedido
      const nuevoPedido = await Pedido.create({
          costoTotal: costoTotal,
          descuento: descuento,
          isCompleted: false,
          usuario_id: usuario_id,
          direccionEntrega_id: direccionEntrega_id,
      }, { transaction: t });

      await PedidoProducto.sync();
      
      // Agregar los productos al pedido
      for (const { producto_id, cantidad } of productos) {
          await PedidoProducto.create({
              pedido_id: nuevoPedido.id,
              producto_id: producto_id,
              cantidad: cantidad,
          }, { transaction: t });
      }

      // Commit la transacción
      await t.commit();

      res.status(201).json({
          ok: true,
          status: 201,
          message: 'Pedido creado correctamente',
          body: nuevoPedido,
      });
  } catch (error) {
      // Rollback en caso de error
      await t.rollback();

      console.error('Error al crear un nuevo pedido:', error);
      res.status(500).json({
          ok: false,
          status: 500,
          message: 'Error al crear un nuevo pedido',
          error: error.message,
      });
  }
});


  module.exports = router;

