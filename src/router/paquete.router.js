const router = require("express").Router()
const {faker} = require("@faker-js/faker")
const { verificarToken } = require('../middleware/jwtMiddleware');
const Paquete = require('../model/paquete.model')

router.get("/paquetes", async (req, res) => {
    const paquetes = await Paquete.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: paquetes
    })
})

router.get("/paquetes/:id", async (req, res) => {
    const id = req.params.id
    const paquete = await Paquete.findOne({
        where: {
            id: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: paquete
    })
})

router.post("/paquetes", verificarToken, async (req, res) => {
    const dataPaquetes = req.body 
    await Paquete.sync()
    const createPaquete = await Paquete.create({
        concepto: dataPaquetes.concepto,
        precio: dataPaquetes.precio,
        cantidad: dataPaquetes.cantidad
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Created Paquete",
            body: createPaquete
    })  
})

router.put("/paquetes/:id", verificarToken, async (req, res) => {
    const id = req.params.id
    const dataPaquete = req.body
    const updatePaquete = await Paquete.update({
          concepto: dataPaquete.concepto,
          precio: dataPaquete.precio,
          cantidad: dataPaquete.cantidad
          }, {
            where: {
                id:id
            }
        });
          res.status(200).json({
              ok: true,
              status: 200,
              message: "Updated User",
              body: updatePaquete
  
      })   
})

//Eliminacion Logica (Modifica el status a 2, Inactivo)
router.delete("/paquetes/:id", verificarToken, async (req, res) => {
    const patch = {activo: false}
    const id = req.params.id
    const deletePaquete = await Paquete.update(patch, {where: {id: id}})

 res.status(204).json({
     ok: true,
     status: 204,
     message: "Deleted Paquete",
 })  


})

module.exports = router