import React from 'react';
import { screenType } from '../../../Utils/Common';
import SearchBar from './SearchBar';
import Time from './Time';
import User from './User';
import Weather from './Weather';
import Settings from './Settings';

import { screenType } from '../../../App';

const Basic = ({ width, height }: screenType) => {
  return (
    <div style={{ height: height }}>
      <div className="d-flex justify-content-between" style={{ height: '35%' }}>
        <Weather />
        <Settings />
      </div>
      <div className="d-flex flex-row" style={{ height: '65%' }}>
        <Time />
        <SearchBar />
        <User />
      </div>
    </div>
  );
};

export default Basic;
