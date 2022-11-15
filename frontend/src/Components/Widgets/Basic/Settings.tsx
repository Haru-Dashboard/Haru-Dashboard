import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { defaultURL } from '../../../API/';
import { clearToken, tokenExists } from '../../../API/Authentication';

const Settings = () => {
  const onClick: React.MouseEventHandler = (event) => {
    clearToken();
    location.reload();
  };

  return (
    <div>
      {tokenExists() ? (
        <button className="btn btn-outline-primary" onClick={onClick}>
          Logout
        </button>
      ) : (
        <a
          className="btn btn-outline-primary"
          href={`${defaultURL}oauth2/authorize/google?redirect_uri=${location.href}`}
          role="button">
          Login
        </a>
      )}
      <button style={{ background: 'transparent' }}>
        <FontAwesomeIcon icon={faGear} color="white" />
      </button>
    </div>
  );
};

export default Settings;
