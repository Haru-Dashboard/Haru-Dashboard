import React, { useState } from 'react';
import BigTitle from '../../Common/Title/BigTitle';
import CardComponent from '../../Common/CardComponent';
import BtnPlus from '../../Common/Button/BtnPlus';
import CreateProjectModal from './CreateProjectModal';

const Project = () => {
  const list = [1, 1, 1];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="w-100 h-100 p-3 sub-board">
      <div className="h-100">
        <div className="d-flex justify-content-between pe-3">
          <BigTitle title="In Progress" color="white" />
          <BtnPlus onClick={handleShow} />
        </div>
        <div className="d-flex justify-content-between h-70 mt-1">
          {list.map((item) => {
            return (
              <CardComponent
                cardWidth="30%"
                cardHeight="100%"
                cardContent={<div>hello world</div>}
              />
            );
          })}
        </div>
      </div>
      <div>
        <CreateProjectModal handleClose={handleClose} show={show} />
      </div>
    </div>
  );
};

export default Project;
