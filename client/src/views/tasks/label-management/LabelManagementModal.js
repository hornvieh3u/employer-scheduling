import { useState } from 'react';

import {
  Button,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge
} from 'reactstrap';
// import Select, { components } from 'react-select'; //eslint-disable-line

import { useForm, Controller } from 'react-hook-form';
import { Trash, Plus, Dribbble, Check } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Store & Actions
import { useDispatch } from 'react-redux';
import { addLabel, updateLabel, deleteLabel } from './store';

// ** Styles
import '@src/assets/styles/label-management.scss';

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils';

const colorData = [
  { hex: '#7367f0', color: 'primary' },
  { hex: '#82868b', color: 'secondary' },
  { hex: '#28c76f', color: 'success' },
  { hex: '#ea5455', color: 'danger' },
  { hex: '#ff9f43', color: 'warning' },
  { hex: '#00cfe8', color: 'info' },
  { hex: '#a0a0d0', color: 'light-primary' },
  { hex: '#a0a0a0', color: 'light-secondary' },
  { hex: '#90d0b0', color: 'light-success' },
  { hex: '#d08080', color: 'light-danger' },
  { hex: '#ffc0a0', color: 'light-warning' },
  { hex: '#40e0ff', color: 'light-info' }
];

const LabelManagementModal = (props) => {
  const { modalFlag, setModalFlag, store } = props;

  // ** Store Vars
  const dispatch = useDispatch();

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { labelTitle: '' } });
  const [selectedLabel, setSelectedLabel] = useState({ _id: '', title: '', color: '#000' });
  const [lbTitle, setLbTitle] = useState('');
  const [lbColor, setLbColor] = useState('');
  const [titleValidation, setTitleValidation] = useState(true);

  const handleResetFields = () => {
    setSelectedLabel({ _id: '', title: '', color: '' });
    setLbTitle('');
    setLbColor('');
  };
  //  ** Function to run when sidebar opens
  const handleModalOpened = () => {
    setSelectedLabel({ _id: '', title: '', color: '' });
    setLbTitle('');
    setLbColor('');
  };

  // // ** Function to run when sidebar closes
  const handleModalClosed = () => {
    setSelectedLabel({ _id: '', title: '', color: '' });
    setLbTitle('');
    setLbColor('');
  };

  const handleLabelSubmit = () => {
    const convertData = colorData.filter((x) => x.hex === lbColor);
    console.log(convertData);
    const param = {
      _id: selectedLabel._id,
      title: lbTitle,
      color: convertData[0].color
    };
    // console.log('save label',(colorData.filter((x) => x.hex === lbColor))[0].color);
    selectedLabel._id === '' ? dispatch(addLabel(param)) : dispatch(updateLabel(param));
    setSelectedLabel({ _id: '', title: '', color: '' });
    setLbTitle('');
    setLbColor('');
  };

  const handleLabelClick = (data) => {
    setSelectedLabel(data);
    setLbTitle(data.title);
    const convertData = colorData.filter((x) => x.color === data.color);
    setLbColor(convertData[0].hex);
  };

  const handleOpenAddLabel = () => {
    setSelectedLabel({ _id: '', title: '', color: '' });
    setLbTitle('');
    setLbColor('');
  };

  const handleDeleteLabel = (data) => {
    dispatch(deleteLabel(data._id));
  };

  const handlePickerColor = (data) => {
    console.log(data.hex);
    setLbColor(data.hex);
  };

  const handleInputTitle = (e) => {
    setLbTitle(e.target.value);
    setTitleValidation(store.labels.filter((x) => x.title === e.target.value).length === 0);
  };

  return (
    <Modal
      isOpen={modalFlag}
      toggle={() => setModalFlag(false)}
      onOpened={handleModalOpened}
      onClosed={handleModalClosed}
      className="modal-dialog-label-management"
      style={{}}
    >
      <ModalHeader toggle={() => setModalFlag(false)}>{'Label Management'}</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs="5">
            <PerfectScrollbar style={{ height: '230px' }} options={{ wheelPropagation: false }}>
              <ListGroup>
                {store ? (
                  store.labels.map((labelItem, index) => {
                    return (
                      <ListGroupItem
                        key={labelItem._id}
                        active={selectedLabel._id === labelItem._id ? true : false}
                        onClick={() => handleLabelClick(labelItem)}
                      >
                        {/* style={{ backgroundColor: 'blue !important' }} */}
                        <Badge color={labelItem.color} pill>
                          {labelItem.title}
                        </Badge>
                        <Trash
                          size={14}
                          style={{ float: 'right', color: 'green', point: 'handler' }}
                          onClick={() => handleDeleteLabel(labelItem)}
                          className="me-25"
                        />
                      </ListGroupItem>
                    );
                  })
                ) : (
                  <ListGroupItem>No items</ListGroupItem>
                )}
              </ListGroup>
            </PerfectScrollbar>

            <Button
              size="sm"
              color="flat-secondary"
              style={{ width: '100%' }}
              onClick={() => handleOpenAddLabel()}
            >
              <Plus size={14} className="me-25" />
              Add New Label
            </Button>
          </Col>
          <Col xs="7">
            <p>{selectedLabel._id === '' ? 'Add New Label' : 'Update Label'}</p>
            <Form
              id="form-modal-label-color"
              className="label-modal"
              onSubmit={handleSubmit(handleLabelSubmit)}
            >
              <PerfectScrollbar options={{ wheelPropagation: false }}>
                <div className="mb-1">
                  <Label className="form-label" for="label-title">
                    Title <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="labelTitle"
                    name="labelTitle"
                    placeholder="Title"
                    className="new-todo-item-title"
                    value={lbTitle}
                    onChange={handleInputTitle}
                    valid={titleValidation && lbTitle}
                    invalid={!titleValidation || !lbTitle}
                  />
                  <FormFeedback valid={titleValidation && lbTitle}>
                    {!titleValidation
                      ? 'Oh no! That name is already taken.'
                      : !lbTitle
                      ? 'Please, Enter the name.'
                      : 'Sweet! That name is available.'}
                  </FormFeedback>
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="label-color">
                    Label Color
                  </Label>
                  <Row style={{ width: '90%' }}>
                    {colorData.map((item, index) => {
                      return (
                        <Col xs="2">
                          <h3>
                            <Badge
                              style={{ cursor: 'pointer' }}
                              onClick={() => handlePickerColor(item)}
                              color={item.color}
                              pill
                            >
                              {lbColor === item.hex ? (
                                <Check
                                  size={14}
                                  style={{
                                    point: 'handler',
                                    float: 'center',
                                    margin: '2px 1px 0px 1px'
                                  }}
                                />
                              ) : (
                                <Dribbble
                                  size={14}
                                  style={{
                                    point: 'handler',
                                    float: 'center',
                                    margin: '2px 1px 0px 1px'
                                  }}
                                />
                              )}
                            </Badge>
                          </h3>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                {selectedLabel._id === '' ? (
                  <div>
                    <Button
                      style={{ float: 'left', width: '45%' }}
                      color="primary"
                      size="sm"
                      type="submit"
                      className="me-75"
                      onClick={handleLabelSubmit}
                      disabled={!titleValidation || !lbTitle || !lbColor}
                    >
                      Ok
                    </Button>
                    <Button
                      style={{ float: 'right', width: '45%' }}
                      outline
                      size="sm"
                      color="primary"
                      onClick={handleResetFields}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      style={{ float: 'left', width: '45%' }}
                      color="primary"
                      size="sm"
                      type="submit"
                      className="me-75"
                      disabled={!titleValidation || !lbTitle}
                    >
                      Save
                    </Button>
                    <Button
                      style={{ float: 'right', width: '45%' }}
                      outline
                      size="sm"
                      color="primary"
                      onClick={handleResetFields}
                      disabled
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </PerfectScrollbar>
            </Form>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        {/* <Button
            color="primary"
            onClick={confirmBtnClicked}
            disabled={modalType < 3 && (!createNewValidation || !newTitle)}
          >
            {confirmBtnTxt[modalType]}
          </Button> */}
        <Button color="secondary" style={{ float: 'right' }} onClick={() => setModalFlag(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LabelManagementModal;
