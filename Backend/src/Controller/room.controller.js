//Room driver

'use strict'

const Room = require('../Model/room.model')
const Hotel = require('../Model/hotel.model')

//--------------------------------------------Create Room-------------------------------------------

const createRoom = async(req, res) => {
    try{
        const {nameRoom, availability, hotelId} = req.body;
    
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

        if(!hotelId){
            return 'Debe de proporcionar el Id del hotel de forma correcta'
        }

        const room = new Room(req.body);
        const rooms = await room.save();

        const updateHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            {$push: {room: rooms._id}},
            {new: true}
        );

        if(!updateHotel){
            return 'No se logro actualizar al modelo de Hoteles'
        }

        if(!rooms){
            return 'No se logro crear la habitacion'
        }else{
            return res.status(404).json({
                msg: 'Habitacion creada y añadida al Hotel correctamente',
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

        // console.log(req.body);

        let roomDelete = await Room.findByIdAndDelete({_id: id})

        if(!roomDelete){
            return res.status(404).json({
                msg: "No se encontro la habitacion a eliminar"
        })
        }else{
            return res.status(404).json({
                msg: "Habitacion eliminado: ",
                habitacion_eliminado: roomDelete
            })
        }

    }catch(err){
        console.log(err)
    }
}

//-------------------------------------------------revervation-------------------------------------
//Reservation status update

const reservationStatusUpdate = async(req, res) => {
    try {
        const { roomId, tipoReservacion, diaReservacion, finalReservacion } = req.body;

        // Obtener la habitación por ID
        const habitacion = await Room.findById(roomId);

        // Verificar si la habitación existe
        if (!habitacion) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }

        // Verificar disponibilidad de la habitación
        if (!habitacion.availability) {
            return res.status(400).json({ error: 'La habitación no está disponible' });
        }

        // Calcular la diferencia en días entre la fecha de inicio y la fecha de finalización
        const diasTotales = Math.ceil((new Date(finalReservacion) - new Date(diaReservacion)) / (1000 * 60 * 60 * 24));

        // Verificar el tipo de habitación y asignar el precio base
        let precioBase = 0;
        switch (habitacion.typeRoom) {
            case 'SUITE':
                precioBase = 130;
                break;
            case 'JUNIOR SUITE':
                precioBase = 130;
                break;
            case 'GRAN SUITE':
                precioBase = 130;
                break;
            case 'INDIVIDUAL':
                precioBase = 130;
                break;
            case 'DOBLE':
                precioBase = 130;
                break;
            case 'CUADRUPLES':
                precioBase = 130;
                break;
            default:
                return res.status(400).json({ error: 'Tipo de habitación no válido' });
        }

        // Calcular el precio total según el tipo de reservación
        let precioTotal = 0;
        switch (tipoReservacion) {
            case 'MAÑANA':
                precioTotal = diasTotales * precioBase;
                break;
            case 'TARDE NOCHE':
                precioTotal = diasTotales * precioBase;
                break;
            case 'NOCHE':
                precioTotal = diasTotales * precioBase;
                break;
            default:
                return res.status(400).json({ error: 'Tipo de reservación no válido' });
        }

        // Actualizar la información de la reserva en la base de datos
        const finalReservacionDate = new Date(finalReservacion);
        await Room.findByIdAndUpdate(roomId, {
            dayReservation: new Date(diaReservacion),
            finalReservation: finalReservacionDate,
            price: precioTotal,
            availability: finalReservacionDate <= new Date(), // Actualiza availability si la fecha de finalización ha pasado
        });

        return res.status(200).json({ precioTotal });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createRoom,
    readRoom,
    updateRoom,
    deleteRoom,
    reservationStatusUpdate
}

















