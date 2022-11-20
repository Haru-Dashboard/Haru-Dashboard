import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchNews } from '../../../API/News';
import { isWithinDay } from '../../../Utils';
import { newsData, newsItem } from '../../../Utils/News';
import BigTitle from '../../Common/Title/BigTitle';
import './index.css';

const News = () => {
  const [index, setIndex] = useState<number>(0);
  const [newsItemList, setNewsItemList] = useState<newsItem[]>([]);

  useEffect(() => {
    let flag = true;
    const tmpNewsData = localStorage.getItem('newsData');
    if (tmpNewsData) {
      const newsData: newsData = JSON.parse(tmpNewsData);
      if (isWithinDay(newsData.time)) {
        flag = false;
        setNewsItemList(newsData.newsItemList);
      }
    }
    if (flag) {
      fetchNews().then((newsData) => {
        setNewsItemList(newsData.newsItemList);
      });
    }
  }, []);

  const handleSelect = (
    eventKey: number,
    event: Record<string, unknown> | null,
  ) => {
    setIndex(eventKey);
  };

  return (
    <div className="widget-news d-flex flex-column">
      {/* Title */}
      <div className="justify-content-between align-items-center">
        <BigTitle title="News" />
      </div>

      {/* Carousel */}
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {newsItemList.map(
          (newsItem, idx) =>
            newsItem.image && (
              <Carousel.Item key={idx}>
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
