
import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

const Layout = ({ children }) => (
  <>
    <header className="app-header">
      <h2 className="logo">MEDI-CARE</h2>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/chatbot">Chatbot</Link>
        <Link to="/signup">
          <button id="registration">Login/signup</button>
        </Link>
      </nav>
    </header>
    <main className="page-container">{children}</main>
  </>
);

export default Layout;
