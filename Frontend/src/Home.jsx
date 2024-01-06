import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReadHotel from './Components/User/readHotels/HotelCity';
import LoginHotel from './Components/User/login/login';
import './Home.css';

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

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
            <li><a href="/login" onClick={handleLoginClick}>Iniciar Sesion</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <h1 className='title'>¿Quiénes somos?
        <div className='infoEmpresa'>
          Disfruta de la tranquilidad al reservar con nosotros. Nos dedicamos a hacer que tu experiencia de reserva sea sencilla y libre de complicaciones, para que puedas concentrarte en disfrutar de tu viaje.
          </div>
          <ReadHotel />
          {showLogin && <LoginHotel/>}
          </h1>
        
      </div>
      
    </div>
  );
}

export default Navbar;

