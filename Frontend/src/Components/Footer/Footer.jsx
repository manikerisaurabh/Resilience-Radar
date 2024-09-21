import React, { useEffect } from "react";
import "./Footer.css";

const Footer = ({noQueries, logged}) => {
  useEffect(() => {
    console.log(noQueries);
  }, [noQueries])
  return (
    <footer className={(noQueries && logged) ? `footer absolute bottom-0 w-full` : "footer w-full"}>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Resilience Radar</p>
        <p>Address: 123 Main Street, City, Country</p>
        <p>Email: contact@resilienceradar.com</p>
      </div>
    </footer>
  );
};

export default Footer;
