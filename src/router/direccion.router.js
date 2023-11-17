const router = require("express").Router()
const {faker} = require("@faker-js/faker")
const { verificarToken } = require('../middleware/jwtMiddleware');

const Direccion = require('../models/direccion.model')

router.get("/direcciones/:usuarioId", async (req, res) => {
    const usuarioId = req.params.usuarioId;
    try {
        const direcciones = await Direccion.findAll({
            where: { usuario_id: usuarioId } 
        });

        if (direcciones.length === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "El usuario no cuenta con direcciones agregadas."
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            body: direcciones
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al buscar direcciones."
        });
    }
});

// Ruta para agregar una dirección a un usuario específico
router.post("/direcciones/:usuarioId",verificarToken, async (req, res) => {
    const usuarioId = req.params.usuarioId;
    const dataDireccion = req.body;
    //await Direccion.sync()
    try {
        // Crear la nueva dirección asociada al usuario con usuarioId
        const nuevaDireccion = await Direccion.create({
            //Este codigo crea campos automaticos, solo es necesario el Id del 
            //usuario
            /*usuario_id: usuarioId,
            calle: faker.location.street(),
            numero: faker.location.buildingNumber(),
            colonia: faker.location.street(),
            ciudad: faker.location.city(),
            estado: faker.location.state(),
            codigo_postal: faker.location.zipCode(),*/

            usuario_id: dataDireccion.usuarioId,
            calle: dataDireccion.calle,
            numero: dataDireccion.numero,
            colonia: dataDireccion.colonia,
            ciudad: dataDireccion.ciudad,
            estado: dataDireccion.estado,
            codigo_postal: dataDireccion.codigo_postal
        });

        res.status(201).json({
            ok: true,
            status: 201,
            body: nuevaDireccion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al agregar la dirección."
        });
    }
});


// Ruta para actualizar una dirección de un usuario específico
router.put("/direcciones/:direccionId/:usuarioId", verificarToken, async (req, res) => {
    const direccionId = req.params.direccionId;
    
    const usuarioId = req.params.usuarioId;
    

    try {
        // Verificar si la dirección pertenece al usuario
        const direccion = await Direccion.findByPk(direccionId);

        if (!direccion) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "La dirección no se encontró."
            });
        }

        if (direccion.usuario_id.toString() !== usuarioId) {
            return res.status(403).json({
                ok: false,
                status: 403,
                message: "No tienes permiso para actualizar esta dirección."
            });
        }

        // Actualizar la dirección con los datos enviados en el cuerpo de la solicitud
        await direccion.update(req.body);

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Dirección actualizada con éxito."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al actualizar la dirección."
        });
    }
});

module.exports = router;