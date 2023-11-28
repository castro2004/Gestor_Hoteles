//Modelo para el usuario

'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    email:  {
        type: String,
        required: true,
        unique: true,
        //match => para indicar el valor necesario para que el correo
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    rol: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    },
    cellPhone: {
        type: Number,
        required: true,
        unique: true
    },
    token: {
        type: String,
    },
    bill: {
        servicios: {
            type: Schema.Types.ObjectId,
            ref: 'Bill'
        }
    }
})

module.exports = mongoose.model('User', userSchema)







