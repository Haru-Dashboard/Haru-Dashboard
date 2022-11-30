import React, { useState } from 'react';
import { getFaviconSrc } from '../../../Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { Bookmark } from '../../../Utils/Bookmark';

type BookmarkItemProps = {
  idx: number;
  bookmark: Bookmark;
  deleteBookmark: React.MouseEventHandler;
};

const BookmarkItem = ({ idx, bookmark, deleteBookmark }: BookmarkItemProps) => {
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

  const onMouseEnter = () => {
    setShowDeleteButton(true);
  };

  const onMouseLeave = () => {
    setShowDeleteButton(false);
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
          visibility: showDeleteButton ? 'visible' : 'hidden',
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
