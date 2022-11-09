import React, { useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import Basic from './Components/Widgets/Basic';
import { Authentication } from './API/Authentication';

function App() {
  useEffect(() => {
    Authentication();
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
