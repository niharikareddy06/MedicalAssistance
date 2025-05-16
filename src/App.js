import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Chatbot from "./Page/Chatbot";
import Signup from "./Page/Signup";
import DoctorConnect from "./Page/Doctorconnect";
import DoctorSignup from "./Page/DoctorSignup";
import Register from './Page/Register';
import PatientProfile from "./Profile/Profile";

function Home() {
  return (
    <>
      <header className="app-header">
        <h2 className="logo">MEDI-CARE</h2>
        <nav className="nav-links">
          <Link to="/chatbot">Chatbot</Link>
          <Link to="/signup">
            <button id="registration">Login/signup</button>
          </Link>
          <Link to="/profile" className="profile-icon" title="Patient Profile">
            <img
              src="https://ui-avatars.com/api/?name=Patient&background=0D8ABC&color=fff"
              alt="Profile"
              className="profile-avatar"
            />
            </Link>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Medi-Care</h1>
          <p>Your trusted healthcare assistant.</p>
          <Link to="/connect">
            <button id="connection">Connect</button>
          </Link>
          
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/connect" element={<DoctorConnect />} />
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/profile" element={<PatientProfile />} />
      </Routes>
    </Router>
  );
}

export default App;