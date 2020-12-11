import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [personsAreFiltered, setPersonsAreFiltered] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    event.target.value
      ? setPersonsAreFiltered(true)
      : setPersonsAreFiltered(false);
  };

  const checkPersonEntry = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      const personToUpdate = persons.find((person) => person.name === newName);
      const confirmMsg = `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(confirmMsg)) {
        updatePerson(personToUpdate.id);
      }
      return;
    }
    addNewPerson();
  };

  const updatePerson = (personId) => {
    const updatedPerson = {
      name: newName,
      number: newNumber,
      id: personId,
    };
    personService
      .updatePerson(personId, updatedPerson)
      .then((updatedPerson) =>
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person,
          ),
        ),
      )
      .catch((error) => {
        showNotificationMsg(
          `Information of ${updatedPerson.name} has already been removed from server`,
          'error',
        );
        setPersons(persons.filter((person) => person.id !== personId));
      });
    showNotificationMsg(`Updated ${updatedPerson.name}`, 'success');
  };

  const addNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    personService.createPerson(newPerson).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    });
    showNotificationMsg(`Added ${newPerson.name}`, 'success');
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

  const showNotificationMsg = (message, messageType) => {
    setNotificationMsg(message);
    setNotificationType(messageType);
    setTimeout(() => setNotificationMsg(''), 3000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add new contact</h2>
      <Notification
        notificationMsg={notificationMsg}
        notificationType={notificationType}
      />
      <PersonForm
        checkPersonEntry={checkPersonEntry}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
