const router = require("express").Router()
const {faker} = require("@faker-js/faker")
const jwtUtils = require('../app/jwt');
const { verificarToken } = require('../middleware/jwtMiddleware');
const bcrypt = require('bcrypt');
const saltRounds = 3;

const Usuario = require('../model/usuario.model')

router.post('/login', async (req, res) => {
    try {
    const {correo_electronico, contrasena } = req.body
  
    //Se busca el usuario en la BD por su correo electronico
    //Ya que este es unico y no se puede repetir
    const usuario = await Usuario.findOne({
        where: {
            correo_electronico : correo_electronico
        },
    });
    //Existe el wey??
    if(!usuario){
        return res.status(4001).json({
            ok: false,
            mensaje: "Credenciales invalidas"
        });
    }
    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);

    // Verifica si las contraseñas coinciden
    if (!contrasenaValida) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Credenciales inválidas',
        });
      }

      // Genera un token y envíalo en la respuesta
    const token = jwtUtils.generarToken(usuario);

    res.status(200).json({
        ok: true,
        token,
      });
    } catch (error) {
      console.error('Error en la autenticación:', error);
      res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }

  });

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

router.post("/usuarios", verificarToken, async (req, res) => {
    const dataUsers = req.body 
    const hashedPassword = await bcrypt.hash(dataUsers.contrasena, saltRounds);
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
        contrasena:  hashedPassword,

        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Created Usuario",
            body: createUsuario

    })  
})

router.put("/usuarios/:id", async (req, res) => {
    const id = req.params.id
    const dataUsers = req.body
    const hashedPassword = await bcrypt.hash(dataUsers.contrasena, saltRounds);
    const updateUsuario = await Usuario.update({
          nombre: dataUsers.nombre,
          username:  dataUsers.username,
          correo_electronico:  dataUsers.correo_electronico,
          contrasena:  hashedPassword,
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
     message: "Deleted User",
 })  


})

module.exports = router