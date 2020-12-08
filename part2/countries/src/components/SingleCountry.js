import React from 'react';

const SingleCountry = ({ country }) => (
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
  </>
);

export default SingleCountry;
