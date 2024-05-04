//Modelo para los salones

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const loungeSchema = new Schema({
    numberLounge: {
        type: Number,
        required: true,
    },
    typeLounge:{
        type: String,
        enum: ['EMPRESARIAL', 'CELEBRACIONES', 'CULTURALES', 'GASTRONOMICOS', 'SOLIDARIOS', 'TEMATICOS']
    },
    reservationTime: {
        type: String,
        enum: ['MAÑANA', 'TARDE NOCHE', 'NOCHE'],
    },
    availability:{
        type: Boolean,
        default: true,
    },
    dayReservation: {
        type: Date,
        required: false,
    },
    finalReservation: {
        type: Date,
        required: false,
    },
    price: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model(
    'Lounge', loungeSchema
)