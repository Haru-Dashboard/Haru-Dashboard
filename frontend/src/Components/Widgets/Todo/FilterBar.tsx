import React, { useEffect, useState } from 'react';
// import Dropdown from './Dropdown';
import { Dropdown } from 'react-bootstrap';

const FilterBar = () => {
  const [clickedFilter, setClickedFilter] = useState('전체')
  const [filterList, setFilterList] = useState([''])
  const [searchedWord, setSearchedword] = useState('')
  const [searchResult, setSearchResult] = useState([''])

  useEffect(()=> {
    // localStorage에서 카테고리들 받아오기
    const localCategories = localStorage.getItem('category')
    if (localCategories) {
      // console.log('categories in local storage when created=', localCategories, typeof(localCategories));
      setFilterList(JSON.parse(localCategories))
    }
  }, [])

  const searchCategory = (e : React.KeyboardEvent<HTMLInputElement>) =>{
    const keyword = e.target as HTMLInputElement
    const category= localStorage.getItem('category')
    console.log(keyword.value);
    console.log(e.key);
    console.log(category, typeof(category));
    
    // console.log('searchResult=', searchResult);
    
    
    setSearchedword(keyword.value)

    // 검색 결과 초기화
    // setSearchResult([''])
    filterList.map((data: string)=> {
      if (data.includes(searchedWord) && !searchResult.includes(data)) {
        setSearchResult(searchResult.concat(data))
      }
    })
    // console.log(e.key);
    if(e.key==='Enter'){
      // 검색어가 존재하고, 검색어가 리스트 안에 없으면 저장하기
      // console.log('hello enter');
      
      if (searchedWord.trim() && !filterList.includes(searchedWord)) {
        // console.log('into if');
        // state에 저장
        setFilterList(filterList.concat(searchedWord))

        //localStorage에 저장
        if (category) {
          const arr = JSON.parse(category)
          // console.log('arr=',arr, typeof(arr)); //object
          arr.push(searchedWord.trim())
          // console.log('pushed arr= ', arr);
          
          localStorage.setItem('category', JSON.stringify(arr))
        } else {
          localStorage.setItem('category', JSON.stringify(searchedWord))

        }
        setSearchedword('')
      }
      
    }
    
  }

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
      <Dropdown.Toggle variant="light" id="dropdown-basic" className='py-0 px-2 opacity-75'>
        {clickedFilter}
      </Dropdown.Toggle>

      <Dropdown.Menu align={{ lg: 'start' }}>
        <Dropdown.Header>
          <input type="text" 
            maxLength={6} 
            placeholder={'카테고리를 입력하세요'}
            onKeyUp={e=> searchCategory(e)}/>
        </Dropdown.Header>

        {/* 검색창이 빈 경우 */}
        {!searchedWord.trim() && (
          <div>
            {/* <Dropdown.Item href="#/action-1">빈경우</Dropdown.Item> */}
            {filterList.map((filter)=>{
              return <Dropdown.Item href="#/action-1"
                onClick={e=> setClickedFilter(filter)}>{filter}</Dropdown.Item>
            })}
          </div>
        )}
        {/* 검색창에 문자가 있는 경우 */}
        {searchedWord.trim() && (
          <div>
            {searchResult && (
              <div>
                {/* filterList의 요소 중에서 searchedWord와 겹치는 게 있으면 searchResult 배열에 담기 */}
                {searchResult.map((data: string)=> {
                  if (data.includes(searchedWord)) {
                    return <Dropdown.Item href="#/action-1"
                    onClick={e=> setClickedFilter(data)}>{data}</Dropdown.Item>
                  }
            })}
              </div>
            )} 
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

export default FilterBar;