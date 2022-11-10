import React, { useState, useEffect } from 'react';
import CreateProjectModal from './CreateProjectModal';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectCard from './ProjectCard';
import BigTitle from '../../Common/Title/BigTitle';
import BtnPlus from '../../Common/Button/BtnPlus';
import { project } from '../../../Utils/Project';
import './index.css';

const Project = () => {
  const [projectList, setProjectList] = useState<project[]>([]);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    fetchProjectList(pageNo);
  }, []);

  function fetchProjectList(pageNo: number) {
    let accessToken = localStorage.getItem('accessToken');
    const backURL = process.env.REACT_APP_BACKURL;
    const URLNext = `projects?page=${pageNo}&size=3`;
    if (accessToken != null) {
      accessToken = 'Bearer ' + accessToken;
      fetch(backURL + URLNext, {
        method: 'GET',
        headers: { Authorization: accessToken },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length) {
            setProjectList(data);
          }
        });
    }
  }

  // creation modal
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  // detail modal
  const [showMore, setShowMore] = useState(false);
  const [selectedListNo, setSelectedListNo] = useState<number>();
  const handleCloseMore = () => setShowMore(false);
  function handleShowMore(id: number) {
    setSelectedListNo(id);
    setShowMore(true);
  }

  return (
    <div className="w-100 h-100 p-3 sub-board">
      <div className="h-100">
        <div className="d-flex justify-content-between pe-3">
          <BigTitle title="In Progress" />
          <BtnPlus onClick={handleShowCreate} />
        </div>
        {/* Body */}
        <div className="d-flex justify-content-center h-85">
          {projectList.map((item, idx) => {
            return (
              <ProjectCard
                key={idx}
                item={item}
                handleShowMore={handleShowMore}
              />
            );
          })}
        </div>
        {/* Footer */}
      </div>
      {/* project를 생성하는 모달 */}
      <div>
        <CreateProjectModal
          handleClose={handleCloseCreate}
          show={showCreate}
          item={selectedListNo ? projectList[selectedListNo] : null}
        />
      </div>
      {/* project 상세 보기 모달 */}
      <div>
        <ProjectDetailModal handleClose={handleCloseMore} show={showMore} />
      </div>
    </div>
  );
};

export default Project;

/*
[
    {
        "id": 1,
        "title": "테스트프로젝트",
        "content": "테스트용입니다.",
        "startDate": "2022.10.30",
        "endDate": "2022.10.31",
        "projectLinks": [
            {
                "id": 1,
                "name": "github",
                "link": "link"
            },
            {
                "id": 2,
                "name": "jira",
                "link": "link"
            }
        ],
        "projectLabels": [
            {
                "id": 1,
                "name": "프로젝트"
            },
            {
                "id": 2,
                "name": "BE"
            }
        ],
        "imageInfo": {
            "id": 1,
            "originName": "image.png",
            "name": "6ac74080-9216-4869-a183-5f64b0c81fa5.png",
            "extension": "png",
            "imageUrl": "https://s3.ap-northeast-2.amazonaws.com/haru.s3.file/6ac74080-9216-4869-a183-5f64b0c81fa5.png"
        }
    }
]
*/
