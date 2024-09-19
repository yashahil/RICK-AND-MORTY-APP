import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CharacterProfile.css';

const CharacterProfile = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const result = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(result.data);
      } catch (error) {
        console.error("Failed to fetch character", error);
      }
    };
    fetchCharacter();
  }, [id]);

  useEffect(() => {
    if (character && character.location && character.location.url) {
      const fetchLocation = async () => {
        try {
          const result = await axios.get(character.location.url);
          setLocation(result.data);
        } catch (error) {
          console.error("Failed to fetch location", error);
        }
      };
      fetchLocation();
    }
  }, [character]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={character.image} alt={character.name} className="profile-image" />
        <h1><u>Character Details</u></h1>
        <p><strong>Name:</strong> {character.name}</p>
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin.name}</p>
        <h1><u>Location Details</u></h1> 
        <p><strong>Name:</strong> {location ? location.name : 'Unknown'}</p>
        <p><strong>Type:</strong> {location ? location.type : 'Unknown'}</p>
        <p><strong>Dimension:</strong> {location ? location.dimension : 'Unknown'}</p>
        <p><strong>Amount of Residents:</strong> {location ? location.residents.length : 'Unknown'}</p>
      </div>
      <div className="episode-list">
        <h2>Episodes</h2>
        <ul>
          {character.episode.map((ep, index) => (
            <li key={index}>Episode {index + 1}: {ep}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterProfile;
