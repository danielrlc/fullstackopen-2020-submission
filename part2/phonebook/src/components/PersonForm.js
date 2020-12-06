import React from 'react';

const PersonForm = ({
  addNewContact,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addNewContact}>
    <div>
      name: <input type="text" value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number:{' '}
      <input type="text" value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
