'use strict'

const Hotel = require('../Model/hotel.model')
const fs = require('fs')
const path = require('path')

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

//----------------------------------------listado por pais-----------------------------------------------------------------

const readHotelCity = async (req, res) => {
    try {
      const pais = req.params.pais; // Cambiado para obtener el país desde la ruta
  
      // Si no se proporciona el parámetro del país, devuelve un error
      if (!pais) {
        return res.status(400).json({
          msg: 'Por favor, proporciona el parámetro del país en la ruta de la solicitud.',
        });
      }
  
      // Utiliza el método populate para obtener todos los datos de room y lounge asociados al hotel
      const hotels = await Hotel.find({ pais: pais });
  
      if (!hotels || hotels.length === 0) {
        return res.status(404).json({
          msg: `No hay hoteles disponibles en la lista para el país: ${pais}`,
        });
      } else {
        return res.status(200).json({
          msg: `Lista de hoteles en ${pais}`,
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

//----------------------------------------Funcion para agregar la imagen----------------------------------------------------
//? Funcion para agregar la imagen a l informacion de un hotel

const addImageHotel = async(req, res) =>  {
    try{
        const hotelId = req.body.hotelId;

        if(!hotelId) return 'El id del hotel es necesario'

        const alreadyImageHotel = await Hotel.findOne({_id: hotelId})

        let pathFile = './upload/hotels/';

        if(!req.files || !req.files.image || !req.files.image.type) return res.status(400).send({
            msg: 'No hay una imagen disponible'
        })
        
        const filePath = req.files.image.path;
        const fileSpit = filePath.split('\\');
        const fileName = fileSpit[fileSpit.length -1]

        const extension = fileName.split('\.')
        const fileExtension = extension[1]
        
        if(fileExtension == 'png' ||
        fileExtension == 'jpg' ||
        fileExtension == 'jpeg' ||
        fileExtension == 'gif'
        ){
            if(alreadyImageHotel.photo) fs.unlinkSync(pathFile + alreadyImageHotel.photo)

            //Actualizar al hotel
            const hotelUpdate = await Hotel.findOneAndUpdate(
                {_id: hotelId},
                {photo: fileName},
                {new: true})

            if(!hotelUpdate) return res.status(404).send({
                msg: 'No se encontro el hotel para actualizar'
            })

            console.log(hotelUpdate)

            return res.status(200).send({
                msg: 'Imagen agregada al hotel',
                hotelUpdate
            });
        }

        fs.unlinkSync(filePath);
        return res.status(404).send({
            msg: 'La extension no es admitida'
        })

    }catch(err){
        console.log(err)
    }
}

//-----------------------------------------------------List Image Hotel--------------------------------------------
//? Funcion para poder ver la imagen del hotel

const getImgeHotel = async(req, res) => {
    try{
        
        const hotelId = req.params.hotelId;

        if(!hotelId || hotelId == '') return res.status(400).send({
            msg: 'El id del producto es necesario'
        })

        const hotelFind = await Hotel.findOne({_id: hotelId})

        if(!hotelFind) return 'No se encontro el hotel'

        const fileName = hotelFind.photo;
        const pathFile = './upload/hotels/' + fileName;
        const image = fs.existsSync(pathFile);
        if(!image){
            return 'No se encontro image'
        }else{
            return res.status(200).sendFile(path.resolve(pathFile))
        }
        
        

    }catch(err){

        console.log(err)

    }
}

//-----------------------------------habitaciones por hotel ----------------------

const roomByHotel = async (req, res) => {
    try {
        const hotelId = req.body.hotelId

        const hotel = await Hotel.findById(hotelId).populate('room');

        if (!hotel) {
            throw new Error('Hotel no encontrado');
        }

        const habitaciones = hotel.room || []; // Si hotel.room es null, asigna un array vacío

        return res.status(200).json({
            habitaciones: habitaciones
        });

    } catch (error) {
        console.error(`Error al obtener las habitaciones: ${error.message}`);
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createHotel, 
    readHotel,
    updateHotel, 
    deleteHotel, 
    readHotelCity, 
    addImageHotel, 
    getImgeHotel, 
    roomByHotel    
}

