import React, { useState, useEffect } from 'react';
import CreateProjectModal from './CreateProjectModal';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectCard from './ProjectCard';
import BigTitle from '../../Common/Title/BigTitle';
import BtnPlus from '../../Common/Button/BtnPlus';
import { project } from '../../../Utils/Project';
import './index.css';
import {
  checkTokenValidate,
  getAccessToken,
} from '../../../API/Authentication';

const Project = () => {
  const [projectList, setProjectList] = useState<project[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [isLogined, setIsLogined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchProjectList(pageNo);
  }, []);

  function fetchProjectList(pageNo: number) {
    const backURL = process.env.REACT_APP_BACKURL;
    const URLNext = `projects?page=${pageNo}&size=3`;
    if (checkTokenValidate()) {
      fetch(backURL + URLNext, {
        method: 'GET',
        headers: { Authorization: getAccessToken() },
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
  const handleShowCreate = () => {
    if (isLogined) {
      setShowCreate(true);
    } else {
      alert('로그인 후에 이용 가능합니다.');
    }
  };

  // detail modal
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState<project>({
    id: -1,
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    projectLinks: [
      {
        id: -1,
        name: '',
        url: '',
      },
    ],
    projectLabels: [
      {
        id: -1,
        name: '',
      },
    ],
    imageInfo: {
      id: -1,
      imageUrl: '',
      originName: '',
    },
  });
  function handleShowMore(item: project) {
    setSelectedProject(item);
    setShowMore(true);
  }
  function handleCloseMore() {
    setShowMore(false);
  }

  function handleSaved(bool: boolean) {
    setIsSaved(bool);
  }

  useEffect(() => {
    fetchProjectList(pageNo);
    setIsSaved(false);
  }, [isSaved]);

  useEffect(() => {
    if (checkTokenValidate()) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, []);

  return (
    <div className="w-100 h-100 px-3 main-board">
      <div className="h-100">
        <div className="d-flex justify-content-between align-items-center px-3 pt-2">
          <BigTitle title="In Progress" />
          <BtnPlus onClick={handleShowCreate} />
        </div>
        {/* Body */}
        <div className="px-3 h-80">
          {isLogined && (
            <div className="mx-auto d-flex justify-content-around h-100">
              {projectList.map((item: project, idx: number) => {
                return (
                  <ProjectCard
                    key={idx}
                    item={item}
                    handleShowMore={(e) => handleShowMore(item)}
                  />
                );
              })}
            </div>
          )}
          {!isLogined && (
            <div className="pt-2">
              <p className="fw-bold text-center" style={{ fontSize: '0.8rem' }}>
                로그인 후에 이용 가능합니다.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* project를 생성하는 모달 */}
      <div>
        <CreateProjectModal
          handleClose={handleCloseCreate}
          show={showCreate}
          handleSaved={handleSaved}
        />
      </div>
      {/* project 상세 보기 모달 */}
      <div>
        <ProjectDetailModal
          handleClose={handleCloseMore}
          show={showMore}
          item={selectedProject}
          handleSaved={handleSaved}
        />
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
