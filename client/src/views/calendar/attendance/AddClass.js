// ** React Imports
import { useState, useEffect } from 'react';
// ** Third Party Components
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import { CheckCircle, X } from 'react-feather';
import Select, { components } from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createClass, updateClass } from './store';
import { ClientContactFetchAction } from '../../contacts/client/store/actions';
import { getUserData } from '../../../auth/utils';

//** Component imports */
import MarkAttendance from './MarkAttendance';

const AddClass = (props) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance);
  const contactsList = useSelector((state) => state.clientContact?.contacts?.list);

  const selectedClass = store?.selectedClass;

  // ** Props
  const { openAddClass, setOpenAddClass } = props;

  // ** States
  const [allDay, setAllDay] = useState(selectedClass?.allDay ? selectedClass?.allDay : false);

  const [activeTab, setActiveTab] = useState('updateClass');
  const [contacts, setContactsData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [classDays, setClassDays] = useState([]);
  const [classTitle, setClassTitle] = useState('');
  const [programName, setProgramName] = useState([
    {
      value: 'Little Tiger',
      label: 'Little Tiger',
      color: 'primary'
    }
  ]);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // ** Select Options
  const options = [
    { value: 'Little Tiger', label: 'Little Tiger', color: 'primary' },
    { value: 'Personal', label: 'Personal', color: 'danger' },
    { value: 'Family', label: 'Family', color: 'warning' },
    { value: 'Holiday', label: 'Holiday', color: 'success' },
    { value: 'ETC', label: 'ETC', color: 'info' }
  ];

  useEffect(() => {
    if (selectedClass?._id) {
      setClassTitle(selectedClass?.classTitle);
      setClassDays(selectedClass?.classDays);
      setProgramName(selectedClass?.programName);
      setStartDate(selectedClass?.startDate);
      setEndDate(selectedClass?.endDate);
    } else {
      setClassTitle('');
      setClassDays([]);
      setProgramName([
        {
          value: 'Little Tiger',
          label: 'Little Tiger',
          color: 'primary'
        }
      ]);
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [selectedClass]);

  useEffect(() => {
    dispatch(
      ClientContactFetchAction({
        //  text: searchTerm,
        //  status: 'Active'
      })
    );
  }, []);

  useEffect(() => {
    if (contactsList?.length > 0) {
      const cnt = contactsList.map((contact) => {
        return {
          ...contact,
          value: contact._id,
          label: contact.fullName
        };
      });
      setContactsData(cnt, 'cnt');
    }
  }, [contactsList]);

  const handleSelectedDays = async (item) => {
    let index = classDays.indexOf(item);
    if (index > -1) {
      classDays.splice(index, 1);
      setClassDays([...classDays]);
    } else {
      setClassDays([...classDays, item]);
    }
  };

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`bullet bullet-${data.color} bullet-sm me-50`}></span>
        {data.label}
      </components.Option>
    );
  };

  // ** Close BTN
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={() => setOpenAddClass(!openAddClass)} />
  );
  /* const changeHandler = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
    }*/

  const handleAddClass = async () => {
    const payload = {
      userId: getUserData().id,
      classTitle,
      programName,
      startDate,
      endDate,
      classDays,
      allDay
    };

    if (selectedClass?._id) {
      payload._id = selectedClass?._id;
      dispatch(updateClass(payload));
    } else {
      dispatch(createClass(payload));
    }

    setOpenAddClass(!openAddClass);
  };
  // submit form with react Query
  return (
    <Modal
      isOpen={openAddClass}
      // className="sidebar-lg"
      style={{ width: '500px' }}
      toggle={() => setOpenAddClass(!openAddClass)}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => setOpenAddClass(!openAddClass)}
        close={CloseBtn}
        tag="div"
      >
        {selectedClass?._id ? (
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'updateClass'
                })}
                onClick={() => {
                  setActiveTab('updateClass');
                }}
              >
                <h5 className="modal-title">Update Class</h5>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === 'markAttendance'
                })}
                onClick={() => {
                  setActiveTab('markAttendance');
                }}
              >
                <h5 className="modal-title">Mark Attendance</h5>
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          'Add Class'
        )}
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="updateClass">
              <Form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-1">
                  <Label className="form-label" for="label">
                    Program Name
                  </Label>
                  <Select
                    id="label"
                    value={programName}
                    options={options}
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    isClearable={false}
                    onChange={(data) => setProgramName([data])}
                    components={{
                      Option: OptionComponent
                    }}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="title">
                    Class Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={classTitle}
                    placeholder="Class Name"
                    onChange={(event) => setClassTitle(event.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="startDate">
                    Start Date & Time
                  </Label>
                  <Flatpickr
                    required
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    onChange={(date) => setStartDate(date[0])}
                    value={selectedClass?.startDate ? selectedClass?.startDate : startDate}
                    options={{
                      enableTime: allDay === false,
                      dateFormat: 'Y-m-d H:i',
                      minDate: 'today'
                    }}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="endDate">
                    End Date & Time
                  </Label>
                  <Flatpickr
                    required
                    id="endDate"
                    name="endDate"
                    className="form-control"
                    onChange={(date) => setEndDate(date[0])}
                    value={selectedClass?.endDate ? selectedClass?.endDate : endDate}
                    options={{
                      enableTime: allDay === false,
                      dateFormat: 'Y-m-d H:i',
                      minDate: startDate,
                      minTime: moment(startDate).format('H:i')
                    }}
                  />
                </div>
                {/* <div className="mb-1">
                            <Label className="form-label" for="location">
                                Location
                            </Label>
                            <Input
                                id="location"
                                placeholder="Appointment Location"
                            />
                        </div>
                        */}
                <div className="mb-1">
                  <Label className="form-label" for="description">
                    Repeat Weekly on
                  </Label>
                  {/* <Input
                                type="textarea"
                                name="text"
                                id="description"
                                rows="3"
                                placeholder="Description"
                            /> */}
                  <div
                    className="p-1"
                    style={{
                      border: '1px solid #82868b',
                      borderRadius: '8px'
                    }}
                  >
                    {days.map((item, i) => {
                      return (
                        <Button
                          key={i}
                          outline={classDays.includes(item) ? false : true}
                          size="sm"
                          color={classDays.includes(item) ? 'primary' : 'secondary'}
                          style={{
                            borderRadius: '40px',
                            marginLeft: '10px',
                            marginBottom: '5px',
                            padding: '5px'
                          }}
                          onClick={() => handleSelectedDays(item, i)}
                        >
                          <CheckCircle /> {item}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <div className="d-flex mb-1">
                  <Button
                    className="me-1"
                    type="submit"
                    color="primary"
                    onClick={() => handleAddClass()}
                  >
                    {selectedClass?._id ? 'Update Class' : 'Add Class'}
                  </Button>
                  <Button
                    color="secondary"
                    type="reset"
                    onClick={() => setOpenAddClass(!openAddClass)}
                    outline
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </TabPane>
            <TabPane tabId="markAttendance">
              <MarkAttendance contacts={contacts} />
            </TabPane>
          </TabContent>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default AddClass;
