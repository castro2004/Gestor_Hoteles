import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginHotel from '../../User/login/login';
import '../../../Home.css';
import CrearHotel from '../createHotels/CreateHotel';

const  NavbarAdmin= () => {
    const [showCreateHotel, setShowCreateHotel] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleCreateClick = () => {
        setShowCreateHotel(true);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    return (
        <div>
                <nav>
                    <Link to="/" id='brand'>Gestor De Hoteles</Link>
                    <ul className='navbar-menu'>
                        <li><Link to="/admin">Inicio</Link></li>
                        <li><a href="/create-hotel-admin" onClick={handleCreateClick}>Crear Hoteles</a></li>
                        <li><Link to="/create-habitaciones-admin">Crear Habitaciones</Link></li>
                        <li><Link to="/create-eventos-admin">Crear Eventos</Link></li>
                        <li><a href="/login" onClick={handleLoginClick}>Iniciar Sesion</a></li>
                    </ul>
                </nav>
            <div>
                <h1 className='title'>¿Quiénes somos?
                    <div className='infoEmpresa'>
                    Disfruta de la tranquilidad al reservar con nosotros. Nos dedicamos a hacer que tu experiencia de reserva sea sencilla y libre de complicaciones, para que puedas concentrarte en disfrutar de tu viaje.
                    </div>
                    {showCreateHotel && <CrearHotel/>}
                    {showLogin && <LoginHotel/>}
                </h1>
            </div>
            
        </div>
    );
}

export default NavbarAdmin;

