import React from 'react';
import { Badge } from 'react-bootstrap';
import { getFaviconSrc } from '../../../Utils';
import { project } from '../../../Utils/Project';

type projectCardProps = {
  item: project;
  handleShowMore: (id: number) => void;
};

const ProjectCard = (props: projectCardProps) => {
  const { item, handleShowMore } = props;
  return (
    <div
      className="w-30 h-100 p-2"
      onClick={() => handleShowMore(item.id)}
      key={item.id}>
      <div
        className="h-100 p-1"
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: '1rem',
        }}>
        <div
          className="d-flex justify-content-center"
          style={{ width: '100%', height: '45%' }}>
          <img src={item.imageInfo.imageUrl} className="w-80 h-100" />
        </div>
        <p className="my-0" style={{ height: '12.5%', fontSize: '1rem' }}>
          {item.title}
        </p>
        <div style={{ height: '12.5%' }}>
          {item.projectLabels.map((projectLabel, idx) => (
            <Badge
              pill
              key={idx}
              // TODO: bg -> random color
              bg="primary"
              style={{ fontSize: '0.75rem' }}
              // style={{backgroungColor: ???}}
            >
              {projectLabel.name}
            </Badge>
          ))}
        </div>
        <p className="my-0" style={{ height: '25%', fontSize: '0.75rem' }}>
          {item.content}
        </p>
        <div
          className="d-flex justify-content-end"
          style={{ height: '5%', right: '1rem', bottom: '1rem' }}>
          {item.projectLinks.map((projectLink, idx) => (
            <a href={projectLink.link} key={idx}>
              <img
                width="20"
                height="20"
                src={getFaviconSrc(projectLink.link)}
                alt={projectLink.name}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
