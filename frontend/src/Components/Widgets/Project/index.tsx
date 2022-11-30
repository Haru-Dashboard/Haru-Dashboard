import React, { useState, useEffect } from 'react';
import CreateProjectModal from './CreateProjectModal';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectCard from './ProjectCard';
import BigTitle from '../../Common/Title/BigTitle';
import BtnPlus from '../../Common/Button/BtnPlus';
import { Project } from '../../../Utils/Project';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { tokenExists, getAccessToken } from '../../../API/Authentication';

const Project = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [pagedProjectList, setPagedProjectList] = useState<Project[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPageNo, setTotalPageNo] = useState(5);
  const [isLogined, setIsLogined] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchProjectList();
  }, []);

  function fetchProjectList() {
    const backURL = process.env.REACT_APP_BACKURL;
    if (tokenExists()) {
      fetch(backURL + 'projects', {
        method: 'GET',
        headers: { Authorization: getAccessToken() },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length) {
            setProjectList(data.reverse());
            setPagedProjectList(data.slice(pageNo, pageNo + 3));
            setTotalPageNo(Math.ceil(data.length / 3));
          }
        });
    }
  }

  // creation modal
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => {
    if (projectList.length >= 15) {
      Swal.fire({
        text: 'In Progress는 15개까지 생성 가능합니다',
        icon: 'error',
        showConfirmButton: true,
        timer: 1000,
      });
    } else {
      if (isLogined) {
        setShowCreate(true);
      } else {
        Swal.fire({
          text: '로그인 후에 이용 가능합니다',
          icon: 'error',
          showConfirmButton: true,
          timer: 1000,
        });
      }
    }
  };

  // detail modal
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project>({
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
  function handleShowMore(item: Project) {
    setSelectedProject(item);
    setShowMore(true);
  }
  function handleCloseMore() {
    setShowMore(false);
  }

  function handleSaved(bool: boolean) {
    setIsSaved(bool);
  }

  function onClickBefore() {
    const beforePage = (pageNo + totalPageNo - 1) % totalPageNo;
    setPageNo(beforePage);
    setPagedProjectList(projectList.slice(beforePage * 3, beforePage * 3 + 3));
  }
  function onClickAfter() {
    const nextPage = (pageNo + totalPageNo + 1) % totalPageNo;
    setPageNo(nextPage);
    setPagedProjectList(projectList.slice(nextPage * 3, nextPage * 3 + 3));
  }

  function handlePageNo() {
    setPageNo(0);
  }

  useEffect(() => {
    fetchProjectList();
    setIsSaved(false);
  }, [isSaved]);

  useEffect(() => {
    if (tokenExists()) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, []);

  return (
    <div className="w-100 h-100 pjt-board">
      <div className="h-100">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <BigTitle title="In Progress" />
            <BtnPlus onClick={handleShowCreate} />
          </div>
        </div>
        {/* Body */}
        <div className="h-80">
          {isLogined && (
            <div className="h-100 mx-auto d-flex justify-content-around align-items-center">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={'hover'}
                color={'black'}
                onClick={onClickBefore}
              />
              <div className="container h-100">
                <div className="row h-100">
                  {pagedProjectList.map((item: Project, idx: number) => (
                    <div className="col-4" key={idx}>
                      <ProjectCard
                        item={item}
                        handleShowMore={(e) => handleShowMore(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={'hover'}
                color={'black'}
                onClick={onClickAfter}
              />
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
          handlePageNo={handlePageNo}
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
