import React from 'react';

const SmallTitle = (props: any) => {
  return (
    <div className='small-title'>
      {/*  */}
      <p className='ms-4 my-0' style={{color: `${props.color}`}}>{props.title}</p>
    </div>
  );
};

export default SmallTitle;