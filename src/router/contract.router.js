const router = require("express").Router();
const jwtMiddleware = require("../middleware/jwtMiddleware");

const Contract = require("../model/contract.model");
const Address = require("../model/address.model");

router.post("/contract/crearTabla", async (req, res) => {
    try {
        await Contract.sync();

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Tabla creada exitosamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear la tabla"
        });
    }
});

router.post("/contract", jwtMiddleware.verifyToken, async (req, res) => {
    try {
        // Obtener el ID del consumidor del token
        const consumerId = req.user.id;

        // Extraer los datos del cuerpo de la solicitud
        const { professionId, specifications, startDate } = req.body;

        // Crear el contrato con los datos proporcionados
        const newContract = await Contract.create({
            consumerId,
            professionId,
            specifications,
            startDate,
            status: 'Pendiente'
            // Los demás campos serán null por defecto
        });

        res.status(201).json(newContract);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el contrato' });
    }
});




module.exports = router;
