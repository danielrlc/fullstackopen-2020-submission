import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryInList from './components/CountryInList';
import SingleCountry from './components/SingleCountry';

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState({});

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
              id: countryData.alpha2Code,
            };
          }),
        ),
      ),
    [],
  );

  useEffect(() => {
    const preppedCountriesToShow = countries.filter((country) =>
      country.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setCountriesToShow(preppedCountriesToShow);
  }, [searchInput, countries]);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`,
        )
        .then((response) => setWeather(response.data));
    }
  }, [countriesToShow, apiKey]);

  return (
    <div className="App">
      <span>Find countries: </span>
      <input type="text" value={searchInput} onChange={handleInputChange} />
      {countriesToShow.length > 10 && (
        <p>Too many matches. Add more text to get fewer matches.</p>
      )}
      {countriesToShow.length <= 10 &&
        countriesToShow.length > 1 &&
        countriesToShow.map((country) => (
          <CountryInList country={country} key={country.name} />
        ))}
      {countriesToShow.length === 1 && (
        <SingleCountry country={countriesToShow[0]} weather={weather} />
      )}
    </div>
  );
}

export default App;
