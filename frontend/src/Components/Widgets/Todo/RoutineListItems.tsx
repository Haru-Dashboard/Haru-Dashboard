import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareMinus,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import RoutineMoreModal from './RoutineMoreModal';
import { defaultURL } from '../../../API';
import { tokenExists, getAccessToken } from '../../../API/Authentication';
import { localRoutine } from '../../../Utils/Todo';

const RoutineListItems = ({
  listItem,
  isReload,
  handleDelete,
  handleUpdate,
}: // handleIsCompleted,
any) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickMore = () => {
    handleShow();
  };
  const onClickDelete = () => {
    const url = `todos/${listItem.todoId}`;
    if (tokenExists()) {
      fetch(defaultURL + url, {
        method: 'DELETE',
        headers: {
          Authorization: getAccessToken(),
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        handleDelete(true);
        Swal.fire({
          text: '삭제되었습니다',
          icon: 'success',
          showConfirmButton: true,
          timer: 1000,
        });
      });
    }
  };

  // const [isSaved, setIsSaved] = useState(false);
  const handleUpdateEmit = (bool: boolean) => {
    handleUpdate(bool);
  };

  // todo toggling
  const saveIsCompleted = () => {
    /*
      localstorage에서 현재 저장된 목록을 가져온다.
      목록을 순회하면서 id가 선택된 todo와 같은 인덱스를 찾는다
      해당 인덱스에 splice를 써서 isCompleted만 바꿔서 다시 넣는다
      그리고 다시 로컬 스토리지에 저장한다.
     */
    const localRoutine = localStorage.getItem('routine');

    if (localRoutine) {
      const localRoutineList: Array<localRoutine> = JSON.parse(localRoutine);

      localRoutineList.map((routine: localRoutine, idx: number) => {
        if (routine.id === listItem.todoId) {
          localRoutineList.splice(idx, 1, {
            id: routine.id,
            isCompleted: !routine.isCompleted,
          });
        }
      });
      localStorage.setItem('routine', JSON.stringify(localRoutineList));
      handleIsCompleted(localRoutineList);
    }
  };

  const handleIsCompleted = (localRoutineList: Array<localRoutine>) => {
    // console.log('handleiscompleted');

    localRoutineList.map((routine: localRoutine) => {
      if (routine.id === listItem.todoId) {
        setIsCompleted(routine.isCompleted);
      }
    });
  };

  useEffect(() => {
    const localRoutine = localStorage.getItem('routine');
    if (localRoutine) {
      handleIsCompleted(JSON.parse(localRoutine));
    }
  }, [isReload]);

  useEffect(() => {
    const localRoutine = localStorage.getItem('routine');
    if (localRoutine) {
      handleIsCompleted(JSON.parse(localRoutine));
    }
  }, []);

  return (
    <div>
      <div className="row ms-2 mt-2 hover align-items-center">
        {/* TODO: 선택한 요소만 체크된 박스로 바꾸기, todo 저장 시에 isCompleted: false를 기본으로 체크되면 localStorage isCompleted: true로 바뀌게 */}
        <FontAwesomeIcon
          icon={isCompleted ? faSquareCheck : faSquare}
          color="#FFFFFF"
          className="col-1 p-0"
          onClick={saveIsCompleted}
        />
        <div
          className="col-2 px-0 py-1 mx-1 my-0 text-center overflow-hidden border border-0 rounded"
          style={{
            fontSize: '0.5rem',
            backgroundColor: '#DFBBB1',
            whiteSpace: 'nowrap',
          }}>
          {listItem.category.slice(0, 4)}
        </div>
        <div
          className="col-6 p-0 m-0 overflow-hidden"
          onClick={onClickMore}
          style={{
            whiteSpace: 'nowrap',
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}>
          {listItem.title}
        </div>
        {/* TODO: 각각 idx를 인식해서 해당 데이터만 지우기 */}
        <FontAwesomeIcon
          icon={faSquareMinus}
          color="#FA5252"
          onClick={onClickDelete}
          key={listItem.todoId}
          className="col-1 p-0 ms-1 hover"
        />
      </div>
      <div>
        <RoutineMoreModal
          handleClose={handleClose}
          show={show}
          listItem={listItem}
          setIsCompleted={setIsCompleted}
          handleUpdateEmit={handleUpdateEmit}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
};

export default RoutineListItems;
