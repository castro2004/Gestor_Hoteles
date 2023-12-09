'use strict'

const {Router} = require('express');
const { createHotel, readHotel, updateHotel, deleteHotel } = require('../Controller/hotel.controller');

const api = Router()

//Rutas para el manejo de los salones
api.post('/create-hotel', createHotel)
api.get('/read-hotel', readHotel)
api.put('/update-hotel', updateHotel)
api.delete('/delete-hotel', deleteHotel )
// api.patch('/status-lounge', updateStatusLounge)


module.exports = api;