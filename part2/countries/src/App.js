import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(
    () =>
      axios.get('https://restcountries.eu/rest/v2/all').then((response) =>
        setCountries(
          response.data.map((countryData) => {
            return {
              name: countryData.name,
              capital: countryData.capital,
              population: countryData.population,
              languages: countryData.languages,
              flag: countryData.flag,
            };
          }),
        ),
      ),
    [],
  );

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  console.log(countriesToShow);

  return (
    <div className="App">
      <span>Find countries: </span>
      <input type="text" value={searchInput} onChange={handleInputChange} />
      <ul>
        {countriesToShow.length > 10 &&
          'Too many matches. Add more text to get fewer matches.'}
        {countriesToShow.length <= 10 &&
          countriesToShow.length > 1 &&
          countriesToShow.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        {countriesToShow.length === 1 && (
          <>
            <h2>{countriesToShow[0].name}</h2>
            <p>Population: {countriesToShow[0].population}</p>
            <p>Capital: {countriesToShow[0].capital}</p>
            <h3>Languages</h3>
            <ul>
              {countriesToShow[0].languages.map((language) => (
                <li>{language.name}</li>
              ))}
            </ul>
            <img
              className="flag-img"
              src={countriesToShow[0].flag}
              alt={`flag of ${countriesToShow[0].name}`}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default App;
