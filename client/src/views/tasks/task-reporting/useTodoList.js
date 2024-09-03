import { Fragment, useMemo, useState, useContext } from 'react';

import Avatar from '@components/avatar';

import { Button, ButtonGroup, Input, Tooltip } from 'reactstrap';

import { Check } from 'react-feather';

import { uploadTodoAnsFile, sendEmail } from './store/action';
import { todoFileUploadingInit, todoFileUploadingReset } from './store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../lib/useMessage';
import moment from 'moment';
import socketio from 'socket.io-client';

// const socket = socketio('http://localhost:5000/api');
const socket = socketio('https://mymanager.com/api');

socket.connect();

const useTodoList = ({ selectedWorkingCheckList, setSelectedWorkingCheckList, taskTab }) => {
  const [todoList, setTodoList] = useState([]);
  const [zoomPhotoState, setZoomPhotoState] = useState(null);
  const { userData } = useSelector((state) => state.auth);

  useMemo(() => {
    if (taskTab !== '') {
      setTodoList([]);
    }
  }, [taskTab]);

  function setTodoValue(todo, value) {
    var AnsCheckList = [...selectedWorkingCheckList?.schedule[0]?.checkList];
    var fineExistingTodoIndex = Array.from(AnsCheckList).findIndex(
      (x) => String(x.checkListId) === String(todo?._id)
    );

    if (fineExistingTodoIndex > -1) {
      // AnsCheckList[fineExistingTodoIndex].ans =
      AnsCheckList[fineExistingTodoIndex] = {
        ...AnsCheckList[fineExistingTodoIndex],
        pre_ans: value,
        touched: true
      };
    } else {
      AnsCheckList.push({
        scheduleTaskId: selectedWorkingCheckList.schedule[0]._id,
        checkListId: todo?._id,
        pre_ans: value,
        _date: new Date()
      });
    }

    // AnsCheckList
    // set value to props state
    setSelectedWorkingCheckList((p) => {
      return {
        ...p,
        schedule: [
          {
            ...p.schedule[0],
            checkList: AnsCheckList
          }
        ]
      };
    });
  }

  function columnValue(each) {
    let found = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === each?._id
    );
    if (found) {
      return found.pre_ans;
    }
    return null;
  }

  const dispatch = useDispatch();

  const { todoFileUploading } = useSelector((state) => state.tasks);
  const { loading, success: uploadSuccess, todo, file } = todoFileUploading;

  const { success } = useMessage();

  useMemo(() => {
    if (loading) {
    }
    if (uploadSuccess) {
      setTodoValue(todo, file?.url);
      success('Upload done ! please save all changes');

      // Send Upload Socket Notification
      socket.connect();
      socket.emit('uploadProof', {
        // channelId: selectedUser._id,
        selectedTask: selectedWorkingCheckList,
        todo,
        url: file?.url,
        employeeInfo: {
          email: userData?.email,
          fullName: userData?.fullName
        }
      });

      // Email exist
      if (selectedWorkingCheckList.email) {
        // Send success email to client
        dispatch(
          sendEmail({
            from: userData?.email,
            fullName: userData?.fullName,
            to: selectedWorkingCheckList.email,
            taskName: selectedWorkingCheckList.taskName,
            subTaskName: todo.title,
            content: file?.url,
            isUpload: true,
            isComplete: false
          })
        );
      }
      // Reset redux state
      dispatch(todoFileUploadingReset());
    }
  }, [uploadSuccess]);

  // File Upload
  function uploadPhoto(todo, file) {
    const form = new FormData();
    form.append('file', file);
    // Initialize Uplaoding
    dispatch(todoFileUploadingInit(todo));
    dispatch(uploadTodoAnsFile(form));
  }

  function TodosMethod(each) {
    const name = each?.proofType;
    if (name === 'check') {
      return (
        <Input
          value={columnValue(each) || 'false'}
          checked={columnValue(each) === 'true' ? true : false}
          onClick={(e) => {
            setTodoValue(each, e.target.value === 'false' ? 'true' : 'false');
          }}
          type="checkbox"
        />
      );
    }

    if (name === 'yesNo') {
      return (
        <>
          <ButtonGroup className="mb-1">
            <Button
              className={columnValue(each) === 'yes' ? 'active' : ''}
              onClick={(e) => {
                setTodoValue(each, 'yes');
              }}
              outline
              color="primary"
            >
              <span>Yes</span>
            </Button>
            <Button
              className={columnValue(each) === 'no' ? 'active' : ''}
              onClick={(e) => {
                setTodoValue(each, 'no');
              }}
              outline
              color="primary"
            >
              <span>No</span>
            </Button>
          </ButtonGroup>
        </>
      );
    }

    if (name === 'input') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
        />
      );
    }

    if (name === 'photo') {
      return (
        <Input
          onChange={(e) => {
            uploadPhoto(each, e?.target?.files[0]);
          }}
          type="file"
        />
      );
    }

    if (name === 'qrCode') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
          placeholder="scan QR Code"
        />
      );
    }

    if (name === 'barCode') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
          placeholder="scan Bar Code"
        />
      );
    }

    if (name === 'measurement') {
      return (
        <Input
          value={columnValue(each) || ''}
          onChange={(e) => {
            setTodoValue(each, e.target.value);
          }}
          placeholder="Measurement Value"
        />
      );
    }

    if (name === 'ratingToFive') {
      return (
        <ButtonGroup className="mb-1">
          <Button
            className={parseInt(columnValue(each)) >= 1 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '1' ? '' : '1');
            }}
            outline
            color="primary"
          >
            <span>1</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 2 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '2' ? '' : '2');
            }}
            outline
            color="primary"
          >
            <span>2</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 3 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '3' ? '' : '3');
            }}
            outline
            color="primary"
          >
            <span>3</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 4 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '4' ? '' : '4');
            }}
            outline
            color="primary"
          >
            <span>4</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 5 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '5' ? '' : '5');
            }}
            outline
            color="primary"
          >
            <span>5</span>
          </Button>
        </ButtonGroup>
      );
    }

    if (name === 'ratingToTen') {
      return (
        <ButtonGroup className="mb-1">
          <Button
            className={parseInt(columnValue(each)) >= 1 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '1' ? '' : '1');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>1</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 2 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '2' ? '' : '2');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>2</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 3 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '3' ? '' : '3');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>3</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 4 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '4' ? '' : '4');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>4</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 5 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '5' ? '' : '5');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>5</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 6 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '6' ? '' : '6');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>6</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 7 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '7' ? '' : '7');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>7</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 8 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '8' ? '' : '8');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>8</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 9 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '9' ? '' : '9');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>9</span>
          </Button>
          <Button
            className={parseInt(columnValue(each)) >= 10 ? 'active' : ''}
            onClick={(e) => {
              setTodoValue(each, columnValue(each) === '10' ? '' : '10');
            }}
            outline
            color="primary"
            size="sm"
          >
            <span>10</span>
          </Button>
        </ButtonGroup>
      );
    }

    return <>{name}</>;
    // <Input type="file" />
  }

  function renderStaffNameAndDate(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    if (!isTodoCompleted) {
      return <></>;
    }

    // if has Answer but employee Id null ... mark as admin
    if (isTodoCompleted && isTodoCompleted.employeeId === null) {
      return (
        <>{`${userData?.fullName}-${moment(todo?._date).format('MMMM Do YYYY, h:mm:ss a')}`}</>
      );
    }

    if (!isTodoCompleted._id) {
      return <></>;
    }

    // Else Render Employee
    return (
      <>
        {`${isTodoCompleted?.employee[0]?.fullName}-${moment(todo?._date).format(
          'MMMM Do YYYY, h:mm:ss a'
        )}`}
      </>
    );
  }

  function renderStaffDesignation(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    if (!isTodoCompleted) {
      return <></>;
    }

    // if has Answer but employee Id null ... mark as admin
    if (isTodoCompleted && isTodoCompleted.employeeId === null) {
      return <>Admin</>;
    }

    if (!isTodoCompleted._id) {
      return <></>;
    }

    // Else Render Employee
    return <>{isTodoCompleted?.employee[0]?.position}</>;
  }

  function renderStafPhoto(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    if (!isTodoCompleted) {
      return <></>;
    }

    // if has Answer but employee Id null ... mark as admin
    if (isTodoCompleted && isTodoCompleted.employeeId === null) {
      let tmpValue = 0;
      Array.from(userData?.fullName).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
      const stateNum = tmpValue % 6,
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];
      return (
        <Avatar content={userData?.fullName} color={color} imgHeight="38" imgWidth="38" initials />
      );
    }

    if (!isTodoCompleted._id) {
      return <></>;
    }

    // Else Render Employee
    let nameArr = String(isTodoCompleted?.employee[0]?.fullName).split(' ');

    let nameLastPart = '';
    if (nameArr[1]) {
      nameLastPart = nameArr[1].length > 0 ? nameArr[1][0] : '';
    }

    return <Avatar content={`${nameArr[0][0]} ${nameLastPart}`} imgHeight="38" imgWidth="38" />;
  }

  function renderCustomContent(todo) {
    switch (todo.proofType) {
      case 'photo':
        return (
          <div className="d-flex align-items-end justify-content-between">
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
            <div className="uploaded-proof-photo">
              <img
                id={`${todo._id.toString()}-upload-photo`}
                src={todo.ans}
                height={'60px'}
                onMouseEnter={setZoomPhotoState(todo.ans)}
                onMouseLeave={setZoomPhotoState(null)}
              />
              {/* <Tooltip placement="top" target={`${todo._id.toString()}-upload-photo`}>
                <img
                  src={todo.ans}
                  // maxHeight={'60px'}
                  onMouseEnter={setZoomPhotoState(todo.ans)}
                  onMouseLeave={setZoomPhotoState(null)}
                />
              </Tooltip> */}
            </div>
          </div>
        );
      // case 'barCode':
      //   break;
      // case 'qrCode':
      //   break;
      case 'check':
        return (
          <div>
            <div className="mb-1">
              <Check size={20} />
              {todo.ans ? 'Checked' : 'Unchecked'}
            </div>
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
          </div>
        );
      case 'yesNo':
        return (
          <div>
            <ButtonGroup className="mb-1">
              <Button className={todo.ans === 'yes' ? 'active' : ''} outline color="primary">
                <span>Yes</span>
              </Button>
              <Button className={todo.ans === 'no' ? 'active' : ''} outline color="primary">
                <span>No</span>
              </Button>
            </ButtonGroup>
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
          </div>
        );
      // case 'measurement':
      //   break;
      case 'ratingToFive':
        return (
          <div>
            <ButtonGroup className="mb-1">
              <Button
                className={parseInt(parseInt(todo.ans)) === 1 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>1</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 2 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>2</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 3 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>3</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 4 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>4</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 5 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>5</span>
              </Button>
            </ButtonGroup>
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
          </div>
        );
      case 'ratingToTen':
        return (
          <div>
            <ButtonGroup className="mb-1">
              <Button
                className={parseInt(parseInt(todo.ans)) === 1 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>1</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 2 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>2</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 3 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>3</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 4 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>4</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 5 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>5</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 6 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>6</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 7 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>7</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 8 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>8</span>
              </Button>
              <Button
                className={parseInt(parseInt(todo.ans)) === 9 ? 'active' : ''}
                outline
                color="primary"
              >
                <span>9</span>
              </Button>
            </ButtonGroup>
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div className="mb-1">{todo.ans}</div>
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
          </div>
        );
    }
  }

  useMemo(() => {
    // setTodoList(demo)
    if (selectedWorkingCheckList) {
      // checkList
      let list = selectedWorkingCheckList?.checkList;
      let listAns = selectedWorkingCheckList?.schedule[0].checkList;
      // console.log('checklist', list);
      // console.log('listAns', listAns);

      // Pre-processing list
      let newList = [];
      if (list.length > 0) {
        for (let each of list) {
          let selSchedul = listAns.filter((x) => x.checkListId === each._id);
          newList.push({
            ...each,
            _date: selSchedul.length > 0 ? selSchedul[0]._date : null,
            ans: selSchedul.length > 0 ? selSchedul[0].ans : null
          });
        }
      }
      if (newList.length > 0) {
        // Lets build List
        let data = [];
        let serial = 0;
        for (let each of newList) {
          // console.log(each)
          serial++;
          data.push({
            title: each?.title,
            icon: <span>{serial}</span>,
            content: !each.ans ? <div style={{ width: '30%' }}>{TodosMethod(each)}</div> : null,
            meta: each?.ans ? 'COMPLETED' : 'PENDING',
            customContent: each.ans ? renderCustomContent(each) : null
          });
        }

        // After Finish List Draw List
        setTodoList(data);
      } else {
        setTodoList([]);
      }
    }
  }, [selectedWorkingCheckList]);

  useMemo(() => {
    setTimeout(() => {
      // console.clear()
    }, [1000]);
  }, []);

  return {
    todoList
  };
};

export default useTodoList;
