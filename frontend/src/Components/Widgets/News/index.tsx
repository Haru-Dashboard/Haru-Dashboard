import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import BigTitle from '../../Common/Title/BigTitle';
import './index.css';

const URL = 'https://api.bing.microsoft.com/v7.0/news';
const eMSEdgeKey = process.env.REACT_APP_MSEdgeKey;

const News = () => {
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([
    { name: '', url: '', image: { thumbnail: { contentUrl: '' } } },
  ]);

  useEffect(() => {
    // TODO: news를 저장한 시점이 현재로부터 일정 시간 이상이면 새로 fetch하는 로직 추가
    const pastNews = localStorage.getItem('newsData');
    if (pastNews !== null) {
      setNews(JSON.parse(pastNews));
    } else {
      fetchNews();
    }
  }, []);

  const fetchNews = (): void => {
    if (eMSEdgeKey !== undefined) {
      fetch(URL, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': eMSEdgeKey,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.value !== null) {
            localStorage.setItem('newsData', JSON.stringify(data.value));
          }
          setNews(data.value);
        });
    }
  };

  const handleSelect = (
    selectedIndex: number,
    e: Record<string, unknown> | null,
  ) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="widget-news d-flex flex-column">
      {/* Title */}
      <div className="justify-content-between align-items-center">
        <BigTitle title="News" />
      </div>

      {/* Carousel */}
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {news.map(
          (newsItem, newsItemIdx) =>
            newsItem.image && (
              <Carousel.Item key={newsItemIdx}>
                <a
                  className="carousel-anchor text-decoration-none text-reset d-inline-flex flex-column"
                  href={newsItem.url}>
                  <div className="news-image-wrapper d-flex justify-content-center">
                    <img src={newsItem.image.thumbnail.contentUrl} alt="News" />
                  </div>
                  <p className="news-title mx-auto my-0">{newsItem.name}</p>
                </a>
              </Carousel.Item>
            ),
        )}
      </Carousel>
    </div>
  );
};

export default News;
