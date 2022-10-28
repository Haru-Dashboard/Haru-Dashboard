import React from 'react';

const SmallTitle = (props: any) => {
  return (
    <div className='small-title'>
      {/*  */}
      <p className='mt-1 ms-4 mb-0' style={{color: `${props.color}`}}>{props.title}</p>
    </div>
  );
};

export default SmallTitle;