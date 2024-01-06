'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    nameHotel: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        enum: ['España', 'Francia', 'Reino Unido']
    },
    ciudad:{
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    room: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }],
    lounge: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lounge'
    }]
});

module.exports = mongoose.model('Hotel', hotelSchema)


























