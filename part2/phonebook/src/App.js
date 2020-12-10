import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [personsAreFiltered, setPersonsAreFiltered] = useState(false);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    event.target.value
      ? setPersonsAreFiltered(true)
      : setPersonsAreFiltered(false);
  };

  const addNewContact = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    axios.post('http://localhost:3001/persons', newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName('');
      setNewNumber('');
    });
  };

  const personsToShow = personsAreFiltered
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      )
    : persons;

  useEffect(
    () =>
      axios
        .get('http://localhost:3001/persons')
        .then((response) => setPersons(response.data)),
    [],
  );

  const deletePerson = (personId) => () => {
    axios.delete(`http://localhost:3001/persons/${personId}`);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add new contact</h2>
      <PersonForm
        addNewContact={addNewContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />

      <button onClick={deletePerson(1)}>Delete person</button>
    </div>
  );
};

export default App;
