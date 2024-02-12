// import { useState } from 'react';
import { Link } from 'react-router-dom';
// import ReadHotel from './Components/User/readHotels/HotelCity';
// import LoginHotel from './Components/User/login/login';
// import './Home.css';

function Navbar() {

  return (
    <div>
      <div className='container'>
        <nav>
          <Link to="/" id='brand'>Gestor De Hoteles</Link>
          <ul className='navbar-menu'>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/hoteles">Hoteles</Link></li>
            <li><Link to="/habitaciones">Habitaciones</Link></li>
            <li><Link to="/eventos">Eventos</Link></li>
            <li><a href="/login">Iniciar Sesion</a></li>
          </ul>
        </nav>
      </div>
      <div/>
        
      </div>
      
  );
}

export default Navbar;

