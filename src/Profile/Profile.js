import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

function PatientProfile() {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    appointmentDate: '',
    conditions: '',
  });
  const [photo, setPhoto] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Load profile from backend
    axios.get('http://localhost:8000/profile')
      .then(res => {
        setProfile(res.data.profile);
        setDataLoaded(true);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => formData.append(key, value));
    if (photo) formData.append('photo', photo);

    await axios.post('http://localhost:8000/profile', formData);
    alert('Profile updated successfully');
  };

  return (
    <div className="profile-container">
      <h2>Patient Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input name="name" value={profile.name} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="age" value={profile.age} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" value={profile.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <label>Phone</label>
        <input name="phone" value={profile.phone} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" type="email" value={profile.email} onChange={handleChange} required />

        <label>Address</label>
        <input name="address" value={profile.address} onChange={handleChange} required />

        <label>Next Appointment</label>
        <input type="date" name="appointmentDate" value={profile.appointmentDate} onChange={handleChange} />

        <label>Health Conditions</label>
        <textarea name="conditions" value={profile.conditions} onChange={handleChange} />

        <label>Profile Photo</label>
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Save</button>
      </form>

      {dataLoaded && profile.photo_url && (
        <div className="photo-preview">
          <h3>Uploaded Photo:</h3>
          <img src={`http://localhost:8000${profile.photo_url}`} alt="Patient" />
        </div>
      )}
    </div>
  );
}

export default PatientProfile;
