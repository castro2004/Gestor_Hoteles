'use strict'

const {Router} = require('express')
const { createRoom, readRoom, updateRoom, deleteRoom, reservationStatusUpdate } = require('../Controller/room.controller') 
const api = Router()

//Rutas para el manejo del usuario
api.post('/create-room', createRoom)
api.get('/read-room', readRoom)
api.put('/update-room', updateRoom)
api.delete('/delete-room', deleteRoom)
api.put('/status-room', reservationStatusUpdate)


module.exports = api;

