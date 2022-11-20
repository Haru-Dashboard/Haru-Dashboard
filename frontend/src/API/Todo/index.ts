const defaultURL = process.env.REACT_APP_BACKURL;

// TODO: 이 부분 채우기
export const getRoutineList = () => {
  const url = '';
  fetch(defaultURL + url, {
    method: 'GET',
    headers: {},
    body: JSON.stringify({}),
  }).then();
};
