import { useState } from 'react';

import {
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Select, { components } from 'react-select'; //eslint-disable-line

import { addBoard, addTask, deleteTask } from '../../apps/kanban/store';

import { selectThemeColors } from '@utils';

const headerTxt = [
  '',
  'Create A New Board',
  'Create A New Task',
  'Delete Task',
  'Delete Workspace'
];

const bodyTxt = [
  '',
  'Board Name',
  'Task Title',
  'Really delete the task(s)?',
  'Really delete this workspace?'
];

const confirmBtnTxt = ['', 'Create', 'Create', 'Delete', 'Delete'];

const NewModal = (props) => {
  const {
    store,
    dispatch,
    modalType,
    deleteTaskArr,
    setDeleteTaskArr,
    setModalType,
    deleteWorkspace
  } = props;

  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [boardId, setBoardId] = useState(null);

  const handleInputTitle = (e) => {
    e.preventDefault();
    const inputTxt = e.target.value;
    setNewTitle(inputTxt);
    switch (modalType) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  };

  const confirmBtnClicked = () => {
    switch (modalType) {
      case 1:
        dispatch(
          addBoard({
            title: newTitle,
            id: newTitle.toLowerCase().replace(/ /g, '-'),
            workspaceId: store.selectedWorkspace._id
          })
        );
        break;
      case 2:
        dispatch(
          addTask({
            title: newTitle,
            boardId: boardId.value,
            workspaceId: store.selectedWorkspace._id
          })
        );
        break;
      case 3:
        dispatch(
          deleteTask({
            tasks: deleteTaskArr,
            workspaceId: store.selectedWorkspace._id
          })
        );
        setDeleteTaskArr([]);
        break;
      case 4:
        dispatch(deleteWorkspace({ id: store.selectedWorkspace._id }));
        break;
      default:
        break;
    }
    setModalType(0);
  };

  const cancleBtnClicked = () => {
    setModalType(0);
  };

  const BoardComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const boardOptions = store.boards.map((x) => {
    return { value: x._id, label: x.title };
  });

  return (
    <Modal
      isOpen={modalType > 0}
      toggle={() => cancleBtnClicked()}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={() => cancleBtnClicked()}>{headerTxt[modalType]}</ModalHeader>
      <ModalBody>
        <div>
          <Label className="form-label" for="validState">
            {bodyTxt[modalType]}
          </Label>

          {modalType >= 3 ? (
            modalType == 4 ? null : (
              deleteTaskArr.map((x) => {
                return (
                  <div>
                    <Label> - {x.title}</Label>
                  </div>
                );
              })
            )
          ) : (
            <Input
              type="text"
              id={`newModal${modalType}`}
              name={`newModal${modalType}`}
              placeholder=""
              onChange={handleInputTitle}
              valid={createNewValidation}
              invalid={!createNewValidation}
            />
          )}
          {modalType == 2 ? (
            <div>
              <Label className="form-label" for="validState">
                Select Board
              </Label>
              <Select
                id="board-title"
                value={boardId}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={boardOptions}
                theme={selectThemeColors}
                onChange={(data) => setBoardId(data)}
                components={{ Option: BoardComponent }}
              />
            </div>
          ) : null}
          <FormFeedback valid={createNewValidation}>
            {createNewValidation
              ? 'Sweet! That name is available.'
              : 'Oh no! That name is already taken.'}
          </FormFeedback>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={confirmBtnClicked}
          disabled={modalType < 3 && (!createNewValidation || !newTitle)}
        >
          {confirmBtnTxt[modalType]}
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewModal;
