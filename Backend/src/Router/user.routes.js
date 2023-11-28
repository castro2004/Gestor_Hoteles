'use strict'

const {Router} = require('express')
const {createUser, readUser, updateUser, deleteUser} = require('../Controller/user.controller') 
const api = Router()

//Rutas para el manejo del usuario
api.post('/create-user', createUser)
api.get('/list-user', readUser)
api.put('/update-user', updateUser)
api.delete('/delete-user', deleteUser)

module.exports = api;











