const router = require("express").Router()
const {faker} = require("@faker-js/faker")

const Usuario = require('../model/usuario.model')

router.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: usuarios
    })
})

router.get("/usuarios/:id", async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findOne({
        where: {
            id: id
        }
    })
    res.status(200).json({
        ok: true,
        status: 200,
        body: usuario
    })
})

router.post("/usuarios", async (req, res) => {
    const dataUsers = req.body 
    //await Usuario.sync()
    const createUsuario = await Usuario.create({
      //Este codigo ayuda a crear campos predeterminados, 
        /* nombre: faker.person.fullName(),
        username: faker.internet.userName(),
        correo_electronico: faker.internet.email(),
        contrasena: faker.internet.password(),*/

        nombre: dataUsers.nombre,
        username:  dataUsers.username,
        correo_electronico:  dataUsers.correo_electronico,
        contrasena:  dataUsers.contrasena,

        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Created User",
            body: createUsuario

    })  
})

router.put("/usuarios/:id", async (req, res) => {
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
router.delete("/usuarios/:id", async (req, res) => {
    const patch = {estado_id: 2}
    const id = req.params.id
    const deleteUsuario = await Usuario.update(patch, {where: {id: id}})

 res.status(204).json({
     ok: true,
     status: 204,
     message: "Updated User",
     body: deleteUsuario
 })  


})

module.exports = router