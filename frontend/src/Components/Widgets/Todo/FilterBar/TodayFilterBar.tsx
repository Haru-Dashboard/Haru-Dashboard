import React, { useEffect, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-regular-svg-icons';

export type todayFilterBar = {
  handleCategory: (clicked: string) => void;
};

const TodayFilterBar = ({ handleCategory }: todayFilterBar) => {
  const [clickedFilter, setClickedFilter] = useState('ALL');
  const [filterList, setFilterList] = useState<Array<string>>([]);
  const [searchedWord, setSearchedword] = useState('');
  const [searchResult, setSearchResult] = useState(['']);

  const localCategories = localStorage.getItem('category');
  useEffect(() => {
    // localStorage에서 카테고리들 받아오기
    if (localCategories) {
      setFilterList(JSON.parse(localCategories));
    }
  }, []);

  // category를 검색하고 localStorage에 없으면 저장하는 함수
  const searchCategory = (e: React.KeyboardEvent) => {
    const keyword = e.target as HTMLInputElement;
    const category = localStorage.getItem('category');

    // 입력한 검색어 state에 저장
    setSearchedword(keyword.value);

    filterList.map((data: string) => {
      if (data.includes(searchedWord) && !searchResult.includes(data)) {
        return setSearchResult(searchResult.concat(data));
      }
    });

    if (e.key === 'Enter') {
      // 검색어가 존재하고, 검색어가 리스트 안에 없으면 저장하기
      if (searchedWord.trim() && !filterList.includes(searchedWord)) {
        // state에 저장
        setFilterList(filterList.concat(searchedWord));

        // localStorage에 저장하기
        // localStorage에 저장된 category가 있는 경우
        if (category) {
          const arr = JSON.parse(category);
          arr.push(searchedWord.trim());
          localStorage.setItem('category', JSON.stringify(arr));
        } else {
          localStorage.setItem('category', JSON.stringify([searchedWord]));
        }
        setSearchedword('');
      }
    }
  };

  // 클릭된 category를 state에 저장하고, parent에 보냄
  const fetchClicked = (clicked: string) => {
    // state에 저장하기
    setClickedFilter(clicked);
    // parent로 clicked 보냄
    handleCategory(clicked);
  };

  // 선택한 category 삭제하기
  const onClickDelete = (idx: number) => {
    if (localCategories) {
      // 리스트 전체
      const list = JSON.parse(localCategories);

      list.splice(idx, 1);
      localStorage.setItem('category', JSON.stringify(list)); // ok
      setFilterList(list);
    }
  };

  return (
    <div>
      {/* 
        dropdown 
        - need input here
        - if(enter key && search word is already in list) {
          show a search result
        } else if (enter key && search word not in list) {
          add word to the dropdown
        }
        - when click the li below, change button value
      */}
      <Dropdown>
        <Dropdown.Toggle
          size="sm"
          variant="light"
          id="dropdown-basic"
          style={{ fontSize: '0.8rem' }}
          className="py-0 px-2 opacity-50 fw-bold">
          {clickedFilter}
        </Dropdown.Toggle>

        {/* TODO: align 수정 */}
        <Dropdown.Menu align={{ lg: 'end' }} className="border border-0">
          <Dropdown.Header className="px-1">
            <Form.Control
              autoFocus
              maxLength={6}
              placeholder={'카테고리를 입력하세요'}
              className="shadow-sm border border-0 py-1"
              style={{ fontSize: '0.8rem' }}
              onKeyUp={(e) => searchCategory(e)}
            />
          </Dropdown.Header>

          {/* 검색창이 빈 경우 */}
          {!searchedWord.trim() && (
            <div>
              {/* <Dropdown.Item href="#/action-1">빈경우</Dropdown.Item> */}
              {filterList.map((filter: string, idx: number) => {
                return (
                  <div className="d-flex justify-content-between align-items-center my-1">
                    <Dropdown.Item
                      href="#/action-1"
                      key={idx}
                      className="py-0"
                      style={{ fontSize: '0.8rem' }}
                      onClick={(e) => fetchClicked(filter)}>
                      {filter}
                    </Dropdown.Item>
                    <FontAwesomeIcon
                      icon={faSquareMinus}
                      color="#FA5252"
                      onClick={(e) => onClickDelete(idx)}
                      key={idx}
                      className="col-1 py-0 ps-0 pe-2"
                    />
                  </div>
                );
              })}
            </div>
          )}
          {/* 검색창에 문자가 있는 경우 */}
          {searchedWord.trim() && (
            <div>
              {searchResult && (
                <div>
                  {/* filterList의 요소 중에서 searchedWord와 겹치는 게 있으면 searchResult 배열에 담기 */}
                  {searchResult.map((data: string, idx: number) => {
                    if (data.includes(searchedWord)) {
                      return (
                        <Dropdown.Item
                          href="#/action-1"
                          key={idx}
                          style={{ fontSize: '0.8rem' }}
                          onClick={(e) => fetchClicked(data)}>
                          {data}
                        </Dropdown.Item>
                      );
                    }
                  })}
                </div>
              )}
              {/* TODO: 여기 작동 안함 */}
              {!searchResult && (
                <Dropdown.Item href="#/action-1">검색결과없다</Dropdown.Item>
              )}
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TodayFilterBar;
