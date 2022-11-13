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
        className="p-2 h-100 d-flex flex-column justify-content-between"
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: '1rem',
        }}>
        <div className="col d-flex justify-content-center h-50">
          <img src={item.imageInfo.imageUrl} className="w-80" />
        </div>
        <p className="col my-0 fw-bold mt-1" style={{ fontSize: '0.8rem' }}>
          {item.title}
        </p>
        <div className="col">
          {item.projectLabels.length > 2 && (
            <div>
              {item.projectLabels.slice(0, 2).map((projectLabel, idx) => (
                <Badge
                  pill
                  key={idx}
                  bg="warning"
                  style={{ fontSize: '0.5rem', marginRight: '0.1rem' }}>
                  {projectLabel.name}
                </Badge>
              ))}
              <span className="fw-bold" style={{ fontSize: '0.5rem' }}>
                + {item.projectLabels.length - 2}
              </span>
            </div>
          )}
          {item.projectLabels.length <= 2 && (
            <div>
              {item.projectLabels.map((projectLabel, idx) => (
                <Badge
                  pill
                  key={idx}
                  bg="warning"
                  style={{ fontSize: '0.5rem', marginRight: '0.1rem' }}>
                  {projectLabel.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div
          className="col d-flex justify-content-end"
          style={{ height: '5%', right: '1rem', bottom: '1rem' }}>
          {item.projectLinks.map((projectLink, idx) => (
            <a
              href={projectLink.link}
              key={idx}
              style={{ marginRight: '0.3rem' }}>
              <img
                width="18"
                height="18"
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
