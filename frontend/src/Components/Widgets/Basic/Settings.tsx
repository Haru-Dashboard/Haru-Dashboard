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

const Settings = ({ handleShow }: any) => {
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
          <button className="bg-transparent border border-0" onClick={logout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="login-comment bg-transparent border border-0">
          Login &nbsp;&nbsp;
          <FontAwesomeIcon icon={faUser} color="white" />
        </button>
      )}
      <button className="bg-transparent border border-0" onClick={handleShow}>
        <FontAwesomeIcon icon={faGear} color="white" />
      </button>
    </div>
  );
};

export default Settings;
