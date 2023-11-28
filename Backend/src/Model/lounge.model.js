'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const loungeSchema = new Schema({
    nameLounge: {
        type: String,
        required: true,
    },
    availability:{
        type: Boolean,
        required: true,
    },
    diaReservation: {
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
    'Lounge', loungeSchema
)