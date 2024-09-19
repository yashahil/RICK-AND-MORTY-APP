import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './EpisodeCharacters.css';

const EpisodeCharacters = () => {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const episodeResult = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        const characterUrls = episodeResult.data.characters;
        const characterPromises = characterUrls.map((url) => axios.get(url));
        const characterResults = await Promise.all(characterPromises);
        setCharacters(characterResults.map((res) => res.data));
      } catch (error) {
        console.error("Failed to fetch characters", error);
      }
    };
    fetchCharacters();
  }, [id]);

  return (
    <div className="container">
      <h1>Characters in this Episode</h1>
      <div className="character-grid">
        {characters.map((character) => (
          <div className="character-card" key={character.id}>
            <Link to={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeCharacters;
