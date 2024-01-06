'use strict'

const {Router} = require('express');
const { createHotel, readHotel, updateHotel, deleteHotel, readHotelCity, getImgeHotel, addImageHotel } = require('../Controller/hotel.controller');

const connetMultiparty = require('connect-multiparty')
const upload =  connetMultiparty({uploadDir: './upload/hotels'})
const api = Router()

//Rutas para el manejo de los salones
api.post('/create-hotel', createHotel)
api.get('/read-hotel', readHotel)
api.put('/update-hotel', updateHotel)
api.delete('/delete-hotel', deleteHotel )
api.get('/hoteles/:pais', readHotelCity);

//Manejo de imagenes
api.put('/add-image', [upload], addImageHotel)
api.get('/view-image/:hotelId', getImgeHotel)


module.exports = api;