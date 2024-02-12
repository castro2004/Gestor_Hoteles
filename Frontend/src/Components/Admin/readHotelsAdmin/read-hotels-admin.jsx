import { useState, useEffect } from 'react';
import axios from 'axios';
import './read-hotels-admin.css';
import NavbarAdmin from '../../Admin/NavbarAdmin/HomeAdmin'; // Reemplaza con la ruta correcta

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

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
    try {
      const formData = new FormData();
      formData.append('hotelId', hotelId);
      formData.append('image', selectedImageFile);

      await axios.put('http://localhost:3010/api/add-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedHotels = await axios.get('http://localhost:3010/api/read-hotel');
      setHotels(updatedHotels.data.lista_hoteles);
    } catch (error) {
      console.error('Error updating hotel image:', error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImageFile(event.target.files[0]);
  };

  return (
    <div>
      {/* Agrega el NavbarAdmin aquí */}
      <NavbarAdmin />

      <div className='body_list_hotel_user'>
        <h4>Hoteles Disponibles:</h4>
        <div className="hotel-list">
          {hotels.length === 0 ? (
            <p>No hay hoteles disponibles en la lista</p>
          ) : (
            <div className="hotel-list">
              {hotels.map((hotel) => (
                <div key={hotel._id} className="carta_read_hotel">
                  <img src={`http://localhost:3010/api/view-image/${hotel._id}`} alt={hotel.nameHotel} />
                  <div className="container">
                    <h3>{hotel.nameHotel}</h3>
                    <p className='title_relleno'>Ciudad: {hotel.ciudad}</p>
                    <p className='title_relleno'>País: {hotel.pais}</p>
                    <input type="file" onChange={handleImageChange} />
              <button onClick={() => handleUpdateHotelImage(hotel._id)}>
                Editar Imagen
              </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelList;
