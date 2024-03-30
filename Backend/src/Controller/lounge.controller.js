//Lounge driver

'use strict'

const Lounge = require('../Model/lounge.model')
const Hotel = require('../Model/hotel.model')

//-----------------------------------------------------Crete lounge---------------------------------------------------------------------

const createLounge = async(req, res) => {
    try{
        const {numberLounge, availability, hotelId} = req.body;

        if(!hotelId){
            return 'No se proporciono correctamente el ID del hotel'
        }

        if(!numberLounge){
            return 'Debe llevar todos los campo (falta numero de salon)'
        }

        const lounge = new Lounge(req.body)
        const lounges = await lounge.save();

        const updateHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            {$push: {lounge :lounge._id}},
            {new: true}
        )

        if(!updateHotel){
            return 'No se logro añadir al hotel'
        }

        if(!lounges){
            return 'Error al crear el salon dentro del sistema'
        }else{
            return res.status(202).json({
                lounges
            })
        }

    }catch(err){
        console.log(err)
    }
}

//----------------------------------------------list lounge------------------------------------------------

const readLounge = async(req, res) => {
    try{
        
        const lounge = await Lounge.find()

        if(!lounge){
            return 'No hay salones disponibles en la lista'
        }else{
            return res.status(202).json({
                msg: 'Lista de salones',
                lista_salones: lounge
            })
        }

    }catch(err){

    }
}

//------------------------------------------------delete lounge-------------------------------------------------------------------

const deleteLounge = async(req, res) => {
    try{

        const id = req.body.id;

        let loungeDelete = await Lounge.findByIdAndDelete({_id: id})

        if(loungeDelete){
            return 'No se encontro el salon a eliminar'
        }else{
            return res.status(404).json({
                msg: "Habitacion eliminado: ",
                salon_eliminado: loungeDelete
            })
        }

    }catch(err){
        console.log(err)
    }
}

//----------------------------------------------update lounge----------------------------------------------------------

const updateLounge = async(req, res) => {
    try{

        const updateData = req.body;

        if(!updateData){
            return res.status(404).json({
                msg: 'El ID de la habitacion es incorrecto'
            })
        }

        const updateLounge = await Lounge.findByIdAndUpdate(updateData.id, updateData, {new: true})
        
        if(!updateData){
            return 'No se logro actualizar el salon'
        }else{
            return res.status(200).json({
                updateLounge
            })
        }

    }catch(err){
        console.log(err)
    }
}

//--------------------------------------------Delete lounge----------------------------------------------------------------

const updateStatusLounge = async(req, res) => {
    try{
        const { loungeId, tipoReservacion, diaReservacion, finalReservacion } = req.body;

        // Obtener la habitación por ID
        const salon = await Lounge.findById(loungeId);

        // Verificar si la habitación existe
        if (!salon) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }

        // Verificar disponibilidad de la habitación
        if (!salon.availability) {
            return res.status(400).json({ error: 'La habitación no está disponible' });
        }

        // Calcular la diferencia en días entre la fecha de inicio y la fecha de finalización
        //.ceil aproximación de datos enteros 
const diasTotales = Math.ceil((new Date(finalReservacion) - new Date(diaReservacion)) / (1000 * 60 * 60 * 24));

        // Verificar el tipo de habitación y asignar el precio base
        let precioBase = 0;
        switch (salon.typeLounge) {
            case 'EMPRESARIA':
                precioBase = 130;
                break;
            case 'CELEBRACIONES':
                precioBase = 130;
                break;
            case 'CULTURALES':
                precioBase = 130;
                break;
            case 'GASTRONOMICOS':
                precioBase = 130;
                break;
            case 'SOLIDARIOS':
                precioBase = 130;
                break;
            case 'TEMATICOS':
                precioBase = 130;
                break;
            default:
                return res.status(400).json({ error: 'Tipo de salon no válido' });
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
        await Lounge.findByIdAndUpdate(loungeId, {
            dayReservation: new Date(diaReservacion),
            finalReservation: finalReservacionDate,
            price: precioTotal,
            availability: finalReservacionDate <= new Date(), // Actualiza availability si la fecha de finalización ha pasado
        });

        return res.status(200).json({ precioTotal });
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createLounge,
    readLounge,
    updateLounge,
    deleteLounge,
    updateStatusLounge
}













