import React, { useState } from 'react';

const CountryInList = ({ country }) => {
  const [detailsAreShown, setDetailsAreShown] = useState(false);
  const toggleDetails = () => setDetailsAreShown(!detailsAreShown);

  if (detailsAreShown) {
    return (
      <>
        <h2>{country.name}</h2>
        <button onClick={toggleDetails}>Hide</button>
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
  }

  return (
    <li>
      {country.name} <button onClick={toggleDetails}>Show</button>
    </li>
  );
};

export default CountryInList;
