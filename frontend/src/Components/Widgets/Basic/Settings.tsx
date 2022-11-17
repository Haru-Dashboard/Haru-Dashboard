import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { defaultURL } from '../../../API/';
import { clearToken, tokenExists } from '../../../API/Authentication';

const Settings = () => {
  const onClick: React.MouseEventHandler = (event) => {
    clearToken();
    location.reload();
  };
  const login: React.MouseEventHandler = (event) => {
    location.href = `${defaultURL}oauth2/authorize/google?redirect_uri=${location.href}`
  }

  return (
    <div className='d-flex justify-content-between'>
      {tokenExists() ? (
        <div className='login-comment'>
           Hello, { localStorage.getItem("userName")} &nbsp;
          <button style={{ background: 'transparent' }} onClick={onClick}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
          </button>
        </div>
        
      ) : (
          <button style={{ background: 'transparent' }}
            onClick={login} className='login-comment'
            >
            Login &nbsp;&nbsp;
            <FontAwesomeIcon icon={faUser} color="white"/>
        </button>
      )}
      <button style={{ background: 'transparent' }}>
        <FontAwesomeIcon icon={faGear} color="white" />
      </button>
    </div>
  );
};

export default Settings;
