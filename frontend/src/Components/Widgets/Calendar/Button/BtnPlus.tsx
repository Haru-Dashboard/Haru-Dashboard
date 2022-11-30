import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './BtnPlusCalendar.css';

interface BtnPlusProps {
  onClick?: React.MouseEventHandler;
}

const BtnPlus2 = ({ onClick }: BtnPlusProps) => {
  return (
    <button
      type="button"
      className="button-plus-calendar d-flex justify-content-center align-items-center"
      onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} color="rgb(73, 100, 158)" />
    </button>
  );
};

export default BtnPlus2;
