import React from 'react';
import './BigTitle.css';

type BigTitleProps = {
  title: string;
};

const BigTitle = ({ title }: BigTitleProps) => {
  return (
    <div className="big-title text-center d-flex align-items-center select-none">
      <img
        src={`icon/haru-icon-${title}-title.png`}
        className="me-2 big-title-img"
        alt={title}
      />
      <span>{title}</span>
    </div>
  );
};

export default BigTitle;
