'use strict'

const express = require('express')
const app = express();
const {connection} = require('./src/Database/connection')
require('dotenv').config()
const port = process.env.PORT;
const cors = require('cors')
const routerU = require('./src/Router/user.routes')

connection()
//urlencoded => Nos ayuda para poder manejar solicitudes de cargas
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());

app.use('/api', routerU)

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})




