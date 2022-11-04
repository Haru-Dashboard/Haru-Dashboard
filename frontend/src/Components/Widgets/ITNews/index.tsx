import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './ITNews.css';

const URL = 'https://api.bing.microsoft.com/v7.0/news';
const eMSEdgeKey = process.env.REACT_APP_MSEdgeKey;

const ITNews = () => {
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
    <div className="news-background p-3">
      {/* Title */}
      <div className="news-title d-flex" style={{ height: '15%' }}>
        <img
          src="/img/ITNewsImg.png"
          className="news-title-img-src"
          style={{ height: '100%', aspectRatio: '1/1' }}
        />
        <div className="news-title-title">News</div>
      </div>

      {/* Carousel */}
      <div
        className="mx-auto"
        style={{
          width: '80%',
          height: '70%',
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '20px',
        }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {news.map((newsItem, idx) => (
            <Carousel.Item key={idx}>
              <a
                className="carousel-anchor text-decoration-none text-reset"
                href={newsItem.url}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: '100%', height: '70%' }}>
                  <img
                    width="80%"
                    height="80%"
                    style={{
                      aspectRatio: '6/5',
                    }}
                    src={newsItem.image.thumbnail.contentUrl}
                    alt="First slide"
                  />
                </div>
                <p
                  className="mx-auto my-0"
                  style={{
                    width: '85%',
                    height: '20%',
                    fontSize: '0.6rem',
                    overflow: 'ellipsis',
                  }}>
                  {newsItem.name}
                </p>
              </a>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ITNews;
