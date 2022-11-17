import React, { useState, useEffect } from 'react';
import CreateProjectModal from './CreateProjectModal';
import ProjectDetailModal from './ProjectDetailModal';
import ProjectCard from './ProjectCard';
import BigTitle from '../../Common/Title/BigTitle';
import BtnPlus from '../../Common/Button/BtnPlus';
import { project } from '../../../Utils/Project';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { tokenExists, getAccessToken } from '../../../API/Authentication';

const Project = () => {
  const [projectList, setProjectList] = useState<project[]>([]);
  const [pagedProjectList, setPagedProjectList] = useState<project[]>([]);
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
            setTotalPageNo(Math.ceil(data.length / 3) - 1);
          }
        });
    }
  }

  // creation modal
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => {
    console.log(projectList.length);

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

  const [showBefore, setShowBefore] = useState(false);
  const [showAfter, setShowAfter] = useState(true);

  function onClickBefore() {
    if (pageNo === 0) {
      setShowBefore(false);
    } else {
      setPageNo(pageNo - 1);
      setPagedProjectList(
        projectList.slice((pageNo - 1) * 3, (pageNo - 1) * 3 + 3),
      );
    }
  }
  function onClickAfter() {
    if (pageNo === totalPageNo) {
      setShowAfter(false);
    } else {
      setPageNo(pageNo + 1);
      setPagedProjectList(
        projectList.slice((pageNo + 1) * 3, (pageNo + 1) * 3 + 3),
      );
    }
  }

  function handlePageNo() {
    setPageNo(0);
  }

  useEffect(() => {
    console.log('change page', pageNo);
    console.log(projectList);

    if (pageNo === 0) {
      console.log('first page');

      setShowBefore(false);
    } else {
      setShowBefore(true);
    }

    if (pageNo === totalPageNo) {
      console.log('lastpage');

      setShowAfter(false);
    } else {
      setShowAfter(true);
    }
  }, [pageNo]);

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
    <div className="w-100 h-100 px-3 pjt-board">
      <div className="h-100">
        <div className="px-3 pt-2">
          <div className="d-flex justify-content-between align-items-center pt-2 pe-4">
            <BigTitle title="In Progress" />
            <BtnPlus onClick={handleShowCreate} />
          </div>
        </div>
        {/* Body */}
        <div className="px-3 h-80">
          {isLogined && (
            <div className="h-100 mx-auto d-flex justify-content-around align-items-center h-100">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={showBefore ? 'hover' : ''}
                color={showBefore ? 'black' : 'grey'}
                onClick={onClickBefore}
              />
              <div className="container">
                <div className="row">
                  {pagedProjectList.map((item: project, idx: number) => {
                    return (
                      <div className="col-4">
                        <ProjectCard
                          key={idx}
                          item={item}
                          handleShowMore={(e) => handleShowMore(item)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={showAfter ? 'hover' : ''}
                color={showAfter ? 'black' : 'grey'}
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
