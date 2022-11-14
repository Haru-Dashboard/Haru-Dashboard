import React, { useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import Basic from './Components/Widgets/Basic';

function App() {
  useEffect(() => {
    const accessToken = new URL(location.toString()).searchParams.get(
      'access_token',
    );
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      // TODO: url 처리
      chrome.tabs.update({ url: 'index.html' });
    }
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
