import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8000/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us today!</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" type="text" value={formData.name} onChange={handleChange} required />
          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        <div className="links-row">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
