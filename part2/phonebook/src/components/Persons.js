import React from 'react';
import Person from './Person';

const Persons = ({ personsToShow }) => (
  <ul>
    {personsToShow.map((person) => (
      <Person key={person.id} person={person} />
    ))}
  </ul>
);

export default Persons;
