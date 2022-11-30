import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

const CommonFilterBar = ({ handleCategory }: any) => {
  /*
    CommonFilterBar
    - local storage에 저장되어 있는 카테고리를 가져와 띄워 주기만 하는 컴포넌트
  */
  const [localCategoryList, setLocalCategoryList] = useState(['ALL']);
  const [clickedFilter, setClickedFilter] = useState('ALL');
  const localCategories = localStorage.getItem('category');

  useEffect(() => {
    // localStorage에서 카테고리들 받아오기
    // localCategoryList.concat(JSON.parse(localCategories)),
    if (localCategories) {
      setLocalCategoryList(JSON.parse(localCategories));
    }
  }, []);

  // 클릭된 category를 state에 저장하고, parent에 보냄
  const fetchClicked = (clicked: string) => {
    // state에 저장하기
    setClickedFilter(clicked);
    // parent로 clicked 보냄
    handleCategory(clicked);
  };

  // localCategories에 변경 사항이 생길 때마다 갱신; okay
  useEffect(() => {
    if (localCategories) {
      // const arr = ['ALL'];
      setLocalCategoryList(JSON.parse(localCategories));
    }
  }, [localCategories]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-1">
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            variant="light"
            id="dropdown-basic"
            style={{ fontSize: '0.8rem' }}
            className="py-0 px-2 opacity-50 fw-bold">
            {clickedFilter}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {localCategoryList.map((filter: string, idx: number) => {
              return (
                <Dropdown.Item
                  href="#/action-1"
                  key={idx}
                  className="py-0 my-2"
                  style={{ fontSize: '0.8rem' }}
                  onClick={(e) => fetchClicked(filter)}>
                  {filter}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CommonFilterBar;
