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
  const [projectList, setProjectList] = useState<project[]>([
    {
      id: 0,
      title: '테스트 하드 코딩',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolorum fugit quidem repudiandae nesciunt eum repellendus nemo odit repellat, nostrum, error ab commodi magni suscipit expedita optio, corrupti natus quaerat?',
      startDate: '2022-11-11',
      endDate: '2022-11-21',
      projectLinks: [
        {
          id: 0,
          name: '네이버',
          link: 'https://www.naver.com',
        },
      ],
      projectLabels: [
        {
          id: 0,
          name: '프로젝트',
        },
        {
          id: 1,
          name: '알고리즘',
        },
      ],
      imageInfo: {
        id: 0,
        imageUrl:
          'https://www.bing.com/th?id=OVFT.LWO_waeKPIzt1YEa-QnGVi&pid=News',
        originName: '뉴스',
      },
    },
    {
      id: 1,
      title: '이미지 테스트',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolorum fugit quidem repudiandae nesciunt eum repellendus nemo odit repellat, nostrum, error ab commodi magni suscipit expedita optio, corrupti natus quaerat?',
      startDate: '2022-11-12',
      endDate: '2022-11-22',
      projectLinks: [
        {
          id: 0,
          name: '구글',
          link: 'https://www.google.com',
        },
      ],
      projectLabels: [
        {
          id: 0,
          name: '다섯글자아',
        },
        {
          id: 1,
          name: '여섯글자아',
        },
      ],
      imageInfo: {
        id: 0,
        imageUrl:
          'chrome-extension://fnacnoopaiadojkoojmobdjnlilhgikc/js/a00585464097c213e304.png',
        originName: '뉴스',
      },
    },
  ]);
  const [pageNo, setPageNo] = useState(0);

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
  const handleShowCreate = () => setShowCreate(true);

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
        link: '',
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

  return (
    <div className="w-100 h-100 p-3 sub-board">
      <div className="h-100">
        <div className="d-flex justify-content-between align-items-center pe-3">
          <BigTitle title="In Progress" />
          <BtnPlus onClick={handleShowCreate} />
        </div>
        {/* Body */}
        <div className="d-flex justify-content-center h-90">
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
        {/* Footer */}
      </div>
      {/* project를 생성하는 모달 */}
      <div>
        <CreateProjectModal handleClose={handleCloseCreate} show={showCreate} />
      </div>
      {/* project 상세 보기 모달 */}
      <div>
        <ProjectDetailModal
          handleClose={handleCloseMore}
          show={showMore}
          item={selectedProject}
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
