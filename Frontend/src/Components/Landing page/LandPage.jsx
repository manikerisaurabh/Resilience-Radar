import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="title"><b><u>Residential - Radar</u></b></h1>
        <p className="subtitle">
        Welcome to the Community Challenge Platform, a dynamic website designed to address various social challenges faced by our community.
      </p>
      <div className="features">
        <div className="feature">
          <h3>Be part of the solution</h3>
          <p>Contribute to a thriving community by reporting and mapping community challenges.</p>
        </div>
        <div className="feature">
          <h3>Shine a light on issues</h3>
          <p>Report and map community challenges to raise awareness and prioritize solutions.</p>
        </div>
        <div className="feature">
          <h3>Strength in numbers</h3>
          <p>See what concerns your neighbors share and join forces to advocate for change.</p>
        </div>
        <div className="feature">
          <h3>Awareness Raising</h3>
          <p>Contribute to a thriving community by reporting and mapping community challenges.</p>
        </div>
        <div className="feature">
          <h3>Data-driven decisions</h3>
          <p>Our platform leverages resident reports, open-source data, and expert insights to create a comprehensive picture of community needs.</p>
        </div>
        <div className="feature">
          <h3>Be part of the solution</h3>
          <p>This platform is a powerful tool to build a stronger, more informed community</p>
        </div>
        <div className="feature">
          <h3>Be part of the solution</h3>
          <p>Valuable Resource for Authorities</p>
        </div>
      </div>
        </div>
        <div className="get-involved">
          <h2>Get Involved</h2>
          <div className='get div b'>
          <p className='get div'>Report a Challenge</p>
          <p className='get div'>Stay Informed</p>
          <p className='get div'>Spread the Word</p>
        </div>
          
        </div>
      </div>
  );
};

export default LandingPage;