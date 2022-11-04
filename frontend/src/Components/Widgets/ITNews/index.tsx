import React, { useState, useEffect } from 'react';
import CardComponent from '../../Common/CardComponent';
import './ITNews.css';

export default function ITNews() {
  const newsURL = 'https://api.bing.microsoft.com/v7.0/news';
  const URL = newsURL;

  const pastNewsInfor = localStorage.getItem('newsData');
  const [newsIndexNo, setNewsIndexNo] = useState(0);
  const setIndex0 = () => setNewsIndexNo(0);
  const setIndex1 = () => setNewsIndexNo(1);
  const setIndex2 = () => setNewsIndexNo(2);
  const eMSEdgeKey = process.env.REACT_APP_MSEdgeKey;
  const [searchOutput, setSearchOutput] = useState([
    { name: '', image: { thumbnail: { contentUrl: '' } } },
  ]);
  if (pastNewsInfor !== null) {
    useEffect(() => {
      setSearchOutput(JSON.parse(pastNewsInfor));
    }, []);
  }
  if (eMSEdgeKey !== undefined) {
    useEffect(() => {
      //
      fetch(URL, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': eMSEdgeKey,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchOutput(data.value);
          if (data.value !== null) {
            localStorage.setItem('newsData', JSON.stringify(data.value));
          }
        });
    }, []);
  }
  const content = (
    <div className="news-card">
      <div className="news-image">
        <img
          src={searchOutput[newsIndexNo].image.thumbnail.contentUrl}
          className="news-imageSrc"
        />
      </div>
      <div className="news-content">{searchOutput[newsIndexNo].name}</div>
    </div>
  );

  return (
    <div className="news board">
      <div className="news-background">
        <div className="news-title">
          <div className="news-title-img">
            <img src="/img/ITNewsImg.png" className="news-title-img-src" />
          </div>
          <div className="news-title-title">News</div>
        </div>
        <div className="news-main ">
          <CardComponent
            cardContent={content}
            cardWidth={'100%'}
            cardHeight={'100%'}
          />
        </div>
        <div className="news-index">
          <button
            className="news-index-0 btn-index"
            onClick={setIndex0}></button>
          <button
            className="news-index-1 btn-index"
            onClick={setIndex1}></button>
          <button
            className="news-index-2 btn-index"
            onClick={setIndex2}></button>
        </div>
      </div>
    </div>
  );
}
