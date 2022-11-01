import React from 'react';

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
        width: '36px',
        height: '36px',
        border: 'none',
        borderRadius: '15px',
      }}
      onClick={onClick}>
      <p
        className="text-center m-0 fw-bolder"
        style={{ color: 'rgb(73, 100, 158)' }}>
        +
      </p>
    </button>
  );
};

export default BtnPlus;
