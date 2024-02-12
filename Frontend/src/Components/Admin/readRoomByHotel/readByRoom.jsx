// // Importa los módulos necesarios de React
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// // Componente funcional que obtiene las habitaciones de un hotel
// const RoomByHotel = ({ match }) => {

//     const {id} = useParams()

//     // Extrae el ID del hotel de los parámetros de la URL
//     const hotelId = id;

//     // Estado para almacenar las habitaciones del hotel
//     const [habitaciones, setHabitaciones] = useState([]);

//     // Función para obtener las habitaciones al cargar el componente
//     useEffect(() => {
//         // Llamada a la API para obtener las habitaciones del hotel
//         const fetchHabitaciones = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3010/api/view-room-hotel', { hotelId });
//                 setHabitaciones(response.data.habitaciones);
//             } catch (error) {
//                 console.error(`Error al obtener las habitaciones: ${error.message}`);
//             }
//         };

//         // Llama a la función para obtener las habitaciones
//         fetchHabitaciones();
//     }, [hotelId]); // El segundo parámetro asegura que se ejecute cuando cambie el ID del hotel

//     // Renderiza las habitaciones obtenidas
//     return (
//         <div>
//             <h2>Habitaciones del Hotel</h2>
//             <ul>
//                 {habitaciones.map(habitacion => (
//                     <li key={habitacion._id}>{habitacion.nombreHabitacion}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// // Exporta el componente
// export default RoomByHotel;
