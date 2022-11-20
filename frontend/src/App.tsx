import React, { useEffect } from 'react';
import {
  isValid,
  reissueToken,
  saveTokenFromParams,
} from './API/Authentication';
import Dashboard from './Components/Dashboard';
import Basic from './Components/Widgets/Basic';

function App() {
  useEffect(() => {
    (async () => {
      saveTokenFromParams();
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        if (!(await isValid(accessToken))) {
          await reissueToken(accessToken);
        }
      }
    })();
  }, []);

  return (
    <div className="App">
      <div
        className="wrap mx-auto px-3"
        style={{
          maxWidth: `${
            (window.screen.availHeight +
              window.innerHeight -
              window.outerHeight) *
            (2000 / 1175)
          }px`,
        }}>
        <Basic />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
