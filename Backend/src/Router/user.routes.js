'use strict';

const { Router } = require('express');
const {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    login,
    viewDataUser,
} = require('../Controller/user.controller');
const { verifyAdminToken } = require('../Middlewares/auth.middleware'); // Assuming you have a middleware for verifying admin token
const api = Router();

// Rutas para el manejo del usuario con verificación de token de administrador
api.post('/create-user', createUser);
api.get('/list-user',readUser); // Verifica el token de administrador antes de permitir el acceso
api.put('/update-user',updateUser); // Verifica el token de administrador antes de permitir el acceso
api.delete('/delete-user',deleteUser); // Verifica el token de administrador antes de permitir el acceso
api.post('/login', login);
api.get('/viewDataUser',viewDataUser); // Verifica el token de administrador antes de permitir el acceso

module.exports = api;
