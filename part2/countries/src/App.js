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
            {countriesToShow.map((country) => (
              <div key={country.name}>
                <h2>{country.name}</h2>
                <p>Population: {country.population}</p>
                <p>Capital: {country.capital}</p>
                <h3>Languages</h3>
                <ul>
                  {country.languages.map((language) => (
                    <li key={language.name}>{language.name}</li>
                  ))}
                </ul>
                <img
                  className="flag-img"
                  src={country.flag}
                  alt={`flag of ${country.name}`}
                />
              </div>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

export default App;
