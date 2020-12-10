import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

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

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      const personFound = persons.find((person) => person.name === newName);
      const confirmMsg = `${personFound.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(confirmMsg)) {
        const personToChange = {
          name: newName,
          number: newNumber,
          id: personFound.id,
        };
        personService
          .changeNumber(personToChange.id, personToChange)
          .then((changedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id === changedPerson.id ? changedPerson : person,
              ),
            ),
          );
      }
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService.createPerson(newPerson).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  const personsToShow = personsAreFiltered
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase()),
      )
    : persons;

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = (personId) => () => {
    const personToDelete = persons.find((person) => person.id === personId);
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .deletePerson(personId)
        .then(setPersons(persons.filter((person) => person.id !== personId)));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add new contact</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
