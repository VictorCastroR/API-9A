const router = require("express").Router()
const {verifyToken} = require('../middleware/jwtMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const bcrypt = require('bcryptjs');
const User = require("../model/user.model")
const Role = require("../model/role.model")
const Profession = require("../model/profession.model");


router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por su correo electrónico
        const user = await User.findOne({ where: { email } });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Verificar la contraseña utilizando bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Generar un token JWT para el usuario
        const token = jwtMiddleware.generateToken({ id: user.id, email: user.email });

        // Devolver el token JWT en la respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});


router.post("/user/crearTabla", async (req, res) => {
    try {
        await User.sync();

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

// Rutas para obtener usuarios por sus diferentes roles
router.get('/user/admin/', async (req, res) => {
    try {
        const role = await Role.findOne({ where: { name: 'Admin' } })
        if (!role) {
            return res.status(404).json({ message: 'Rol "Admin" no encontrado' });
        }
        const users = await User.findAll({ where: { RoleId: role.id, isActive: true } });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios con el rol "Admin"' });
    }
});
router.get('/user/worker', async (req, res) => {
    try {
        const role = await Role.findOne({ where: { name: 'Worker' } });
        if (!role) {
            return res.status(404).json({ message: 'Rol "Worker" no encontrado' });
        }
        const users = await User.findAll({ where: { RoleId: role.id, isActive: true } });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios con el rol "Worker"' });
    }
});
router.get('/user/consumer', async (req, res) => {
    try {
        const role = await Role.findOne({ where: { name: 'Consumer' } });
        if (!role) {
            return res.status(404).json({ message: 'Rol "Consumer" no encontrado' });
        }
        const users = await User.findAll({ where: { RoleId: role.id, isActive: true } });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios con el rol "Consumer"' });
    }
});
router.get('/user/staff', async (req, res) => {
    try {
        const role = await Role.findOne({ where: { name: 'Staff' } });
        if (!role) {
            return res.status(404).json({ message: 'Rol "Staff" no encontrado' });
        }
        const users = await User.findAll({ where: { RoleId: role.id, isActive: true } });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios con el rol "Staff"' });
    }
});


router.post('/user', async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { fullName, email, password, phoneNumber, ine, criminalRecord, photo, roleId, professionId } = req.body;

        // Verificar si el correo electrónico ya está en uso
        const existingEmailUser = await User.findOne({ where: { email } });
        if (existingEmailUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Verificar si el número de teléfono ya está en uso
        const existingPhoneNumberUser = await User.findOne({ where: { phoneNumber } });
        if (existingPhoneNumberUser) {
            return res.status(400).json({ message: 'El número de teléfono ya está en uso' });
        }

        // Codificar la contraseña utilizando bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Verificar si roleId se proporciona
        let roleIdToUse = null;
        let professionIdValidated = null

        if (roleId && roleId >= 0) {
            // Si se proporciona roleId, verificar si existe en la base de datos de roles
            const roleExists = await Role.findByPk(roleId);
            if (!roleExists) {
                return res.status(404).json({ message: 'El rol proporcionado no existe' });
            }
            roleIdToUse = roleId;
        } else {
            // Si no se proporciona roleId, asignar por defecto el id correspondiente al rol "Consumer"
            const defaultRole = await Role.findOne({ where: { name: 'Consumer' } });
            if (!defaultRole) {
                throw new Error('No se encontró el rol "Consumer" en la base de datos');
            }
            roleIdToUse = defaultRole.id;
        }

        if(professionId >= 0){
            // Si se proporciona professionId, verificar si existe en la base de datos de professions
            const professionExists = await Profession.findByPk(professionId);
            if(!professionExists){
                return res.status(404).json({ message: 'La profesion proporcionada no existe' });
            }
            professionIdValidated = professionId
        }else{
            professionIdValidated = null
        }



        // Crear el nuevo usuario con isActive por defecto como true y roleId asignado correctamente
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            ine,
            criminalRecord,
            photo,
            RoleId: roleIdToUse,
            ProfessionId: professionIdValidated,
            isActive: true
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear un nuevo usuario' });
    }
});
router.put('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { fullName, email, password, phoneNumber, ine, criminalRecord, photo, roleId, professionId } = req.body;

        // Buscar el usuario por su ID
        let user = await User.findByPk(userId);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Actualizar los datos del usuario (excepto isActive)
        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.ine = ine;
        user.criminalRecord = criminalRecord;
        user.photo = photo;
        user.roleId = roleId;
        user.professionId = professionId;
        // Guardar los cambios en la base de datos
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al modificar los datos del usuario' });
    }
});
router.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Buscar el usuario por su ID
        let user = await User.findByPk(userId);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Modificar el atributo isActive a false
        user.isActive = false;

        // Guardar los cambios en la base de datos
        await user.save();

        res.status(200).json({ message: 'Usuario desactivado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al desactivar el usuario' });
    }
});
router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Buscar el usuario por su ID y asegurarse de que esté activo
        const user = await User.findOne({
            where: { id: userId, isActive: true },
            include: Role
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

module.exports = router