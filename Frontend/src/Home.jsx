// import { useState } from 'react';
import './Home.css';
import Navbar from '../src/Components/User/NavbarUser/navbarUser'

function Home() {

  return (
    <div>
      <Navbar/>
      <div>
        <h1 className='title'>¿Quiénes somos?
        <div className='infoEmpresa'>
          Disfruta de la tranquilidad al reservar con nosotros. Nos dedicamos a hacer que tu experiencia de reserva sea sencilla y libre de complicaciones, para que puedas concentrarte en disfrutar de tu viaje.
          </div>
          {/* <ReadHotel />
          {showLogin && <LoginHotel/>} */}
          </h1>
        
      </div>
      
    </div>
  );
}

export default Home;

