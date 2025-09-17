import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Weddings from "./pages/Weddings";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
// import Register from "./pages/Register";
// import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar on all pages */}
        <Navbar />

        {/* Main content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/weddings" element={<Weddings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            {/*Register and Login routes */}
            {/* <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> */}
          </Routes>
        </div>

        {/* Footer on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
