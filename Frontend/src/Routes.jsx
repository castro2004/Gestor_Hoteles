import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginHotel from './Components/User/login/login';
import HotelForm from './Components/Admin/createHotels/CreateHotel';

import HotelList from './Components/Admin/readHotelsAdmin/read-hotels-admin';
import NavbarAdmin from './Components/Admin/NavbarAdmin/HomeAdmin';
import HotelListUser from './Components/User/readHotels/HotelCity';
import Home from './Home';
// import RoomByHotel from './Components/Admin/readRoomByHotel/readByRoom';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginHotel />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-hotel-admin" element={<HotelForm />} />
        <Route path='/admin' element={<NavbarAdmin />} />
        <Route path='/list-hotels' element={<HotelList/>}/>
        <Route path='/hoteles' element={<HotelListUser/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
