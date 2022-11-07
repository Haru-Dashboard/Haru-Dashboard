import React, { useState } from 'react';
import BigTitle from '../../Common/Title/BigTitle';
import CardComponent from '../../Common/CardComponent';
import BtnPlus from '../../Common/Button/BtnPlus';
import CreateProjectModal from './CreateProjectModal';
import ProjectMoreModal from './ProjectMoreModal';
import InsideCard from './InsideCard';

const Project = () => {
  // 카드 컴포넌트를 세번 출력시키기 위한 임시 리스트
  const list = [1, 1, 1];
  const [showCreate, setShowCreate] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [projectList, setProjectList] = useState([{}]);

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const handleCloseMore = () => setShowMore(false);
  const handleShowMore = () => setShowMore(true);

  /* TODO: project 조회 fetch 함수
  - 조회한 배열을 projectList에 저장하고
  - 아래 DOM에 list를 projectList로 바꿔주세요
  */
  const getProject = () => {};

  return (
    <div className="w-100 h-100 p-3 sub-board">
      <div className="h-100">
        <div className="d-flex justify-content-between pe-3">
          <BigTitle title="In Progress" color="white" />
          <BtnPlus onClick={handleShowCreate} />
        </div>
        <div className="d-flex justify-content-between h-70 mt-1">
          {list.map((item) => {
            return (
              <div onClick={handleShowMore} className="w-30 h-100">
                <CardComponent
                  cardWidth="100%"
                  cardHeight="100%"
                  cardContent={<InsideCard />}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* project를 생성하는 모달 */}
      <div>
        <CreateProjectModal handleClose={handleCloseCreate} show={showCreate} />
      </div>
      {/* project 상세 보기 모달 */}
      <div>
        <ProjectMoreModal handleClose={handleCloseMore} show={showMore} />
      </div>
      <div></div>
    </div>
  );
};

export default Project;
