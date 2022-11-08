import React from 'react';

const InsideCard = (props: any) => {
  const { list } = props;
  return (
    <div className="h-100 p-2">
      <div className="w-90 h-40 bg-secondary mx-auto">
        <img src={list.imageInfo.imageUrl} className="w-100 h-100" />
      </div>
      <div>{list.title}</div>
      <div>
        {list.projectLabels[0].id}/////////{list.projectLabels[0].name}
      </div>
      <div>{list.endDate} </div>
      <div>{list.content}</div>
    </div>
  );
};

export default InsideCard;
