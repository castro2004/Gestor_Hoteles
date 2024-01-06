// ReadHotel.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './ReadHotel.css';

const ReadHotel = () => {
  const [pais, setPais] = useState('');
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  const handlePaisChange = (e) => {
    setPais(e.target.value);
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get(`http://localhost:3010/api/hoteles/${pais}`);
      setHotels(response.data.lista_hoteles);
      setError(null);
    } catch (err) {
      setError('Error al obtener la lista de hoteles');
    }
  };

  useEffect(() => {
    if (pais) {
      fetchHotels();
    }
  }, [pais]);

  return (
    <div className="read-hotel-container">
      <label htmlFor="pais">Selecciona un país:</label>
      <select id="pais" onChange={handlePaisChange} value={pais}>
        <option value="">Selecciona...</option>
        <option value="España">España</option>
        <option value="Francia">Francia</option>
        <option value="Reino Unido">Reino Unido</option>
      </select>

      {error && <p className="error-message">{error}</p>}

      {hotels && hotels.length > 0 && (
        <div>
          <h2>Lista de hoteles en {pais}:</h2>
          <ul>
            {hotels.map((hotel) => (
              <li key={hotel._id}>
                <div className='read-hotel-container'>
                {/* <div className='hotel-container'> */}
                  <strong>Nombre del Hotel:</strong> {hotel.nameHotel}<br />
                  <strong>Ciudad:</strong> {hotel.ciudad}<br />
                  <strong>País:</strong> {hotel.pais}<br />
                  <strong>Habitación:</strong> {hotel.room}<br />
                  <strong>Sala de estar:</strong> {hotel.lounge}<br />
                {/* </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReadHotel;

