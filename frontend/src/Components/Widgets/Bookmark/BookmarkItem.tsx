import React, { useState } from 'react';
import { getFaviconSrc } from '../../../Utils';
import { bookmarkType } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

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
      {/* Delete Button */}
      <div
        className="bookmark-minus-button"
        onClick={deleteBookmark}
        style={{
          visibility: showEllipsis ? 'visible' : 'hidden',
        }}>
        <FontAwesomeIcon
          data-idx={idx}
          style={{ width: '80%' }}
          className={'fa-sm'}
          icon={faMinus}
        />
      </div>

      {/* Bookmark Image */}
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

      {/* Bookmark Title */}
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
