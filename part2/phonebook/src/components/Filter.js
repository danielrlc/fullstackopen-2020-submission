import React from 'react';

const Filter = ({ search, handleSearchChange }) => (
  <p>
    Filter shown with:
    <input type="text" value={search} onChange={handleSearchChange} />
  </p>
);

export default Filter;
