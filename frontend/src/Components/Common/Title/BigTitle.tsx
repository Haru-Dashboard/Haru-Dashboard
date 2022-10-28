import React from 'react'

const BigTitle = (props : any) => {

  return (
    <div className='text-center big-title d-flex justify-content-start ms-5'>
      {/* <TodoIcon /> */}
      <img src={`icon/haru-icon-${props.title}-title.png`}
        className='mt-4'
        alt={props.title} style={{ width: '30px', height: '30px'}}/>
      <p className='ms-2 mt-3 mb-0'>{props.title}</p>
    </div>
  );
};

export default BigTitle;