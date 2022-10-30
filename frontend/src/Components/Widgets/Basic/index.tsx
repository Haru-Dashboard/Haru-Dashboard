import React from 'react';
import { screenType } from '../../../Utils/Common';
import SearchBar from './SearchBar';
import Time from './Time';
import User from './User';
import Weather from './Weather';

const Basic = ({width, height}: screenType) => {
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
