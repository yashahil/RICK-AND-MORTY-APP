import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Characters from './pages/Characters';
import Index from './pages/Index';
import CharacterProfile from './pages/CharacterProfile';
import Locations from './pages/location';
import Episodes from './pages/episode';
import LocationCharacters from './pages/LocationCharacters';
import EpisodeCharacters from './pages/EpisodeCharacters';

const App = () => {
  return (
    <Router basename="/rick-and-morty-app">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/character" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterProfile />} />
        <Route path="/location/:id" element={<LocationCharacters />} />
        <Route path="/episode/:id" element={<EpisodeCharacters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
