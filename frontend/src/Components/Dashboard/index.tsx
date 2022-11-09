import React from 'react';
import GridBoard from './GridBoard';
import Todo from '../Widgets/Todo';
import './index.css';

const DashBoard = () => {
  return (
    <main className="main-board d-flex">
      <Todo />
      <GridBoard />
    </main>
  );
};

export default DashBoard;
