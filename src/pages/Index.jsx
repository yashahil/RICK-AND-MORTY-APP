import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css';

const Index = () => {
  return (
    <div className="index-container">
      <h1>Rick & Morty Universe</h1>
      <p>Explore the characters, locations, and episodes from the Rick & Morty series.</p>

      <div className="navigation-grid">
        <Link to="/character" className="nav-card">
          <div className="card-content">
            <h2>Characters</h2>
            <p>Discover all the characters</p>
          </div>
        </Link>

        <Link to="/locations" className="nav-card">
          <div className="card-content">
            <h2>Locations</h2>
            <p>Find out more about the places in the series</p>
          </div>
        </Link>

        <Link to="/episodes" className="nav-card">
          <div className="card-content">
            <h2>Episodes</h2>
            <p>Browse through all episodes</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Index;
