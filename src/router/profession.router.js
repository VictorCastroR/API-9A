const express = require('express');
const router = express.Router();
const Profession = require('../model/profession.model');
const verifyToken = require('../middleware/jwtMiddleware');



router.post("/profession/crearTabla", async (req, res) => {
    try {
        await Profession.sync();

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

// Ruta para crear una nueva profesión
router.post('/profession',  async (req, res) => {
    try {
        const { nombre, rubro, precio } = req.body;

        // Crear la nueva profesión
        const newProfession = await Profession.create({
            nombre,
            rubro,
            precio,
            isActive: true
        });

        res.status(201).json(newProfession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear una nueva profesión' });
    }
});

// Ruta para obtener todas las profesiones activas
router.get('/professions', verifyToken.verifyToken, async (req, res) => {
    try {
        // Obtener todas las profesiones activas
        const professions = await Profession.findAll({ where: { isActive: true } });
        res.status(200).json(professions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las profesiones' });
    }
});

// Ruta para obtener una profesión por su ID
router.get('/profession/:id', verifyToken.verifyToken, async (req, res) => {
    try {
        const professionId = req.params.id;

        // Buscar la profesión por su ID y asegurarse de que esté activa
        const profession = await Profession.findOne({
            where: { id: professionId, isActive: true }
        });

        if (!profession) {
            return res.status(404).json({ message: 'Profesión no encontrada' });
        }

        res.status(200).json(profession);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la profesión' });
    }
});

// Ruta para eliminar una profesión
router.delete('/profession/:id', verifyToken.verifyToken, async (req, res) => {
    try {
        const professionId = req.params.id;

        // Buscar la profesión por su ID
        let profession = await Profession.findByPk(professionId);

        // Verificar si la profesión existe
        if (!profession) {
            return res.status(404).json({ message: 'Profesión no encontrada' });
        }

        // Modificar el atributo isActive a false
        profession.isActive = false;

        // Guardar los cambios en la base de datos
        await profession.save();

        res.status(200).json({ message: 'Profesión eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la profesión' });
    }
});


module.exports = router;
