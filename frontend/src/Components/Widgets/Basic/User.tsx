import React from 'react';

const User = () => {
  // FIXME: 아바타로 변경
  return (
    <div className="w-25 text-white pb-2 d-flex justify-content-end align-items-end">
      <span
        className="h-75 bg-secondary rounded-circle"
        style={{ aspectRatio: '1/1' }}></span>
    </div>
  );
};

export default User;
