import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface BtnPlusProps {
  onClick?: React.MouseEventHandler;
}

const BtnPlus = ({ onClick }: BtnPlusProps) => {
  return (
    <button
      type="button"
      className="d-flex justify-content-center align-items-center"
      // TODO: 상대 크기로 변경
      style={{
        backgroundColor: 'white',
        width: '32px',
        height: '32px',
        border: 'none',
        borderRadius: '15px',
      }}
      onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} color="rgb(73, 100, 158)" />
    </button>
  );
};

export default BtnPlus;
