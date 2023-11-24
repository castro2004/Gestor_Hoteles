'use strict'

require('dotenv').config();
const database = process.env.DATABASE

const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const connection = async() => {
    try{
        await mongoose.connect(database);
        console.log("Conexion a la base de datos exitosa")
    }catch(err){
        console.log("Error de conexion")
        console.log(err)
    }
}

module.exports = { connection}











