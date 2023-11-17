const router = require("express").Router()
const {faker} = require("@faker-js/faker")
const { verificarToken } = require('../middleware/jwtMiddleware');
const Pedido = require('../models/pedido.model')

router.get("/pedidos", async (req, res) => {
    const pedidos = await Pedido.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: pedidos
    })
})

router.get("/pedidos/:id", async (req, res) => {
    const id = req.params.id
    const pedido = await Pedido.findOne({
        where: {
            id: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: pedido
    })
})
//PENDIENTE DESDE AQUI PARA ABAJO
router.post("/pedidos", verificarToken, async (req, res) => {
    const dataPedido = req.body;

    try {
        // Buscar todas las ordenes de productos asociadas al pedido
        const ordenesProducto = await OrdenDeProductos.findAll({
            attributes: ['costo', 'cantidad'],
            where: {
                id: dataPedido.id_pedido, // Asegúrate de ajustar esto según tu estructura de datos
            }
        });

        // Calcular el costo total sumando el producto de costo y cantidad de todas las ordenes
        const costoTotal = ordenesProducto.reduce((total, orden) => {
            return total + (orden.costo * orden.cantidad);
        }, 0);

        // Crear el pedido con el costo total calculado
        const createPedido = await Pedido.create({
            costoTotal: costoTotal,
            descuento: dataPedido.descuento,
            usuario_id: dataPedido.usuario_id
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Created Pedido",
            body: createPedido
        });
    } catch (error) {
        console.error('Error al crear un pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

router.put("/usuarios/:id", verificarToken, async (req, res) => {
    const id = req.params.id
    const dataUsers = req.body
    const updateUsuario = await Usuario.update({
          nombre: dataUsers.nombre,
          username:  dataUsers.username,
          correo_electronico:  dataUsers.correo_electronico,
          contrasena:  dataUsers.contrasena,
          }, {
            where: {
                id:id
            }
        });
          res.status(201).json({
              ok: true,
              status: 200,
              message: "Updated User",
              body: updateUsuario
  
      })   
})

//Eliminacion Logica (Modifica el status a 2, Inactivo)
router.delete("/usuarios/:id", verificarToken, async (req, res) => {
    const patch = {estado_id: 2}
    const id = req.params.id
    const deleteUsuario = await Usuario.update(patch, {where: {id: id}})

 res.status(204).json({
     ok: true,
     status: 204,
     message: "Deleted User",
 })  


})

module.exports = router