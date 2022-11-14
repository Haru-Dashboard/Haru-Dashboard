import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './BtnPlus.css';
import { checkTokenValidate } from '../../../API/Authentication';

interface BtnPlusProps {
  onClick?: React.MouseEventHandler;
}

const BtnPlus = ({ onClick }: BtnPlusProps) => {
  return (
    <button
      type="button"
      className="button-plus d-flex justify-content-center align-items-center"
      onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} color="rgb(73, 100, 158)" />
    </button>
  );
};

export default BtnPlus;
