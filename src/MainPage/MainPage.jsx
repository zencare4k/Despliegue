import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/MainPage.css';

const MainPage = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterData, setCharacterData] = useState(null);

  const handleInputChange = (e) => {
    setCharacterName(e.target.value);
  };
//conectividad con el endpoint de la api
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://dragonball-api.com/api/characters?name=${characterName}`);
      setCharacterData(response.data[0]); // Assuming the API returns an array of characters
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };
//Aspecto visual de la página + boton de conexion con la api
  return (
    <div className="main-page">
      <h1>Dragon Ball API Character Searcher</h1>
      <input
        type="text"
        value={characterName}
        onChange={handleInputChange}
        placeholder="Enter character name"
      />
      <button onClick={handleSearch}>Search</button>
      {characterData && (
        <div className="character-info">
          <h2>{characterData.name}</h2>
          <img src={characterData.image} alt={characterData.name} />
          <p>{characterData.description}</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;