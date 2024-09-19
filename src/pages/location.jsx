// Locations.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './location.css';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const result = await axios.get('https://rickandmortyapi.com/api/location', {
          params: { name: search, page },
        });
        setLocations(result.data.results);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };
    fetchLocations();
  }, [search, page]);

  return (
    <div className="container">
      <h1>Rick & Morty Locations</h1>
      <input
        type="text"
        placeholder="Search locations by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="location-grid">
        {locations.map((location) => (
          <div className="location-card" key={location.id}>
            <h3>{location.name}</h3>
            <p><strong>Type:</strong> {location.type}</p>
            <p><strong>Dimension:</strong> {location.dimension}</p>
            <Link to={`/location/${location.id}`}>
              <button>See Related Characters</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Locations;
