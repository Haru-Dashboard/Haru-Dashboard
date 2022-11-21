import React, { useEffect, useState } from 'react';
import {
  isValid,
  reissueToken,
  saveTokenFromParams,
} from './API/Authentication';
import Dashboard from './Components/Dashboard';
import Basic from './Components/Widgets/Basic';

function App() {
  const [clickedImg, setClickedImg] = useState('');
  const localImg = localStorage.getItem('img');

  const changeBg = () => {
    if (localImg) {
      setClickedImg(localImg);
    } else {
      setClickedImg('Sunset.png');
    }
  };

  const handleClickedImg = (name: string) => {
    setClickedImg(name);
  };

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
    changeBg();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(../img/${clickedImg})`,
      }}>
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
        <Basic handleClickedImg={handleClickedImg} />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
