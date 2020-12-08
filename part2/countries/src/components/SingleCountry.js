import React from 'react';

const SingleCountry = ({ country, weather }) => {
  if (weather) {
    return (
      <>
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
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {weather.current.temperature}</p>
        <img
          src={weather.current.weather_icons[0]}
          alt={`weather in ${country.capital}`}
        />
        <p>
          wind: {weather.current.wind_speed} mph direction{' '}
          {weather.current.wind_dir}
        </p>
      </>
    );
  }
};

export default SingleCountry;
