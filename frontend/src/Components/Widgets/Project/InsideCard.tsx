import React from 'react';

const InsideCard = (props: any) => {
  const { lists } = props;
  console.log(lists);
  return (
    <div className="h-100 p-2">
      <div className="w-90 h-40 bg-secondary mx-auto">
        <img src={lists.imageInfo.imageUrl} className="w-100 h-100" />
      </div>
      <div>{lists.title}</div>
      <div>
        {console.log(lists.projectLabels)}
        {lists.projectLabels[0].id}/////////{lists.projectLabels[0].name}
      </div>
      <div>{lists.endDate} </div>
      <div>{lists.content}</div>
    </div>
  );
};

export default InsideCard;
