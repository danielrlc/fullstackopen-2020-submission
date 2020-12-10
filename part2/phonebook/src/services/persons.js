import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => response.data);
};

const personService = { getAllPersons, createPerson, deletePerson };

export default personService;