import axios from 'axios';
import { useState, useEffect } from 'react';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showImageForm, setShowImageForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nameHotel: '',
    pais: '',
    ciudad: '',
    photo: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3010/api/read-hotel')
      .then((response) => {
        if (response.data && response.data.lista_hoteles) {
          setHotels(response.data.lista_hoteles);
        } else {
          console.log('La respuesta no contiene la propiedad "lista_hoteles".', response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateClick = (hotel) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      id: hotel._id,
      nameHotel: hotel.nameHotel,
      pais: hotel.pais,
      ciudad: hotel.ciudad,
      // photo field is not cleared when updating
    }));
    setShowImageForm(true);
    setSelectedHotel(hotel); // Set the selectedHotel for use in handleImageUpload
  };
  
  

  const handleImageUpload = async (event) => {
    if (!selectedHotel || !selectedHotel._id) {
      console.error('Selected hotel or hotel ID is null or undefined.');
      return;
    }
  
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.put(`http://localhost:3010/api/add-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          hotelId: selectedHotel._id
        }
      });
  
      console.log('Image uploaded successfully', response.data);
  
      // Reload hotels after image upload
      const updatedHotelsResponse = await axios.get('http://localhost:3010/api/read-hotel');
      if (updatedHotelsResponse.data && updatedHotelsResponse.data.lista_hoteles) {
        setHotels(updatedHotelsResponse.data.lista_hoteles);
      } else {
        console.log('La respuesta no contiene la propiedad "lista_hoteles".', updatedHotelsResponse.data);
      }
  
      setShowImageForm(false);
      setSelectedHotel(null);
    } catch (error) {
      console.log('Error uploading image', error);
    }
  };
  

  const handleDeleteClick = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:3010/api/delete-hotel`, { data: { hotelId } });
      setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== hotelId));
      console.log(`Hotel eliminado`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:3010/api/update-hotel', formData);
      console.log('Actualizado de forma correcta', response.data);
      setShowImageForm(false);

      const updatedHotelsResponse = await axios.get('http://localhost:3010/api/read-hotel');
      if (updatedHotelsResponse.data && updatedHotelsResponse.data.lista_hoteles) {
        setHotels(updatedHotelsResponse.data.lista_hoteles);
      } else {
        console.log('La respuesta no contiene la propiedad "lista_hoteles".', updatedHotelsResponse.data);
      }
      setSelectedHotel(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelarClick = () => {
    setSelectedHotel(null);
  };

  const isLabelVisible = (value) => (value === '' ? 'visible' : 'hidden');

  return (
    <div>
      <h2>Lista de Hoteles</h2>
      {hotels.length === 0 ? (
        <p>No hay hoteles disponibles en la lista</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              {hotel.photo ? (
                <img src={`http://localhost:3010/api/view-image/${hotel._id}`} alt="Hotel" />
              ) : (
                <div>
                  <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event)} />
                </div>
              )}
              <h3>{hotel.nameHotel}</h3>
              <p>Ciudad: {hotel.ciudad}</p>
              <p>País: {hotel.pais}</p>
              <button style={{ marginTop: 10 }} onClick={() => handleUpdateClick(hotel)} className="my-button">
                Editar
              </button>
              <button style={{ marginTop: 10 }} onClick={() => handleDeleteClick(hotel._id)} className="my-button">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      {showImageForm && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ visibility: isLabelVisible(formData.nameHotel) }}>
                Nombre del Hotel:
              </label>
              <input
                type="text"
                value={formData.nameHotel}
                onChange={(e) => setFormData({ ...formData, nameHotel: e.target.value })}
              />
            </div>
            <br />
            <div>
              <label style={{ visibility: isLabelVisible(formData.pais) }}>
                País:
                <input
                  type="text"
                  value={formData.pais}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                />
              </label>
            </div>
            <br />
            <div>
              <label style={{ visibility: isLabelVisible(formData.ciudad) }}>
                Ciudad:
              </label>
              <input
                type="text"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
              />
            </div>
            <br />
            <div>
              <label style={{ visibility: isLabelVisible(formData.photo) }}>
                Foto:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(event)}
              />
            </div>
            <br />
            <button type="submit">Actualizar Hotel</button>
            <button type="button" onClick={handleCancelarClick}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HotelList;