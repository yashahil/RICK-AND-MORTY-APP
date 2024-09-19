import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    episode: '',
    gender: '',
    species: '',
    type: '',
  });
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch locations and episodes for filtering
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const locationResult = await axios.get('https://rickandmortyapi.com/api/location');
        const episodeResult = await axios.get('https://rickandmortyapi.com/api/episode');
        setLocations(locationResult.data.results);
        setEpisodes(episodeResult.data.results);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      }
    };
    fetchFilters();
  }, []);

  // Fetch characters, including local filtering for location and episode
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // First, fetch the characters based on general filters
        const filterParams = {
          name: search,
          page,
        };

        if (filters.status) filterParams.status = filters.status;
        if (filters.gender) filterParams.gender = filters.gender;
        if (filters.species) filterParams.species = filters.species;
        if (filters.type) filterParams.type = filters.type;

        const result = await axios.get('https://rickandmortyapi.com/api/character', {
          params: filterParams,
        });

        let filteredCharacters = result.data.results;

        // Location filter
        if (filters.location) {
          filteredCharacters = filteredCharacters.filter(
            (character) =>
              character.location.name === filters.location || character.origin.name === filters.location
          );
        }

        // Episode filter
        if (filters.episode) {
          const episodeData = episodes.find(
            (ep) => ep.name === filters.episode
          );
          if (episodeData) {
            // Fetch characters for the selected episode
            const episodeResult = await axios.get(episodeData.url);
            const episodeCharacters = episodeResult.data.characters.map((charUrl) => charUrl.split('/').pop());
            filteredCharacters = filteredCharacters.filter((character) =>
              episodeCharacters.includes(character.id.toString())
            );
          }
        }

        setCharacters(filteredCharacters);
      } catch (error) {
        console.error("Failed to fetch characters", error);
      }
    };
    fetchCharacters();
  }, [search, filters, page, episodes]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Rick & Morty Characters</h1>
      <input
        type="text"
        placeholder="Search characters by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="filters">
        <select name="status" onChange={handleFilterChange} value={filters.status}>
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select name="gender" onChange={handleFilterChange} value={filters.gender}>
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <select name="species" onChange={handleFilterChange} value={filters.species}>
          <option value="">Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
        <select name="location" onChange={handleFilterChange} value={filters.location}>
          <option value="">Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>{location.name}</option>
          ))}
        </select>
        <select name="episode" onChange={handleFilterChange} value={filters.episode}>
          <option value="">Episode</option>
          {episodes.map((episode) => (
            <option key={episode.id} value={episode.name}>{episode.name}</option>
          ))}
        </select>
      </div>
      <div className="character-grid">
        {characters.map((character) => (
          <div className="character-card" key={character.id}>
            <Link to={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
              <p>{character.species}</p>
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

export default Characters;
