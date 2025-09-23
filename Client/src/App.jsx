import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AllRoom from './pages/AllRoom';
import Footer from './components/Footer';
import RoomDetails from './pages/RoomDetails';
import MyBooking from './pages/MyBooking';
import HotelReg from './components/HotelReg';
import Layout from './pages/hostOwner/Layout';
import Dashboard from './pages/hostOwner/Dashboard';
import AddRoom from './pages/hostOwner/Addroom';
import ListRoom from './pages/hostOwner/ListRoom';


const App = () => {
  const isOwnerPath=useLocation().pathname.includes("owner");
  return (
    <div>
      { !isOwnerPath && <Navbar/>}
      { false && <HotelReg/>}
      <div className='min-h[70vh]'>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/rooms' element={<AllRoom/>}/>
           <Route path='/rooms/:id' element={<RoomDetails/>}/>
           <Route path='/my-booking' element={<MyBooking/>}/>
           <Route path='/owner'element={<Layout/>}>
              <Route index element={<Dashboard/>}/>
              <Route path='add-room' element={<AddRoom/>}/>
              <Route path='list-room' element={<ListRoom/>}/>
           </Route>
        </Routes>
      </div>
        <Footer/>
    </div>
    
  )
}

export default App