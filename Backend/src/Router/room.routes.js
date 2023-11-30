'use strict'

const {Router} = require('express')
const { createRoom, readRoom, updateRoom } = require('../Controller/room.controller') 
const api = Router()

//Rutas para el manejo del usuario
api.post('/create-room', createRoom)
api.get('/read-room', readRoom)
api.put('/update-room', updateRoom)

module.exports = api;

