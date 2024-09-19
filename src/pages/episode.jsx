// Episodes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './episode.css';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const result = await axios.get('https://rickandmortyapi.com/api/episode', {
          params: { name: search, page },
        });
        setEpisodes(result.data.results);
      } catch (error) {
        console.error("Failed to fetch episodes", error);
      }
    };
    fetchEpisodes();
  }, [search, page]);

  return (
    <div className="container">
      <h1>Rick & Morty Episodes</h1>
      <input
        type="text"
        placeholder="Search episodes by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="episode-grid">
        {episodes.map((episode) => (
          <div className="episode-card" key={episode.id}>
            <h3>{episode.name}</h3>
            <p><strong>Episode:</strong> {episode.episode}</p>
            <p><strong>Air Date:</strong> {episode.air_date}</p>
            <Link to={`/episode/${episode.id}`}>
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

export default Episodes;
