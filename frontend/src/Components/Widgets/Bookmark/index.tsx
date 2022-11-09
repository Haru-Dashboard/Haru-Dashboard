import React, { useState, useEffect } from 'react';
import BtnPlus from '../../Common/Button/BtnPlus';
import BookmarkItem from './BookmarkItem';
import BookmarkModal from './BookmarkModal';

export type bookmarkType = {
  title: string;
  url: string;
};

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState<bookmarkType[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookmarksFromLocal();
  }, []);

  const fetchBookmarksFromLocal = (): void => {
    chrome.storage.local.get('bookmarks').then((res) => {
      if (Object.keys(res).length !== 0 && res['bookmarks']) {
        setBookmarks(res['bookmarks']);
      } else {
        //
      }
    });
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
    chrome.storage.local
      .set({ bookmarks: tmpBookmarks })
      .then(() => {
        setBookmarks(tmpBookmarks);
      })
      .then(() => {
        handleClose();
      });
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
    chrome.storage.local.set({ bookmarks: tmpBookmarks }).then(() => {
      setBookmarks(tmpBookmarks);
    });
  };

  return (
    <div className="w-100 h-100 p-3">
      {/* header */}
      <div className="d-flex flex-row" style={{ height: '20%' }}>
        <img
          width="36px"
          height="36px"
          src="../img/icons8-bookmark-50.png"
          alt="bookmark"
        />
        <span className="text-white flex-grow-1">Bookmark</span>
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
