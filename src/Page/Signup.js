import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            alert(data.message || data.error);
        } catch (error) {
            alert("Failed to connect to the server.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Welcome Back</h2>
                <p className="signup-subtitle">Please login to your account</p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>

                    <div className="links-row">
                        <Link to="/forgot-password">Forgot Password?</Link>
                        <span> | </span>
                        <Link to="/register">Not registered? Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
