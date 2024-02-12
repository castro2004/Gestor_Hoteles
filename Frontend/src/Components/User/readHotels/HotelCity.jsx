import { useState, useEffect } from 'react';
import axios from 'axios';

import './ReadHotel.css';
import Navbar from '../NavbarUser/navbarUser';


const HotelList = () => {
  const [hotels, setHotels] = useState([]);

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

  return (
    <div className='body_list_hotel_user'>
      <Navbar/>
      <div className='container-margin'>
      <h2>Lista de Hoteles</h2>
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
