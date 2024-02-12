import { useState } from 'react';
import axios from 'axios';
import './CreateHotel.css'; 
import NavbarAdmin from '../NavbarAdmin/HomeAdmin';

const CrearHotel = () => {
  const [nombreHotel, setNombreHotel] = useState('');
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');

  const handleCrearHotel = async () => {
    try {
      const response = await axios.post('http://localhost:3010/api/create-hotel', {
        nameHotel: nombreHotel,
        pais: pais,
        ciudad: ciudad,
      });

      console.log(response.data.msg); // Mensaje de la respuesta del servidor
      console.log(response.data.hotel); // Datos del hotel creado
    } catch (error) {
      console.error('Error al crear el hotel:', error);
    }
  };

  return (
    <div>
      <NavbarAdmin/>
      <h1>Crear Hotel</h1>
      <label>Nombre del Hotel:</label>
      <input type="text" value={nombreHotel} onChange={(e) => setNombreHotel(e.target.value)} />

      <label>País:</label>
      <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} />

      <label>Ciudad:</label>
      <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />

      <div className='button-container'>
        <button onClick={handleCrearHotel}>Crear Hotel</button>
        <button><a href="/list-hotels">Ver Hoteles</a></button>
      </div>
    </div>
  );
};

export default CrearHotel;
