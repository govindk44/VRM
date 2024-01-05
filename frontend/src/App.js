// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./PreLogin/Login";
import Register from "./PreLogin/Register";
import PreLoginLayout from "./PreLogin/PreLoginLayout";
import PostLoginLayout from "./PostLogin/PostLoginLayout";
import VehicleOwners from "./PostLogin/admin/VechicleOwners";
import AllUsers from "./PostLogin/admin/AllUsers";
import Vehicles from "./PostLogin/vehicleowner/Vehicles";
import VehicleBookings from "./PostLogin/vehicleowner/VehicleBookings";
import Home from "./PreLogin/Home";
import Mybooking from "./PostLogin/normaluser/Mybooking";
import AddEditVehicle from "./PostLogin/vehicleowner/AddEditVehicle";
import ChangePassword from "./PostLogin/admin/ChangePassword";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PreLoginLayout />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/nu/mybooking" element={<Mybooking/>}></Route>
            

          </Route>  
          <Route element={<PostLoginLayout />}>
            <Route path="/admin/vehicle-owner"element={<VehicleOwners />}></Route>
            <Route path="/admin/users" element={<AllUsers />}></Route>
            <Route path="/vo/vehicles" element={<Vehicles />}></Route>
            <Route path="/vo/vehicle-bookings" element={<VehicleBookings />}></Route>
            <Route path="/ad/addeditvehicle" element={<AddEditVehicle />}></Route>
            <Route path="/ad/ChangePassword" element={<ChangePassword />}></Route>
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
