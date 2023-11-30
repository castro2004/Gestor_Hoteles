'use strict'

const {Router} = require('express')
const {createUser, readUser, updateUser, deleteUser, login, viewDataUser} = require('../Controller/user.controller') 
const api = Router()

//Rutas para el manejo del usuario
api.post('/create-user', createUser)
api.get('/list-user', readUser)
api.put('/update-user', updateUser)
api.delete('/delete-user', deleteUser)
api.post('/login', login),
api.get('/viewDataUser', viewDataUser)

module.exports = api;











