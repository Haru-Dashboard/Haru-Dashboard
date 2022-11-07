const defaultURL = process.env.REACT_APP_BACKURL;
// TODO: todo routine bar - category 조회
export const getRoutineCategory = (params: string) => {
  const url = `/categories?keyword=${params}`;
  fetch(defaultURL + url, {
    method: 'GET',
    headers: {},
  });
};

/* 
  TODO: todo routine bar - category 등록
  - 추후에 params와 그 타입은 맞게 바꿔주세요
*/
export const setRoutineCategory = (params: any) => {
  const url = '';
  fetch(defaultURL + url, {
    method: 'POST',
    headers: {},
  }).then();
};
