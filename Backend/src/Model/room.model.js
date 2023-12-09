'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    numberRoom: {
        type: String,
        required: true,
    },
    typeRoom: {
        type: String,
        enum: ['SUITE', 'JUNIOR SUITE', 'GRAN SUITE', 'INDIVIDUAL', 'DOBLE', 'CUADRUPLES'],
    },
    reservationTime: {
        type: String,
        enum: ['MAÑANA', 'TARDE NOCHE', 'NOCHE'],
    },
    availability:{
        type: Boolean,
        required: true,
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
    'Room', roomSchema
)







