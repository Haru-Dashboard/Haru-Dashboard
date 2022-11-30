import { NewsData } from '../../Utils/News';

const eMSEdgeKey = process.env.REACT_APP_MSEdgeKey;

export function fetchNews(): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(
      'https://api.bing.microsoft.com/v7.0/news/search?' +
        new URLSearchParams({ q: '기술', setlang: 'ko' }).toString(),
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': eMSEdgeKey + '',
        },
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((res) => {
          throw new Error(res.error.message);
        });
      })
      .then((data) => {
        const newsData: NewsData = {
          newsItemList: data.value,
          time: new Date().toString(),
        };
        localStorage.setItem('newsData', JSON.stringify(newsData));
        return resolve(newsData);
      })
      .catch((message) => {
        console.error(message);
      });
  });
}
