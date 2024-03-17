const router = require("express").Router()
const Role = require("../model/role.model")

router.post("/role/crearTabla", async (req, res) => {
    try {
        await Role.sync();

        // Crear los registros iniciales si la tabla está recién creada
        const roles = [
            { name: 'Admin' },
            { name: 'Staff' },
            { name: 'Worker' },
            { name: 'Consumer' }
        ];
        await Role.bulkCreate(roles);

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

// Ruta para obtener todos los roles
router.get("/roles", async (req, res) => {
    try {
        // Obtener todos los roles de la base de datos
        const roles = await Role.findAll();

        res.status(200).json({
            ok: true,
            status: 200,
            data: roles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener los roles"
        });
    }
});




module.exports = router