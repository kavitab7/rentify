import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Register from "./screens/SignIn&Up/Register";
import Login from "./screens/SignIn&Up/Login";
import Dashboard from "./screens/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import UpdateProperty from "./screens/Seller/UpdateProperty";
import PropertyDetails from "./screens/PropertyDetails";
import SellerRoute from "./components/Routes/SellerRoute";
import Properties from "./screens/Seller/Properties";
import './styles/home.css';
import './styles/loginOut.css';
import SellerDashboard from "./screens/Seller/SellerDashboard";
import CreateProperty from "./screens/Seller/CreateProperty";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:slug" element={<PropertyDetails />} />
        <Route path="/dashboard" element={< PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<SellerRoute />}>
          <Route path="seller" element={<SellerDashboard />}></Route>
          <Route path="seller/create-property" element={<CreateProperty />}></Route>
          <Route path="seller/properties" element={<Properties />}></Route>
          <Route path="seller/property/:slug" element={<UpdateProperty />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
