import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginHotel from './Components/User/login/login';
import Navbar from './Home';
import HotelForm from './Components/Admin/createHotels/CreateHotel';
import NavbarAdmin from './HomeAdmin';
import HotelList from './Components/Admin/readHotelsAdmin/read-hotels-admin';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginHotel />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/create-hotel-admin" element={<HotelForm />} />
        <Route path='/admin' element={<NavbarAdmin />} />
        <Route path='/list-hotels' element={<HotelList/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
