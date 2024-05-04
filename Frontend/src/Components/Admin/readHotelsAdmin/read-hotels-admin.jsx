import { useState, useEffect } from 'react';
import axios from 'axios';
import './read-hotels-admin.css';
import NavbarAdmin from '../../Admin/NavbarAdmin/HomeAdmin';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [showImageForm, setShowImageForm] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [hotelToDelete, setHotelDeleteId] = useState(null)
  const [hotelData, setHotelData] = useState({
    id: "",
    nameHotel: "",
    ciudad: "", 
    pais: "",
    photo: "",
    room: [],
    lounge: [],
  });

  const handleDeleteClick = (hotelId) => {
    setHotelDeleteId(hotelId)
  }
  
  const confirmDelete = async() => {
    if (hotelToDelete) {
      try {
        const response = await axios.delete('http://localhost:3010/api/delete-hotel', { data: { hotelId: hotelToDelete } });
        console.log('Hotel eliminado', response);

        // Actualizar la lista de hoteles después de la eliminación
        const updatedHotels = await axios.get('http://localhost:3010/api/read-hotel');
        setHotels(updatedHotels.data.hotels);
      } catch (error) {
        console.log(error);
      }
    }
    setHotelDeleteId(null);
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:3010/api/update-hotel", hotelData);
      console.log(response.data);
      setShowImageForm(false);

      axios.get('http://localhost:3010/api/read-hotel')
        .then((response) => {
          setHotels(response.data.hotels);
        })
        .catch((error) => {
          console.log('Error al obtener lista de hoteles: ', error);
        });

    } catch (error) {
      console.log(error);
    }
  }

  const handleCancelarClick = () => {
    setShowImageForm(false);
  }

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/read-hotel');
        setHotels(response.data.lista_hoteles);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleUpdateHotelImage = async (hotelId) => {
    // Al hacer clic en "Editar Imagen", mostrar el formulario de carga de imagen
    setShowEditForm(false); // Agregar esta línea para ocultar el formulario de edición al hacer clic en "Editar Imagen"
    setShowImageForm(true);
    setHotelData({
      ...hotelData,
      id: hotelId,
    });
  };

  const handleImageChange = (e) => {
    // Manejar cambios en el input de tipo file para seleccionar una imagen
    setSelectedImageFile(e.target.files[0]);
  };

  const handleUpdateImageSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('hotelId', hotelData.id);
      formData.append('image', selectedImageFile);

      await axios.put('http://localhost:3010/api/add-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Actualizar la lista de hoteles después de cambiar la imagen
      const updatedHotels = await axios.get('http://localhost:3010/api/read-hotel');
      setHotels(updatedHotels.data.lista_hoteles);

      // Ocultar el formulario de carga de imagen después de la actualización
      setShowImageForm(false);
    } catch (error) {
      console.error('Error updating hotel image:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Actualiza solo el campo modificado manteniendo los valores anteriores de los otros campos
    setHotelData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (
    <div>
      <NavbarAdmin />
      <div className='body_list_hotel_user'>
        <h4>Hoteles Disponibles</h4>
        <div className='hotel_list'>
          {hotels.map((hotel) => (
            <div key={hotel._id} className='carta_read_hotel'>
              <div>
                {hotel.photo ? (
                  <img src={`http://localhost:3010/api/view-image/${hotel._id}`} alt={hotel.nameHotel} />
                ) : (
                  <div>
                    {/* Para completar if */}
                  </div>
                )}
                <div className='container'>
                  <h3>{hotel.nameHotel}</h3>
                  <p className='title_relleno'>Ciudad: {hotel.ciudad}</p>
                  <p className='title_relleno'>País: {hotel.pais}</p>
                  <button onClick={() => handleUpdateHotelImage(hotel._id)}>Editar</button>
                  <button style={{marginTop: 10}} onClick={() => handleDeleteClick(hotel._id)} className='my-button'>Eliminar</button>
                  {/* <button onClick={() (hotel)}>Editar</button> */}
                  <button type='button' style={{ color: 'black' }} onClick={handleCancelarClick} className='my-button'>Cancelar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
          {showImageForm && (
            <div>
              <form onSubmit={handleUpdateImageSubmit}>
                <div>
                  <label>Seleccionar Imagen</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </div>
                    <form onSubmit={handleSubmit}>
                      <div>
                        {/* Input fields for updating hotel data */}
                        <input type="text" name='id' value={hotelData.id} onChange={handleInputChange} placeholder='ID del hotel'/>
                        <input type="text" name='nameHotel' value={hotelData.nameHotel} onChange={handleInputChange} placeholder='Nombre del Hotel'/>
                        <input type="text" name='pais' value={hotelData.pais} onChange={handleInputChange} placeholder='Pais'/>
                        <input type="text" name='ciudad' value={hotelData.ciudad} onChange={handleInputChange} placeholder='Ciudad'/>
                        <input type="text" name='photo' value={hotelData.photo} onChange={handleInputChange} placeholder='Foto'/>
                      </div>
                    </form>
                      <button className="button-update" onClick={handleSubmit}>
                        Actualizar Hotel
                      </button>
                      <button className="button-update" type="submit">
                        Actualizar Imagen
                      </button>
                      <button className="button-cancel" type="button" onClick={handleCancelarClick}>
                        Cancelar
                      </button>
              </form>
            </div>
          )}
          {hotelToDelete && (
            <div>
              <p>¿Estás seguro de que deseas eliminar este hotel?</p>
              <button onClick={confirmDelete} style={{color: 'black',fontSize: 50} } className='my-button'>Sí, eliminar</button>
                <button onClick={() => setHotelDeleteId(null)} style={{color: 'black',fontSize: 50} } className='my-button'>Cancelar</button>
              </div>
          )}
      </div>
    </div>
  );
}

export default HotelList;