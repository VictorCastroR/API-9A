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
router.put('/contract/workerRating/:id',jwtMiddleware.verifyToken, async (req, res) => {
    try {
        const contractId = req.params.id;
        const { comment, rating } = req.body;

        // Buscar el contrato por su ID
        const contract = await Contract.findByPk(contractId);

        // Verificar si el contrato existe
        if (!contract) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }

        // Verificar si el contrato está en estado "Terminado"
        if (contract.status !== 'Terminado') {
            return res.status(400).json({ message: 'El contrato no está en estado "Terminado". No se puede calificar.' });
        }

        // Verificar si el usuario logeado es el consumidor del contrato
        const consumerId = req.user.id;
        if (contract.consumerId !== consumerId) {
            return res.status(403).json({ message: 'No tienes permiso para calificar este contrato.' });
        }

        // Actualizar la calificación y el comentario del trabajador en el contrato
        contract.workerRating = rating;
        contract.workerComment = comment;
        res.status(200).json({ message: 'Calificación del trabajador actualizada correctamente' });
        // Guardar los cambios en la base de datos
        await contract.save();

        res.status(200).json({ message: 'Calificación del trabajador actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al calificar al trabajador en el contrato' });
    }
});
router.get('/contract/:id', jwtMiddleware.verifyToken, async (req, res) => {
    try {
        //AUN NO ESTA LISTO ESTE
        const contractId = req.params.id;
        const contract = await Contract.findByPk(contractId);
        if (!contract) {
            return res.status(404).json({ message: 'Contrato no encontrado.' });
        }

        res.status(200).json(contract);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el contrato.' });
    }
});



module.exports = router;
