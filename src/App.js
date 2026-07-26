import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FlightResults from "./pages/FlightResults";
// import cabResults from "./pages/cabResults";

import BusResults from "./pages/BusResults";
import TrainResults from "./pages/TrainResults";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import CabResults from "./pages/cabResults";
import TrainBooking from "./pages/Booking";
import CabBooking from "./pages/cabBooking";
import MyBookings from "./pages/myBookings";
import FlightBooking from "./pages/FlightBooking";
import BusBooking from "./pages/BusBooking";



import AdminLogin from "./components/ADMIN/AdminLogin";
import AdminRegister from "./components/ADMIN/AdminRegister"
import Dashboard from "./components/ADMIN/Dashboard";
import Trains from "./components/ADMIN/Train manager/Trains";
import AddTrains from "./components/ADMIN/Train manager/addTrains";
import EditTrains from "./components/ADMIN/Train manager/editTrains";

import Cabs from "./components/ADMIN/cab manager/cabs";
import AddCab from "./components/ADMIN/cab manager/addCabs";
import EditCabs from "./components/ADMIN/cab manager/editCabs";
import ViewCab from "./components/ADMIN/cab manager/viewcab";

import Flights from "./components/ADMIN/Flight/flightDeatils";
import AddFlightData from "./components/ADMIN/Flight/AddFlightData";
import EditFlightData from "./components/ADMIN/Flight/EditFlightData";
import ViewFlightData from "./components/ADMIN/Flight/ViewFlightData";

import Buses from "./components/ADMIN/Bus/BusDeatil";
import AddBus from "./components/ADMIN/Bus/AddbusData";
import EditBus from "./components/ADMIN/Bus/EditBusData";
import ViewBus from "./components/ADMIN/Bus/ViewBusData";

import TrainView from "./components/ADMIN/Train manager/viewTrain";


import TrainBookings from "./components/ADMIN/Train manager/booking";
import CabBookings from "./components/ADMIN/cab manager/cabBooking";

import CompanyProfile from "./components/ADMIN/myProfile";
import SuperAdminDashboard from "./components/SUPERADMIN/superadmindashboard";
import Users from "./components/SUPERADMIN/users";
import Sellers from "./components/SUPERADMIN/seller";



import SuperAdminTrainBookings from "./components/SUPERADMIN/trainbookings";
import SuperAdminCabBookings from "./components/SUPERADMIN/cabbookings";
import SuperAdminFlightBookings from "./components/SUPERADMIN/flightbookimgs";
import SuperAdminBusBookings from "./components/SUPERADMIN/busbookings";
import SuperAdminProfile from "./components/SUPERADMIN/myProfile";
import SuperAdminLogin from "./components/SUPERADMIN/superadminlogin";
import ContactUs from "./components/Contactus";
import MyProfile from "./components/UserProfile";
import DestinationManager from "./components/SUPERADMIN/sliderManager.jsx/viewSlider";
import AddSlider from "./components/SUPERADMIN/sliderManager.jsx/addslider";
import UpdateSlider from "./components/SUPERADMIN/sliderManager.jsx/updateSlider";
import FlightBookings from "./components/ADMIN/Flight/flightBooking";
import BusBookings from "./components/ADMIN/Bus/busBooking";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userprofile" element={<MyProfile />} />

        <Route path="/flights" element={<FlightResults />} />
        {/* <Route path="/cabs" element={<cabResults />} /> */}
        <Route path="/cabs" element={<CabResults />} />
        <Route path="/buses" element={<BusResults />} />
        <Route path="/trains" element={<TrainResults />} />
        <Route path="/train-booking" element={<TrainBooking />} />
          <Route path="/cab-booking" element={<CabBooking />} />

        <Route path="/my-booking" element={<MyBookings />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/contact-us" element={<ContactUs />} />
        <Route
  path="/Flightbooking"
  element={<FlightBooking />}
/>
        <Route
  path="/Busbooking"
  element={<BusBooking />}
/>







  <Route path='/admin' element={<AdminLogin/>} ></Route>
  <Route path='/admin/register' element={<AdminRegister/>} ></Route>


        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/Trains" element={<Trains />} />
        <Route exact path="/admin/add-customer" element={<AddTrains />} />
        <Route exact path="/admin/edit-trains" element={<EditTrains />} />
         <Route exact path="/admin/cabs" element={<Cabs />} />
         <Route exact path="/admin/add-cabs" element={<AddCab />} />
        {/* <Route exact path="/admin/edit-cabs" element={<EditTrains />} /> */}
         <Route exact path="/admin/myProfile" element={<CompanyProfile />} />
          <Route exact path="/admin/editCabs" element={<EditCabs />} />



           <Route exact path="/admin/flight" element={<Flights />} />
        <Route exact path="/admin/add-flight" element={<AddFlightData />} />
        <Route exact path="/admin/edit-flight/:id" element={<EditFlightData />} />
        <Route exact path="/admin/view-flight/:id" element={<ViewFlightData />} />

        <Route exact path="/admin/bus" element={<Buses />} />
        <Route exact path="/admin/add-bus" element={<AddBus />} />
        <Route exact path="/admin/edit-bus/:id" element={<EditBus />} />
        <Route exact path="/admin/view-bus/:id" element={<ViewBus />} />
      <Route exact path="/admin/train-view/:id" element={<TrainView />} />
      <Route exact path="/admin/cab-view/:id" element={<ViewCab />} />
       <Route exact path="/admin/train-bookings" element={<TrainBookings />} />
<Route path="/admin/cab-bookings" element={<CabBookings/>} />


<Route path="/superadmin/dashboard" element={<SuperAdminDashboard/>} />
<Route path="/superadmin/users" element={<Users/>} />
<Route path="/superadmin/sellers" element={<Sellers/>} />
<Route path="/superadmin/cab-bookings" element={<SuperAdminCabBookings />} />
<Route path="/superadmin/train-bookings" element={<SuperAdminTrainBookings />} />
<Route path="/superadmin/flight-bookings" element={<SuperAdminFlightBookings />} />
<Route path="/superadmin/bus-bookings" element={<SuperAdminBusBookings />} />
<Route path="/superadmin/my-profile" element={< SuperAdminProfile/>} />
<Route path="/superadmin/login" element={< SuperAdminLogin/>} />
          <Route
  path="/superadmin/sliders"
  element={<DestinationManager/>}
/>
          <Route
  path="/superadmin/add-sliders"
  element={<AddSlider/>}
/>
 <Route
  path="/superadmin/update-sliders/:id"
  element={<UpdateSlider />}
/>

 <Route
  path="/admin/bus-booking"
  element={<BusBookings/>}
/>
<Route
  path="/admin/Flight-booking"
  element={< FlightBookings/>}
/>

        <Route path="*" element={<div className="d-flex justify-content-center align-items-center vh-100"><h1>404 - Not Found</h1></div>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
