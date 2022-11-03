import React from 'react';

const SmallTitle = (props: any) => {
  return (
    <div className="small-title">
      {/*  */}
      <p className="my-0" style={{ color: `${props.color}` }}>
        {props.title}
      </p>
    </div>
  );
};

export default SmallTitle;
