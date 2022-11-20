import React from 'react';
import SearchBar from './SearchBar';
import Time from './Time';
import Weather from './Weather';
import Settings from './Settings';
import './index.css';

const Basic = () => {
  return (
    <header>
      <section className="d-flex justify-content-between align-items-center py-2">
        <Weather />
        <Settings />
      </section>
      <section className="d-flex flex-row pb-3">
        <Time />
        <SearchBar />
      </section>
    </header>
  );
};

export default Basic;
