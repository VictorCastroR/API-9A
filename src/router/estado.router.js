const router = require("express").Router()

const Estado = require('../models/estado.model')
router.get("/estados", async (req, res) => {
    const estados = await Estado.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: estados
    })
    
})

module.exports = router