import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Components/Footer";
import Nav from "./Components/Navbar";

import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Homepage from "./Pages/Homepage";
import UserDashboard from "./Pages/UserDashboard";
import AddListings from "./Components/AddListings";
import ViewListings from "./Components/ViewListings";
import AboutUs from "./Pages/About";
import Features from "./Pages/Features";
import faq from "./Pages/faq";

export default function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (

    <div className="bg-background text-text">
        {!isDashboardRoute && <Nav />}

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="about" element ={<AboutUs/>} />
          <Route path="features" element = {<Features/>}/>
          <Route path="faq" element = {<faq/>}/>

          {/* Nested routes for UserDashboard */}
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route path="addlistings" element={<AddListings />} />
            <Route path="viewlistings" element={<ViewListings />} />
            
            {/* You can add a default route for the dashboard here if needed */}
            <Route index element={<ViewListings />} /> {/* Change to your desired default component */}
          </Route>
        </Routes>

        <Footer />
      </div>
  );
}
