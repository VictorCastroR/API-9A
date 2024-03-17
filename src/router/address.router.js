const router = require("express").Router()
const express = require('express');
const {verifyToken} = require('../middleware/jwtMiddleware');
const bcrypt = require('bcryptjs');

const Address = require('../model/address.model');
const User = require("../model/user.model")

// Ruta para crear una nueva dirección
router.post("/address/crearTabla", async (req, res) => {
    try {
        await Address.sync();

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
router.post('/address', verifyToken,async (req, res) => {
    try {
        const { street, city, state, country, postalCode, UserId } = req.body;

        // Verificar si UserId está presente en el cuerpo de la solicitud
        if (!UserId) {
            return res.status(400).json({ message: 'Usuario no existe' });
        }

        // Verificar si el usuario asociado está activo y existe
        const user = await User.findOne({ where: { id: UserId, isActive: true } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario asociado no encontrado o inactivo' });
        }

        // Crear la nueva dirección
        const newAddress = await Address.create({
            street,
            city,
            state,
            country,
            postalCode,
            isActive: true, // Por defecto, la dirección se considera activa
            UserId
        });

        res.status(201).json(newAddress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear una nueva dirección' });
    }
});
router.put('/address/:id', verifyToken, async (req, res) => {
    try {
        const addressId = req.params.id;
        const { street, city, state, country, postalCode } = req.body;

        // Buscar la dirección por su ID
        let address = await Address.findByPk(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        // Actualizar los datos de la dirección
        address.street = street;
        address.city = city;
        address.state = state;
        address.country = country;
        address.postalCode = postalCode;

        // Guardar los cambios en la base de datos
        await address.save();

        res.status(200).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al modificar la dirección' });
    }
});
router.get('/address/:id', verifyToken, async (req, res) => {
    try {
        const addressId = req.params.id;

        // Buscar la dirección por su ID y asegurarse de que esté activa
        const address = await Address.findOne({
            where: { id: addressId, isActive: true }
        });

        if (!address) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        res.status(200).json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la dirección' });
    }
});
router.get('/addresses', verifyToken, async (req, res) => {
    try {
        // Obtener todas las direcciones
        const addresses = await Address.findAll({ where: { isActive: true } });
        res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las direcciones' });
    }
});

module.exports = router