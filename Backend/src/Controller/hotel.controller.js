'use strict'

const Hotel = require('../Model/hotel.model')

//---------------------------------------------------Create Hotel--------------------------------------------

const createHotel = async(req, res) => {
    try{

        const hotel = new Hotel(req.body)
        const hoteles = await hotel.save();

        if(!hoteles){
            return 'No se logro crear el hotel'
        }else{
            return res.status(404).json({
                msg: 'Hotel creado correctamente',
                hotel: hotel
            })
        }

    }catch(err){
        console.log(err)
    }
}

//------------------------------------------------------read hotel-------------------------------------------------------------

const readHotel = async (req, res) => {
    try {
        // Utiliza el método populate para obtener todos los datos de room y lounge asociados al hotel
        const hotels = await Hotel.find().populate('room').populate('lounge');

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({
                msg: 'No hay hoteles disponibles en la lista',
            });
        } else {
            return res.status(200).json({
                msg: 'Lista de hoteles',
                lista_hoteles: hotels,
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};


//---------------------------------------------update hotel---------------------------------------

const updateHotel = async(req, res) =>{
    try{
        const updateData = req.body;

        if(!updateData){
            return 'El Id de del hotel no es correcto'
        }

        const updateHotel = await Hotel.findByIdAndUpdate(updateData.id, updateData, {new: true})

        if(!updateData){
            return 'No se logro actualizar el hotel'
        }else{
            return res.status(200).json({
                updateHotel
            })
        }
    }catch(err){
        console.log(err)
    }
}

//------------------------------------------delete hotel------------------------------------------------------------------------

const deleteHotel = async(req, res) => {
    try{
        const id = req.body.id;

        let hotelDelete = await Hotel.findByIdAndDelete({_id: id})

        console.log(hotelDelete)

        if(hotelDelete){
            return 'No se encontro el hotel a eliminar'
        }else{
            return res.status(200).json({
                msg: "Hotel eliminado: ",
                hotel_eliminado: hotelDelete
                
            })

        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createHotel, readHotel, updateHotel, deleteHotel
}


















