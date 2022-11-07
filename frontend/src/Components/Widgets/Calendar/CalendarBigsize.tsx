import React from 'react';
import './modal.css';

export default function CalendarBigsize(props: any) {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? 'openModal modal' : 'modal'}
      style={{
        width: screenWidth * 0.5,
        height: screenHeight * 0.5,
      }}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}
