import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DoctorConnect.css";
import Layout from "./Layout";
function Doctorconnect() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock data 
  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        experience: "12 years",
        rating: 4.8,
        available: true,
        verified: true,
        image: "/api/placeholder/100/100"
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Dermatology",
        experience: "8 years",
        rating: 4.7,
        available: true,
        verified: true,
        image: "/api/placeholder/100/100"
      },
      {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrics",
        experience: "15 years",
        rating: 4.9,
        available: false,
        verified: true,
        image: "/api/placeholder/100/100"
      },
      {
        id: 4,
        name: "Dr. David Wilson",
        specialty: "Neurology",
        experience: "10 years",
        rating: 4.6,
        available: true,
        verified: true,
        image: "/api/placeholder/100/100"
      },
      {
        id: 5,
        name: "Dr. Amanda Taylor",
        specialty: "Gynecology",
        experience: "14 years",
        rating: 4.8,
        available: true,
        verified: true,
        image: "/api/placeholder/100/100"
      }
    ];
    
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  
  useEffect(() => {
    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (specialty === "" || doctor.specialty === specialty)
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, specialty, doctors]);

  
  const handleConsult = (doctorId) => {
    if (!isLoggedIn) {
      alert("Please log in to schedule a consultation");
      return;
    }
    
    
    alert(`Consultation request sent to doctor #${doctorId}`);
  };

  return (
    <Layout>
    <div className="doctor-connect-container">
      
        <section className="connect-hero">
        <h1>Connect with Verified Doctors</h1>
        <p>Find and consult with certified healthcare professionals</p>
      </section>

      <section className="search-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search doctors by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="specialty-filter">
          <select 
            value={specialty} 
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Neurology">Neurology</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
        </div>
      </section>

      <section className="doctors-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-img">
                <img src={doctor.image} alt={doctor.name} />
                {doctor.verified && <span className="verified-badge">✓</span>}
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <p>Experience: {doctor.experience}</p>
                <div className="doctor-rating">
                  Rating: {doctor.rating} ★
                </div>
              </div>
              <div className="doctor-actions">
                <span className={`availability ${doctor.available ? 'available' : 'unavailable'}`}>
                  {doctor.available ? 'Available Now' : 'Unavailable'}
                </span>
                <button 
                  className="consult-btn"
                  disabled={!doctor.available}
                  onClick={() => handleConsult(doctor.id)}
                >
                  Consult
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No doctors match your search criteria.</p>
          </div>
        )}
      </section>

      <section className="become-doctor">
        <div className="become-doctor-content">
          <h2>Are you a healthcare professional?</h2>
          <p>Join our network of verified doctors and connect with patients.</p>
          <Link to="/doctor-signup">
            <button className="doctor-signup-btn">Apply as a Doctor</button>
          </Link>
        </div>
      </section>
      

      
    </div>
    </Layout>
  );
}

export default Doctorconnect;