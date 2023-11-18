const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const { verificarToken } = require('../middleware/jwtMiddleware');

const PuntoEntrega = require('../model/puntoEntrega.model');

// Ruta para obtener todos los puntos de entrega
router.get('/puntosentrega', async (req, res) => {
    try {
      const puntosEntrega = await PuntoEntrega.findAll({where: {
        active: true
    }})
      res.status(200).json({
        ok: true,
        status: 200,
        body: puntosEntrega
    })
} catch (error) {
    console.error('Error al obtener puntos de entrega:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
})

router.get("/puntosentrega/:id", async (req, res) => {
    const id = req.params.id;
    const puntoEntrega = await PuntoEntrega.findOne({
        where: {
            id: id
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: puntoEntrega
    });
});

router.post('/puntosentrega', verificarToken, async (req, res) => {
    try {
        const dataPuntoEntrega =  req.body
        //await PuntoEntrega.sync();
        const createPuntoEntrega = await PuntoEntrega.create({
            /*calle: faker.location.street(),
            numero: faker.location.buildingNumber(),
            colonia: faker.location.street(),
            ciudad: faker.location.city(),
            estado: faker.location.state(),
            codigoPostal: faker.location.zipCode(),
            notas: faker.lorem.sentence()*/

            calle: dataPuntoEntrega.calle,
            numero: dataPuntoEntrega.numero,
            colonia: dataPuntoEntrega.colonia,
            ciudad: dataPuntoEntrega.ciudad,
            estado: dataPuntoEntrega.estado,
            codigoPostal: dataPuntoEntrega.codigoPostal,
            notas: dataPuntoEntrega.notas
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Created Punto de Entrega",
            body: createPuntoEntrega
        })

    } catch (error) {
        console.error('Error al crear un punto de entrega:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

});

router.put("/puntosentrega/:id", verificarToken, async (req, res) => {
    const id = req.params.id;
    const dataPuntoEntrega = req.body;
    
    const updatePuntoEntrega = await PuntoEntrega.update({
        calle: dataPuntoEntrega.calle,
        numero: dataPuntoEntrega.numero,
        colonia: dataPuntoEntrega.colonia,
        ciudad: dataPuntoEntrega.ciudad,
        estado: dataPuntoEntrega.estado,
        codigoPostal: dataPuntoEntrega.codigoPostal,
        notas: dataPuntoEntrega.notas
    }, {
        where: {
            id: id
        }
    });

    res.status(200).json({
        ok: true,
        status: 200,
        message: "Updated PuntoEntrega",
        body: updatePuntoEntrega
    });
},);

router.delete("/puntosentrega/:id", verificarToken, async (req, res) => {
    const patch = { activo: false };
    const id = req.params.id;
    const deletePuntoEntrega = await PuntoEntrega.update(patch, { where: { id: id } });

    res.status(201).json({
        ok: true,
        status: 201,
        message: "Deleted PuntoEntrega",
    });
});

module.exports = router



