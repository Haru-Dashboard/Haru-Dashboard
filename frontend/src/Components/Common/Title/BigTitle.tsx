import React from 'react';

const BigTitle = (props: any) => {
  return (
    <div className="text-center big-title d-flex justify-content-start align-items-center">
      {/* <TodoIcon /> */}
      <img
        src={`icon/haru-icon-${props.title}-title.png`}
        className="me-2"
        alt={props.title}
        style={{ width: '30px', height: '30px' }}
      />
      <p className="mb-0">{props.title}</p>
    </div>
  );
};

export default BigTitle;
