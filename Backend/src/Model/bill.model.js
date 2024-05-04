//Modelo para la factura

'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalService: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    totalRoom: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    totalLounge: {
        type: Schema.Types.ObjectId,
        ref: 'Lounge',
    },
    total: {
        type: Number
    },
    nit: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Bill', billSchema)







