import React, { useState } from 'react';
import { getFaviconSrc } from '../../../Utils';
import { bookmarkType } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ListGroup from 'react-bootstrap/ListGroup';

type bookmarkItemProps = {
  idx: number;
  bookmark: bookmarkType;
  deleteBookmark: React.MouseEventHandler;
};

const BookmarkItem = ({ idx, bookmark, deleteBookmark }: bookmarkItemProps) => {
  const [showEllipsis, setShowEllipsis] = useState(false);

  const onMouseEnter = () => {
    setShowEllipsis(true);
  };

  const onMouseLeave = () => {
    setShowEllipsis(false);
  };

  return (
    <div
      className="bookmark-wrapper position-relative col-3 p-1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {/* 북마크 버튼 그룹 */}
      <OverlayTrigger
        placement="right-start"
        delay={{ show: 250, hide: 1000 }}
        overlay={
          <ListGroup>
            <ListGroup.Item>수정</ListGroup.Item>
            <ListGroup.Item
              data-idx={idx}
              style={{ backgroundColor: 'white' }}
              onClick={deleteBookmark}>
              삭제
            </ListGroup.Item>
          </ListGroup>
        }>
        <span
          className="position-absolute end-0 d-flex justify-content-center"
          style={{
            borderRadius: '8px',
            width: '16px',
            visibility: showEllipsis ? 'visible' : 'hidden',
          }}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </span>
      </OverlayTrigger>

      {/* 북마크 이미지 */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ aspectRatio: '1/1' }}>
        <a className="text-decoration-none text-reset" href={bookmark.url}>
          <img
            width="40"
            height="40"
            src={getFaviconSrc(bookmark.url)}
            alt="favicon"
            style={{ borderRadius: '5px' }}
          />
        </a>
      </div>

      {/* 북마크 이름 */}
      <p
        className="text-center my-0"
        style={{
          fontSize: '0.3rem',
          color: 'white',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}>
        <a className="text-decoration-none text-reset" href={bookmark.url}>
          {bookmark.title}
        </a>
      </p>
    </div>
  );
};

export default BookmarkItem;
