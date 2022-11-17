import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faUser,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { defaultURL } from '../../../API/';
import {
  clearToken,
  getAccessToken,
  tokenExists,
} from '../../../API/Authentication';

const Settings = () => {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    if (tokenExists()) {
      fetch(defaultURL + 'users', {
        method: 'GET',
        headers: {
          Authorization: getAccessToken(),
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data: { email: string; name: string }) => {
          setUserName(data.name);
        });
    }
  });

  const login: React.MouseEventHandler = (event) => {
    location.href = `${defaultURL}oauth2/authorize/google?redirect_uri=${location.href}`;
  };

  const logout: React.MouseEventHandler = (event) => {
    clearToken();
    location.reload();
  };

  return (
    <div className="d-flex justify-content-between">
      {tokenExists() && userName ? (
        <div className="login-comment">
          Hello, {userName} &nbsp;
          <button style={{ background: 'transparent' }} onClick={logout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
          </button>
        </div>
      ) : (
        <button
          style={{ background: 'transparent' }}
          onClick={login}
          className="login-comment">
          Login &nbsp;&nbsp;
          <FontAwesomeIcon icon={faUser} color="white" />
        </button>
      )}
      <button style={{ background: 'transparent' }}>
        <FontAwesomeIcon icon={faGear} color="white" />
      </button>
    </div>
  );
};

export default Settings;
