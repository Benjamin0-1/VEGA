const jwt = require('jsonwebtoken')
const {SECRET} = process.env

const {Admin, User} = require('../db');

//const Admin = require('../models/Admin');
const router = require("express").Router();

// las rutas de admin utilizaran ambos middlewares
// asi isAdmin podra extraer info del jwt y utilizar para verificar los permisos en la tabla Admin.
module.exports = async (req, res, next) => {
    const user_id = req.userId;

    if (!user_id) {
        return res.status(401).json({ error: 'Usuario no autorizado: ID de usuario no válido' });
    }

    try {
        const isAdmin = await Admin.findOne({ where: { user_id } });

        if (!isAdmin) {
            return res.status(403).json({ notAdmin: 'No eres un administrador' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ serverError: `Error interno del servidor: ${error.message}` });
    }
};

