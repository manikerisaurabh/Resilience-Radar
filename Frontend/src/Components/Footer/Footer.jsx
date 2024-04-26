import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Resilience Radar</p>
        <p>Address: 123 Main Street, City, Country</p>
        <p>Email: contact@resilienceradar.com</p>
      </div>
    </footer>
  );
};

export default Footer;
