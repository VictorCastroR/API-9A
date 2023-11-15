const router = require("express").Router()
const {faker} = require("@faker-js/faker")

const Ingredientes = require('../models/ingredientes')

router.get("/ingredientes", async (req, res) => {
    const ingredientes = await ingredientes.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: ingredientes
    })
})

module.exports = router