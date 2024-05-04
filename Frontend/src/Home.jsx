// import { useState } from 'react';
import './Home.css';
import Navbar from '../src/Components/User/NavbarUser/navbarUser';
import imgHotel from './Components/User/img/img1.jpg';

function Home() {

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className='title'>
          ¿Quiénes somos?
          <div className='infoEmpresa'>
            Disfruta de la tranquilidad al reservar con nosotros. Nos dedicamos a hacer que tu experiencia de reserva sea sencilla y libre de complicaciones, para que puedas concentrarte en disfrutar de tu viaje.
          </div>
        </h1>
        <div className="row justify-content-center align-items-center">
          <div className='col-md-6'>
            <div className='card mx-2 my-2 text-center'>
              <div className="d-flex justify-content-center align-items-center flex-wrap card-container">
                <div className='polaroid'>
                  <img src={imgHotel} alt='Hotel' className='img-fluid' />
                  <div className='card-body'>
                    <p className='card-text'>Programa citas en linea</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card mx-2 my-2 text-center'>
              <div className='tamanio'>
                <div className='polaroid'>
                  <img src={imgHotel} alt='Hotel' className='img-fluid' />
                  <div className='card-body'>
                    <p className='card-text'>Reservaciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card mx-2 my-2 text-center'>
              <div className='tamanio'>
                <div className='polaroid'>
                  <img src={imgHotel} alt='Hotel' className='img-fluid' />
                  <div className='card-body'>
                    <p className='card-text'>Reservaciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
