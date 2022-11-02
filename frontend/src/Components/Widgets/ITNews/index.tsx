import React from 'react';
import CardComponent from '../../Common/CardComponent';
import './ITNews.css';
import '../Calendar/Calendar.css';

const content = <div>내용</div>;
export default function ITNews() {
  return (
    <div className="news board">
      <div className="news-background">
        <div className="news-title">
          <div className="news-title-img">
            <img src="/img/ITNewsImg.png" className="news-title-img-src" />
          </div>
          <div className="news-title-title">IT News</div>
        </div>
        <div className="news-main ">
          <CardComponent
            cardContent={content}
            cardWidth={100}
            cardHeight={100}
            cardWidthUnit={'%'}
            cardHeightUnit={'%'}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
