'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    nameHotel: {
        type: String,
        required: true,
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


























