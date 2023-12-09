'use strict'

const {Router} = require('express')
const { createLounge, readLounge, updateLounge, updateStatusLounge, deleteLounge } = require('../Controller/lounge.controller')
const api = Router()

//Rutas para el manejo de los salones
api.post('/create-lounge', createLounge)
api.get('/read-lounge', readLounge)
api.put('/update-lounge', updateLounge)
api.delete('/delete-lounge', deleteLounge)
api.patch('/status-lounge', updateStatusLounge)


module.exports = api;