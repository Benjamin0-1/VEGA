const jwt = require('jsonwebtoken')
const {SECRET} = process.env

const {Admin, User} = require('../db');

//const Admin = require('../models/Admin');
const router = require("express").Router();

// The admin routes will use both middlewares
// This way, the isAdmin middleware can extract information from the JWT and use it to verify permissions in the Admin table.
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

