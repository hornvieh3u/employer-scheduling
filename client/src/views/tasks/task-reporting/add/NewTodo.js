// ** React Imports
import { Fragment, useEffect, useMemo, useState } from 'react';

// ** Custom Components
import Repeater from '@components/repeater';

// ** Third Party Components
import { SlideDown } from 'react-slidedown';
import Flatpickr from 'react-flatpickr';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Icons Import
import { Save, Edit, X, Plus, Check, AlignLeft, Camera } from 'react-feather';
import { VscArrowBoth } from 'react-icons/vsc';
import { TiSortNumerically } from 'react-icons/ti';
import { RiNumber5, RiNumber9 } from 'react-icons/ri';
import { AiOutlineQrcode, AiOutlineBarcode } from 'react-icons/ai';

import { saveCheckListAction } from '../store/action';

import { saveCheckListReset } from '../store/reducer';
import useMessage from '../../../../lib/useMessage';
// ** Styles
import 'react-slidedown/lib/slidedown.css';
import { useDispatch, useSelector } from 'react-redux';

const NewTodo = (props) => {
  // ** State
  const [count, setCount] = useState(1);
  // const [basic, setBasic] = useState(new Date())
  const [proofTypesModal, setProofTypeModal] = useState(false);
  const [rSelected, setRSelected] = useState(1);
  const [selectPfoofTypeIndex, setSelectPfoofTypeIndex] = useState(null);
  const { saveCheckList } = useSelector((state) => state.tasks);

  // todo add
  const initialTodo = [{ id: 0, title: '', dateTime: new Date(), proofType: '' }];
  const [todos, setTodos] = useState(initialTodo);

  const increaseCount = () => {
    setCount(count + 1);
    setTodos((p) => [...p, { title: '', dateTime: new Date(), proofType: '', id: p.length }]);
  };

  const { selectedTask } = props;
  const [task, setTask] = useState(null);
  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
      if (selectedTask.checkList) {
        if (selectedTask?.checkList?.length > 0) {
          setTodos(
            selectedTask?.checkList.map((x, i) => ({
              ...x,
              id: i
            }))
          );
          setCount(selectedTask?.checkList?.length);
        } else {
          setCount(1);
          setTodos([
            {
              id: 0,
              title: '',
              dateTime: new Date(),
              proofType: ''
            }
          ]);
        }
      } else {
        // console.log('Not Found ', selectedTask.checkList)
      }
    }
  }, [selectedTask]);

  const deleteForm = (e) => {
    e.preventDefault();
    const slideDownWrapper = e.target.closest('.react-slidedown'),
      form = e.target.closest('form');
    if (slideDownWrapper) {
      slideDownWrapper.remove();
    } else {
      form.remove();
    }
  };

  const dispatch = useDispatch();
  const { error, success } = useMessage();

  // check and update checkList save status
  const { loading: saveCheckListLoading, success: savCheckListSuccess } = saveCheckList;
  useMemo(() => {
    if (savCheckListSuccess) {
      success('CheckList saved');

      // Reset
      dispatch(saveCheckListReset());
    }
  }, [savCheckListSuccess, dispatch]);

  // save checkList
  function checkListSaveHandler() {
    // any item has blank proof type
    let emptyTitleIndex = todos.findIndex((x) => x.title === '');
    let emptyProofType = todos.find((x) => x.proofType === '');

    if (emptyTitleIndex > -1) {
      error(`Title is Empty at Row ${emptyTitleIndex}`);
      return;
    }
    if (emptyProofType) {
      error(`${emptyProofType?.title} ProofType is not Selected !`);
      return;
    }

    dispatch(
      saveCheckListAction({
        checkList: todos,
        taskId: task?._id
      })
    );
  }

  function viewProofType(Type, i) {
    if (Type === 'check') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <Check size={20} className="mb-30" /> Check
        </div>
      );
    }
    if (Type === 'yesNo') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <VscArrowBoth size={20} className="mb-30" />
          Yes/No
        </div>
      );
    }
    if (Type === 'input') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <AlignLeft size={20} className="mb-30" />
          input
        </div>
      );
    }
    if (Type === 'photo') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <Camera size={20} className="mb-30" />
          Photo
        </div>
      );
    }
    if (Type === 'qrCode') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <AiOutlineQrcode size={20} className="mb-30" />
          QR Code
        </div>
      );
    }
    if (Type === 'barCode') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <AiOutlineBarcode size={20} className="mb-30" />
          Bar Code
        </div>
      );
    }
    if (Type === 'measurement') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <TiSortNumerically size={20} className="mb-30" />
          Measurement
        </div>
      );
    }
    if (Type === 'ratingToFive') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <RiNumber5 size={20} className="mb-30" />
          Rating (1-5)
        </div>
      );
    }
    if (Type === 'ratingToTen') {
      return (
        <div
          onClick={() => {
            setProofTypeModal(!proofTypesModal);
            setSelectPfoofTypeIndex(i);
          }}
          className="cursor-pointer"
        >
          <RiNumber9 size={20} className="mb-30" />
          Rating (1-10)
        </div>
      );
    }
    return (
      <Button
        color="secondary"
        outline
        onClick={() => {
          setProofTypeModal(!proofTypesModal);
          setSelectPfoofTypeIndex(i);
        }}
      >
        Select Proof Type
      </Button>
    );
  }

  if (!selectedTask) {
    return (
      <Fragment>
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <div
            style={{
              width: '100%',
              // background: '#ddd',
              textAlign: 'center',
              paddingTop: 50,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
            <br />
            <span style={{ paddingLeft: 20 }}> No Active Task </span>
          </div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h5>{task?.taskName} Checklist To-Do's</h5>
        <div>
          <Button.Ripple
            onClick={checkListSaveHandler}
            color="success"
            outline
            disabled={saveCheckListLoading}
            className="me-1"
          >
            <Save size={14} />
            <span className="align-middle ms-25">
              {saveCheckListLoading ? 'Loading...' : 'Save'}
            </span>
          </Button.Ripple>

          {/* <Button.Ripple className="btn-icon" color="warning" outline>
                        <Edit size={16} />
                    </Button.Ripple> */}
        </div>
      </div>

      <div>
        <Row className="justify-content-between align-items-center">
          <Col md={4} className="mb-md-0 mb-1">
            <Label className="form-label">Title</Label>
          </Col>
          <Col md={3} className="mb-md-0 mb-1">
            <Label className="form-label"> Set Time</Label>
          </Col>
          <Col md={3} className="mb-md-0 mb-1">
            <Label className="form-label">Proof Type</Label>
          </Col>
          <Col md={2}>
            <Label className="form-label">Delete</Label>
          </Col>
          <Col sm={12}>
            <hr />
          </Col>
        </Row>
        <Repeater count={count}>
          {(i) => {
            const Tag = i === 0 ? 'div' : SlideDown;
            return (
              <Tag key={i}>
                <Form>
                  <Row className="justify-content-between align-items-center">
                    {/* To-Do Title */}
                    <Col md={4} className="mb-md-0 mb-1">
                      <Input
                        type="text"
                        id={`animation-item-name-${i}`}
                        placeholder="Type To-Do Title"
                        value={todos[i]?.title}
                        onChange={(e) => {
                          setTodos((p) => {
                            let findIndex = p.findIndex((x) => x.id === i);
                            if (findIndex > -1) {
                              p[findIndex].title = e.target.value;
                            }
                            return [...p];
                          });
                        }}
                      />
                    </Col>
                    {/* Set Time */}
                    <Col md={3} className="mb-md-0 mb-1">
                      <Flatpickr
                        className="form-control"
                        value={todos[i]?.dateTime}
                        id="timepicker"
                        options={{
                          enableTime: true,
                          noCalendar: true,
                          dateFormat: 'H:i',
                          time_24hr: true
                        }}
                        onChange={(date) => {
                          setTodos((p) => {
                            let findIndex = p.findIndex((x) => x.id === i);
                            if (findIndex > -1) {
                              p[findIndex].dateTime = date;
                            }
                            return [...p];
                          });

                          // setBasic(date)
                        }}
                      />
                    </Col>
                    {/* Proof Type */}
                    <Col md={3} className="mb-md-0 mb-1">
                      {viewProofType(todos[i]?.proofType, i)}
                    </Col>
                    {/* Delete */}
                    <Col md={2}>
                      <Button
                        color="danger"
                        className="text-nowrap px-1"
                        onClick={(e) => {
                          deleteForm(e);
                          // Delete CheckList Item
                          setTodos((p) => {
                            let data = p.filter((x) => String(x.id) !== String(i));

                            return [...data];
                          });
                        }}
                        outline
                      >
                        <X size={14} />
                      </Button>
                    </Col>
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                </Form>
              </Tag>
            );
          }}
        </Repeater>
        <Button className="btn-icon" color="primary" onClick={increaseCount}>
          <Plus size={14} />
          <span className="align-middle ms-25">Add New</span>
        </Button>
      </div>
      <Modal
        isOpen={proofTypesModal}
        toggle={() => setProofTypeModal(!proofTypesModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setProofTypeModal(!proofTypesModal)}>
          Select Proof Type
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="d-flex flex-column">
              <span>Standard</span>
              <ButtonGroup className="mb-1">
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('check');
                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'check';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'check'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <Check size={20} className="mb-30" />
                  <span>Check</span>
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('yesNo');

                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'yesNo';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'yesNo'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <VscArrowBoth size={20} className="mb-30" />
                  <span>Yes/No</span>
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('input');

                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'input';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'input'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <AlignLeft size={20} className="mb-30" />
                  <span>Input</span>
                </Button>
              </ButtonGroup>
            </div>
            <div className="d-flex flex-column">
              <span>Multimedia</span>
              <ButtonGroup className="mb-1">
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('photo');

                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'photo';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'photo'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <Camera size={20} className="mb-30" />
                  <span>Photo</span>
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('qrCode');

                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'qrCode';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'qrCode'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <AiOutlineQrcode size={20} className="mb-30" />
                  <span>QR Code</span>
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('barCode');

                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'barCode';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'barCode'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <AiOutlineBarcode size={20} className="mb-30" />
                  <span>Bar Code</span>
                </Button>
              </ButtonGroup>
            </div>
            <div className="d-flex flex-column">
              <span>Numeric</span>
              <ButtonGroup className="mb-1">
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('measurement');
                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'measurement';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'measurement'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <TiSortNumerically size={20} className="mb-30" />
                  <span>Measurement</span>
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('ratingToFive');
                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'ratingToFive';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'ratingToFive'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <RiNumber5 size={20} className="mb-30" />
                  <span>Rating (1-5)</span>
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setRSelected('ratingToTen');

                    setTodos((p) => {
                      let findIndex = p.findIndex((x) => x.id === selectPfoofTypeIndex);
                      if (findIndex > -1) {
                        p[findIndex].proofType = 'ratingToTen';
                      }
                      return [...p];
                    });
                  }}
                  active={rSelected === 'ratingToTen'}
                  outline
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <RiNumber9 size={20} className="mb-30" />
                  <span>Rating (1-10)</span>
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setProofTypeModal(!proofTypesModal)}>
            Select
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default NewTodo;
