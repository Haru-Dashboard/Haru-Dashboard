import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  getRoutineCategory,
  setRoutineCategory,
} from '../../../../API/Todo/routine';
import { Authentication } from '../../../../API/Authentication';

const RoutineFilterBar = () => {
  const tmp = [1, 1, 1];
  const defaultURL = process.env.REACT_APP_BACKURL;

  const [clickedFilter, setClickedFilter] = useState('전체');
  const [searchedWord, setSearchedword] = useState('');
  const [searchResult, setSearchResult] = useState<Array<string> | void>([]);
  const [localCategoryList, setLocalCategoryList] = useState(['']);

  const localCategories = localStorage.getItem('category');
  useEffect(() => {
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
    Authentication();
    const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
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
          // console.log(data);
          setSearchResult(data);
        });
    }
    // if (e.key === 'Enter') {
    //   // 검색어가 존재하고, 검색어가 리스트 안에 없으면 저장하기
    //   if (searchedWord.trim() && !filterList.includes(searchedWord)) {
    //     // console.log('into if');
    //     // state에 저장
    //     setFilterList(filterList.concat(searchedWord));

    //     // localStorage에 저장
    //     if (category) {
    //       const arr = JSON.parse(category);
    //       // console.log('arr=',arr, typeof(arr)); //object
    //       arr.push(searchedWord.trim());
    //       // console.log('pushed arr= ', arr);

    //       localStorage.setItem('category', JSON.stringify(arr));
    //     } else {
    //       localStorage.setItem('category', JSON.stringify([searchedWord]));
    //     }
    //     setSearchedword('');
    //   }
    // }
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
                      onClick={(e) => setClickedFilter(filter)}>
                      {filter}
                    </Dropdown.Item>
                  );
                })}
              </div>
              {/* {filterList.map((filter: string, idx: number) => {
                return (
                  <Dropdown.Item
                    href="#/action-1"
                    key={idx}
                    onClick={(e) => setClickedFilter(filter)}>
                    {filter}
                  </Dropdown.Item>
                );
              })} */}
            </div>
          )}
          {/* 검색창에 문자가 있는 경우 */}
          {searchedWord.trim() && (
            <div>
              {/* todo: '카테고리 검색' 이라고 넣고 위의 '내 카테고리'랑 폰트/레이아웃 똑같이 맞추기 */}
              <div>
                {typeof searchResult !== 'undefined' && searchResult && (
                  <div>
                    {/* axios로 받아온 searchResult를 출력하는 부분 */}
                    {searchResult.map((data: string, idx: number) => {
                      return (
                        <Dropdown.Item
                          href="#/action-1"
                          key={idx}
                          onClick={(e) => setClickedFilter(data)}>
                          {data}
                        </Dropdown.Item>
                      );
                    })}
                  </div>
                )}
              </div>
              <div>
                {/* 여기 작동 안함 */}
                {!searchResult && (
                  <Dropdown.Item href="#/action-1">
                    검색 결과가 없습니다
                  </Dropdown.Item>
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
