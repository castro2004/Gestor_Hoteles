'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    nameRoom: {
        type: String,
        required: true,
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
        required: true
    }
})

module.exports = mongoose.model(
    'Room', roomSchema
)







