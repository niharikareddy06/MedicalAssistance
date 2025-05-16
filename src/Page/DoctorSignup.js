import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./DoctorSignup.css";
import Layout from "./Layout";

function DoctorSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialty: "",
    licenseNumber: "",
    yearsOfExperience: "",
    hospital: "",
    address: "",
    bio: "",
    profilePicture: null,
    licenseDocument: null,
    degreeDocument: null,
    identityDocument: null
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

 
  const validateStep = () => {
    let tempErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.fullName.trim()) {
        tempErrors.fullName = "Name is required";
        isValid = false;
      }
      
      if (!formData.email.trim()) {
        tempErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Email is invalid";
        isValid = false;
      }
      
      if (!formData.password) {
        tempErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 8) {
        tempErrors.password = "Password must be at least 8 characters";
        isValid = false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }
    
    else if (step === 2) {
      if (!formData.specialty) {
        tempErrors.specialty = "Specialty is required";
        isValid = false;
      }
      
      if (!formData.licenseNumber) {
        tempErrors.licenseNumber = "License number is required";
        isValid = false;
      }
      
      if (!formData.yearsOfExperience) {
        tempErrors.yearsOfExperience = "Years of experience is required";
        isValid = false;
      }
    }
    
    else if (step === 3) {
      if (!formData.licenseDocument) {
        tempErrors.licenseDocument = "License document is required";
        isValid = false;
      }
      
      if (!formData.degreeDocument) {
        tempErrors.degreeDocument = "Degree certificate is required";
        isValid = false;
      }
      
      if (!formData.identityDocument) {
        tempErrors.identityDocument = "Identity document is required";
        isValid = false;
      }
    }
    
    setErrors(tempErrors);
    return isValid;
  };

  
  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      
      console.log("Form submitted:", formData);
      alert("Your application has been submitted for verification. We'll contact you once your credentials are verified.");
      
    }
  };

  return (
    <Layout>
        <div className="doctor-signup-container">
      

      <div className="signup-content">
        <h1>Doctor Verification & Registration</h1>
        <p className="signup-intro">Join our network of verified healthcare professionals</p>
        
        <div className="progress-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Account</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Professional</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Verification</div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Review</div>
        </div>

        <form onSubmit={handleSubmit} className="doctor-form">
          {step === 1 && (
            <div className="form-step">
              <h2>Account Information</h2>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="error">{errors.fullName}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={handleNext} className="next-btn">Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>Professional Information</h2>
              
              <div className="form-group">
                <label htmlFor="specialty">Medical Specialty</label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                >
                  <option value="">Select Specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
                {errors.specialty && <p className="error">{errors.specialty}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="licenseNumber">Medical License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
                {errors.licenseNumber && <p className="error">{errors.licenseNumber}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of Experience</label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  min="0"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
                {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="hospital">Hospital/Clinic Affiliation</label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Professional Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={handleBack} className="back-btn">Back</button>
                <button type="button" onClick={handleNext} className="next-btn">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h2>Document Verification</h2>
              <p className="verification-note">Please upload the following documents for verification</p>
              
              <div className="form-group file-upload">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="form-group file-upload">
                <label htmlFor="licenseDocument">Medical License (PDF)*</label>
                <input
                  type="file"
                  id="licenseDocument"
                  name="licenseDocument"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                {errors.licenseDocument && <p className="error">{errors.licenseDocument}</p>}
              </div>
              
              <div className="form-group file-upload">
                <label htmlFor="degreeDocument">Medical Degree/Certificate (PDF)*</label>
                <input
                  type="file"
                  id="degreeDocument"
                  name="degreeDocument"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                {errors.degreeDocument && <p className="error">{errors.degreeDocument}</p>}
              </div>
              
              <div className="form-group file-upload">
                <label htmlFor="identityDocument">Identity Document (PDF)*</label>
                <input
                  type="file"
                  id="identityDocument"
                  name="identityDocument"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                {errors.identityDocument && <p className="error">{errors.identityDocument}</p>}
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={handleBack} className="back-btn">Back</button>
                <button type="button" onClick={handleNext} className="next-btn">Next</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <h2>Review & Submit</h2>
              <p className="verification-note">Please review your information before submitting</p>
              
              <div className="review-section">
                <h3>Account Information</h3>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </div>
              
              <div className="review-section">
                <h3>Professional Information</h3>
                <p><strong>Specialty:</strong> {formData.specialty}</p>
                <p><strong>License Number:</strong> {formData.licenseNumber}</p>
                <p><strong>Experience:</strong> {formData.yearsOfExperience} years</p>
                <p><strong>Hospital/Clinic:</strong> {formData.hospital || "Not specified"}</p>
              </div>
              
              <div className="review-section">
                <h3>Documents Uploaded</h3>
                <p><strong>Profile Picture:</strong> {formData.profilePicture ? "✓" : "✗"}</p>
                <p><strong>Medical License:</strong> {formData.licenseDocument ? "✓" : "✗"}</p>
                <p><strong>Medical Degree:</strong> {formData.degreeDocument ? "✓" : "✗"}</p>
                <p><strong>Identity Document:</strong> {formData.identityDocument ? "✓" : "✗"}</p>
              </div>
              
              <div className="verification-disclaimer">
                <h3>Verification Process</h3>
                <p>Once submitted, our team will verify your credentials within 2-3 business days. You'll receive an email notification once your account is approved.</p>
              </div>
              
              <div className="form-group">
                <label className="checkbox-container">
                  <input type="checkbox" required /> 
                  I certify that the information provided is accurate and complete
                </label>
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={handleBack} className="back-btn">Back</button>
                <button type="submit" className="submit-btn">Submit Application</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
    </Layout>
  );
}

export default DoctorSignup;