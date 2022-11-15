import React from 'react';
import './BigTitle.css';

type bigTitleProps = {
  title: string;
};

const BigTitle = ({ title }: bigTitleProps) => {
  return (
    <div className="big-title text-center d-flex align-items-center">
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
