import React, { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div className="search-bar w-50 d-flex align-items-end">
      {/* Note: GET https://www.google.com/search?q={query} */}
      <form
        className="w-100 h-75 position-relative"
        action="http://www.google.com/search"
        method="get">
        <FontAwesomeIcon
          className="position-absolute"
          icon={faMagnifyingGlass}
          style={{
            width: '1.3rem',
            height: '1.3rem',
            left: '0.8rem',
            top: '50%',
            transform: 'translate(0, -50%)',
          }}
        />
        <input
          className="search-bar-input w-100 h-100 border border-0 rounded-pill position-absolute"
          type="text"
          onChange={onChange}
          name="q"
          value={query}
          placeholder="search google"
          style={{ backgroundColor: 'rgb(256, 256, 256, 0.3)' }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
