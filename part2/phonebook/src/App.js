import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);

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
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const personsToShow = personsAreFiltered
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      )
    : persons;

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
    </div>
  );
};

export default App;
