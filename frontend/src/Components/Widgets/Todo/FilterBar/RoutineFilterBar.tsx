import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { todayFilterBar } from './TodayFilterBar';
import { routineFilterBar } from '../../../../Utils/Todo';
import { Cookies } from 'react-cookie';

const RoutineFilterBar = ({ handleCategory, clicked }: routineFilterBar) => {
  const defaultURL = process.env.REACT_APP_BACKURL;

  const [clickedFilter, setClickedFilter] = useState('전체');
  const [searchedWord, setSearchedword] = useState('');
  const [searchResult, setSearchResult] = useState<Array<string> | void>([]);
  const [localCategoryList, setLocalCategoryList] = useState(['']);

  const localCategories = localStorage.getItem('category');
  useEffect(() => {
    // clicked를 기본 값으로
    if (clicked) {
      setClickedFilter(clicked);
    }
    // localStorage에서 카테고리들 받아오기
    if (localCategories) {
      setLocalCategoryList(JSON.parse(localCategories));
    }
  }, []);

  // localCategories에 변경 사항이 생길 때마다 갱신; okay
  useEffect(() => {
    if (localCategories) {
      setLocalCategoryList(JSON.parse(localCategories));
    }
  }, [localCategories]);

  const searchCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // keyword : 사용자가 입력한 검색어를 받아옴
    const keyword = e.target as HTMLInputElement;

    // 입력한 검색어 state에 저장
    setSearchedword(keyword.value);

    /* 
      Todo: routine category 불러오는 axios 함수; API/todo.ts에서 수정하기
      - 받아온 데이터를 setSearchedResult로 저장하기
    */
    const accessToken = 'Bearer ' + new Cookies().get('accessToken');
    if (accessToken !== null) {
      const url = `categories?keyword=${keyword.value}`;
      fetch(defaultURL + url, {
        method: 'GET',
        headers: { Authorization: accessToken },
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          setSearchResult(data);
        });
      if (typeof searchResult === 'undefined' && e.key === 'Enter') {
        setSearchResult([keyword.value]);
        setClickedFilter(keyword.value);
      }
    }
  };

  const onClickFilter = (clicked: string) => {
    handleCategory(clicked);
    setClickedFilter(clicked);
  };

  useEffect(() => {
    if (clicked) {
      setClickedFilter(clicked);
    }
  }, []);
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

        <Dropdown.Menu>
          {/* dropdown input */}
          <Dropdown.Header>
            <input
              type="text"
              maxLength={6}
              placeholder={'카테고리를 입력하세요'}
              onKeyUp={(e) => searchCategory(e)}
            />
          </Dropdown.Header>

          {/* 검색창이 빈 경우 */}
          {!searchedWord.trim() && (
            <div>
              <Dropdown.Item href="#/action-1" style={{ fontSize: '0.8rem' }}>
                내 카테고리
              </Dropdown.Item>
              <div className="border border-1 mx-2">
                {localCategoryList.map((filter: string, idx: number) => {
                  return (
                    <Dropdown.Item
                      href="#/action-1"
                      key={idx}
                      className="py-0 my-2"
                      style={{ fontSize: '0.8rem' }}
                      onClick={(e) => onClickFilter(filter)}>
                      {filter}
                    </Dropdown.Item>
                  );
                })}
              </div>
            </div>
          )}
          {/* 검색창에 문자가 있는 경우 */}
          {searchedWord.trim() && (
            <div>
              {/* todo: '카테고리 검색' 이라고 넣고 위의 '내 카테고리'랑 폰트/레이아웃 똑같이 맞추기 */}
              {/* 지금 입력한 카테고리가 내 카테고리 안에 있으면 그 내용을 보여주고 없으면 내가 입력한 카테고리만 보여주기 */}

              {/* 내가 입력한 카테고리 */}
              {typeof searchResult === 'undefined' && (
                <div className="my-2" style={{ fontSize: '0.8rem' }}>
                  <Dropdown.Item>
                    검색 결과가 없습니다. 새로 추가해주세요
                  </Dropdown.Item>
                  <div className="d-flex justify-content-between align-items-center my-1">
                    <Dropdown.Item
                      href="#/action-1"
                      className="py-0"
                      onClick={(e) => onClickFilter(searchedWord)}
                      style={{ fontSize: '0.8rem' }}>
                      {searchedWord}
                    </Dropdown.Item>
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      color="#FA5252"
                      onClick={(e) => onClickFilter(searchedWord)}
                      className="col-1 py-0 ps-0 pe-2"
                    />
                  </div>
                </div>
              )}
              <div>
                {typeof searchResult !== 'undefined' && searchResult && (
                  <div>
                    <Dropdown.Item
                      href="#/action-1"
                      style={{ fontSize: '0.8rem' }}>
                      검색 결과
                    </Dropdown.Item>
                    {/* axios로 받아온 searchResult를 출력하는 부분 */}
                    {searchResult.map((data: string, idx: number) => {
                      return (
                        <Dropdown.Item
                          href="#/action-1"
                          key={idx}
                          className="py-0 my-2"
                          style={{ fontSize: '0.8rem' }}
                          onClick={(e) => onClickFilter(data)}>
                          {data}
                        </Dropdown.Item>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default RoutineFilterBar;
