import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Time from './Time';
import Weather from './Weather';
import Settings from './Settings';
import BackgroundSettingModal from './BackgroundSettingModal';
import './index.css';

const Basic = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <header>
      <section className="d-flex justify-content-between align-items-center px-4 py-2">
        <Weather />
        <Settings handleShow={handleShow} />
      </section>
      <section className="d-flex flex-row pb-3">
        <Time />
        <SearchBar />
      </section>
      <div>
        <BackgroundSettingModal show={show} handleClose={handleClose} />
      </div>
    </header>
  );
};

export default Basic;
