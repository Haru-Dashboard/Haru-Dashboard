import React from 'react';

import SearchBar from './SearchBar';
import Time from './Time';
import User from './User';
import Weather from './Weather';

const Basic = () => {
  return (
    <>
      <Weather />
      <div className="d-flex justify-content-between">
        <Time />
        <SearchBar />
        <User />
      </div>
    </>
  );
};

export default Basic;
