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
  const url = `${baseUrl}/${personId}`;
  const request = axios.delete(url);
  return request.then((response) => response.data);
};

const updatePerson = (personId, updatedPerson) => {
  const url = `${baseUrl}/${personId}`;
  const request = axios.put(url, updatedPerson);
  return request.then((response) => response.data);
};

const personService = {
  getAllPersons,
  createPerson,
  deletePerson,
  updatePerson,
};

export default personService;
