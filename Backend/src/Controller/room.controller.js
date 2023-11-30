//Room driver

'use strict'

const Room = require('../Model/room.model')

//--------------------------------------------Create Room-------------------------------------------

const createRoom = async(req, res) => {
    try{
        const {nameRoom, availability, price} = req.body;
    
        if(!nameRoom){
            res.status(404).json({
                msg: 'Debe llevar todos los campos'
            })
        }

        if(!availability){
            res.status(404).json({
                msg: 'Debe llevar todos los campos'
            })
        }

        if(!price){
            res.status(404).json({
                msg: 'Debe llevar todos los campos'
            })
        }

        const room = new Room(req.body);
        const rooms = await room.save();

        if(!rooms){
            return 'No se logro crear la habitacion'
        }else{
            return res.status(404).json({
                rooms: rooms
            })
        }

    }catch(err){
        console.log(err)
    }

}

//-----------------------------------------------------list room---------------------------------------

const readRoom = async(req, res) => {
    try{
        
        const room = await Room.find()
    
        if(!room){
            return res.status(404).json({
                msg: 'No hay usuario en la lista'
            })
        }else{
            return res.status(404).json({
                msg: 'La lista de habitaciones es la siguiente',
                lista_habitaciones: room
            })
        }
    
    }catch(err){
        console.log(err)
    }
}

//--------------------------------------------------edit room--------------------------------------------

const updateRoom = async(req, res) => {
    try{
        
        const updateData = req.body;

        if(!updateData.id){
            return res.status(404).json({
                msg: 'El ID de la habitacion no es correcto'
            });
        }

        const updateRoom = await Room.findOneAndUpdate(updateData.id, updateData, {new: true})

        if(!updateRoom){
            return 'No se logro actualizar la habitacion'
        }else{
            return res.status(404).json({
                updateRoom
            })
        }

    }catch(err){
        console.log(err)
    }
}

//-----------------------------------------------------Delte room----------------------------------------------------

const deleteRoom = async(req, res) =>{
    try{

        const id = req.body.id;

        let roomDelete = await Room.findByIdAndDelete({_id: id})

        if(!roomDelete){
            return res.status(404).json({
                msg: 'Habitacion eliminada',
                habitacion_eliminada: roomDelete
            })
        }

    }catch(err){
        console.log(err)
    }
}






module.exports = {
    createRoom,
    readRoom,
    updateRoom
}

















