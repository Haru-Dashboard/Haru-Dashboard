import React, { useState, useEffect } from 'react';
import { bookmark } from '../../../Utils/Bookmark';
import BtnPlus from '../../Common/Button/BtnPlus';
import BigTitle from '../../Common/Title/BigTitle';
import BookmarkItem from './BookmarkItem';
import BookmarkModal from './BookmarkModal';
import './index.css';

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState<bookmark[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchBookmarksFromLocal();
  }, []);

  const fetchBookmarksFromLocal = (): void => {
    const bookmarks = localStorage.getItem('bookmarks');
    if (bookmarks !== null) {
      setBookmarks(JSON.parse(bookmarks));
    }
  };

  // Modal 관련 함수
  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  const addBookmark: React.FormEventHandler = (e): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      '0': { value: string };
      '1': { value: string };
    };
    const title = target[0]['value'];
    const url = target[1]['value'];

    const tmpBookmarks = [...bookmarks, { title: title, url: url }];
    localStorage.setItem('bookmarks', JSON.stringify(tmpBookmarks));
    setBookmarks(tmpBookmarks);
    handleClose();
  };

  // BookmarkItem 관련 함수
  const deleteBookmark: React.MouseEventHandler = (e): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      dataset: { idx: string };
    };
    const idx = parseInt(target.dataset.idx);
    const tmpBookmarks = bookmarks.filter(
      (bookmark, bookmarkIdx) => bookmarkIdx !== idx,
    );
    localStorage.setItem('bookmarks', JSON.stringify(tmpBookmarks));
    setBookmarks(tmpBookmarks);
  };

  return (
    <div className="widget-bookmark">
      {/* header */}
      <div className="d-flex justify-content-between align-items-center">
        <BigTitle title="Bookmark" />
        <BtnPlus onClick={handleShow} />
      </div>

      {/* body */}
      <div className="container" style={{ height: '80%', overflow: 'auto' }}>
        <div className="row">
          {bookmarks.map((bookmark, idx) => (
            <BookmarkItem
              key={idx}
              idx={idx}
              bookmark={bookmark}
              deleteBookmark={deleteBookmark}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <BookmarkModal
        showModal={showModal}
        handleClose={handleClose}
        addBookmark={addBookmark}
      />
    </div>
  );
};

export default Bookmark;
