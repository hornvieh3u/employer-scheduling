// ** React Import
import { useMemo, useEffect, useRef, useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';
// import AddPositionModal from './AddPositionModal'

// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select from 'react-select';
// import classnames from 'classnames'
import { useForm } from 'react-hook-form';
// ** Reactstrap Imports
import {
  Button,
  Label,
  FormText,
  Form,
  Input,
  FormGroup,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Accordion,
  Row,
  Col
} from 'reactstrap';
import useMessage from '../../../lib/useMessage';
// ** Store & Actions
import { addUser } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from '../store/actions';

import { addEmployeeReset } from '../store/reducer';
import AddPositionModal from './AddPositionModal';
import { useQuery } from 'react-query';
import ToastPositions from '../../extensions/toastify/ToastPositions';
import {
  useGetEmployeePosition,
  useGetAllEmployees,
  useGetAllRole,
} from '../../../requests/contacts/employee-contacts';
import InputPasswordToggle from '../../../@core/components/input-password-toggle';
import { ChevronDown, ChevronUp } from 'react-feather';

const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null,
  password: '',
  role: ''
};

//prettier-ignore
const checkIsValid = (data) => {
  return Object.values(data).every(function (field) {
    return typeof field === 'object' ? field !== null : field.length > 0
  })
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'in Active' },
  { value: 'pending', label: 'Pending' }
];

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('subscriber');
  const [positionOptions, setPositionOptions] = useState([{ value: '', label: 'Select Position' }]);
  const [modal, setModal] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('1');

  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState('0px');

  // get position data from db
  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();

  // get role data from db
  const { data: roles } = useGetAllRole();
  const [rolesArray, setRolesArray] = useState([]);
  useEffect(() => {
    setRolesArray(roles);
  }, [roles]);

  // get employees data from db
  const {
    data: employees,
    refetch: fetchEmployees,
    isLoading: employeesLoading
  } = useGetAllEmployees();

  const [existingEmails, setExistingEmails] = useState([]);
  const [existingPhones, setExistingPhones] = useState([]);

  const allEmployeeemail = () => {
    const empEmail = [];
    const empPhone = [];
    employees?.map((employee) => {
      empEmail.push(employee.email);
      empPhone.push(employee.phone);
    });
    setExistingEmails(empEmail);
    setExistingPhones(empPhone);
  };

  useEffect(allEmployeeemail, [employees]);

  const [positionsArray, setPositionsArray] = useState(['owner']);

  //validate position
  const onlyPositions = () => {
    const newPositionsArray = positionsArray?.map((position) => {
      return position.toLowerCase();
    });
    positions?.map((position) => {
      if (!newPositionsArray.includes(position.name.toLowerCase())) {
        newPositionsArray.push(position.name);
      }
    });
    setPositionsArray(newPositionsArray);
  };

  useEffect(onlyPositions, [positions]);

  // //validate phone number (if you dont want country code + and dash -)
  // const blockInvalidChar = (e) =>
  //     ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

  //validate phone number (if you want country code + and dash -)
  const blockInvalidChar = (e) => ['e', 'E'].includes(e.key) && e.preventDefault();

  const toggle = () => setModal(!modal);
  const { error, success } = useMessage();
  // ** Store Vars
  const dispatch = useDispatch();
  const { addEmployee } = useSelector((state) => state.employeeContact);
  const { loading: isLoading, success: isSuccess, error: addError } = addEmployee;

  useMemo(() => {
    if (addError) {
      error(addError);

      // reset
    //   dispatch(addEmployeeReset());
    }
  }, [addError]);

  // ** Vars
  const {
    // control,
    // setValue,
    setError,
    handleSubmit
    // formState: { errors }
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  // const onSubmit = (data) => { 
  //   setData(data);
  //   if (checkIsValid(data)) {
  //     toggleSidebar();
  //     dispatch(
  //       addUser({
  //         role,
  //         avatar: '',
  //         status: 'active',
  //         email: data?.email,
  //         currentPlan: plan,
  //         billing: 'auto debit',
  //         company: data.company,
  //         contact: data.contact,
  //         fullName: data.fullName,
  //         username: data.username,
  //         country: data.country.value
  //       })
  //     );
  //   } else {
  //     for (const key in data) {
  //       if (data[key] === null) {
  //         setError('country', {
  //           type: 'manual'
  //         });
  //       }
  //       if (data[key] !== null && data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         });
  //       }
  //     }
  //   }
  // };

  const handleSidebarClosed = () => {
    //
  };

  // ** state manage
  const [state, setState] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'owner',
    password: Math.random().toString(36).slice(2, 18),
    willSendEmail: false,
  });

  function submitHandler() {
    console.log("jhdgjshgfdjshj")
    const { fullName, email, phone, position, willSendEmail } = state;
    if (fullName === '') {
      error('full name must not be empty !');
      return;
    }
    if (email === '' || email.length < 11) {
      error('enter a valid email');
      return;
    }
    if (email !== "" && existingEmails.includes(email)) {
      error('email already exists!');
      return;
    }
    if (existingPhones.includes(phone)) {
      error('phone already exists!');
      return;
    }
    if (phone === '' || phone.length < 8 || !isNaN) {
      error('enter a valid phone number');
      return;
    }

    if (position === '') {
      error('position must not be empty !');
      return;
    }
    dispatch(addContactAction(state));
  }

  useMemo(() => {
    if (isSuccess) {
      dispatch(addEmployeeReset());
      success('New Employee Added successfully !');
      toggleSidebar();
    }
  }, [isSuccess]);

  // const toggleAccordion = (id) => {
  //   openAccordion === id ? setOpenAccordion() : setOpenAccordion(id);
  // };

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? '0px' : `40vh`);
  }

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Employee"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            Full Name <span className="text-danger">*</span>
          </Label>
          <Input
            onChange={(e) => {
              setState((p) => ({
                ...p,
                fullName: e?.target?.value
              }));
            }}
            id="fullName"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email <span className="text-danger">*</span>
          </Label>
          <Input
            type="email"
            id="userEmail"
            placeholder="john.doe@example.com"
            onChange={(e) => {
              setState((p) => ({
                ...p,
                email: e?.target?.value
              }));
            }}
          />
          <FormText color="muted">You can use letters, numbers & periods</FormText>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="contact">
            Contact <span className="text-danger">*</span>
          </Label>
          <Input
            type="number"
            id="contact"
            placeholder="(397) 294-5153"
            onKeyDown={blockInvalidChar}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                phone: e?.target?.value
              }));
            }}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="address">
            Address <span className="text-danger">*</span>
          </Label>
          <Input
            type="text"
            id="contact"
            placeholder="Address"
            onKeyDown={blockInvalidChar}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                address: e?.target?.value
              }));
            }}
          />
        </div>
        <Row>
          <Col md={5}>
            <div className="mb-1">
              <Label className="form-label" for="city">
                City<span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                id="city"
                placeholder="city"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    city: e?.target?.value
                  }));
                }}
              />
            </div>
          </Col>
          <Col md={4} style={{ paddingLeft: '0px' }}>
            <div className="mb-1">
              <Label className="form-label" for="state">
                State<span className="text-danger">*</span>
              </Label>
              <Input
                type="text"
                id="state"
                placeholder="state"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    state: e?.target?.value
                  }));
                }}
              />
            </div>
          </Col>
          <Col md={3} style={{ paddingLeft: '0px' }}>
            <div className="mb-1">
              <Label className="form-label" for="zip">
                Zip <span className="text-danger">*</span>
              </Label>
              <Input
                type="number"
                id="zip"
                placeholder="zip"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    zip: e?.target?.value
                  }));
                }}
              />
            </div>
          </Col>
        </Row>

        {/* <div className="mb-1">
          <Label className="form-label" for="contact">
            Status <span className="text-danger">*</span>
          </Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={statusOptions}
            // value={admin.adminType}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                username: e?.target?.value
              }));
            }}
          />
        </div>
 */}
        <div className="mb-1">
          <Label className="form-label" for="user-role">
            Position
          </Label>
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-9 p-0">
                <Input
                  type="select"
                  id="user-role"
                  name="user-role"
                  defaultValue={state.position}
                  onChange={(e) => {
                    setState((p) => ({
                      ...p,
                      position: e?.target?.value
                    }));
                  }}
                >
                  {positionsArray?.map((p, i) => {
                    return (
                      <option key={i} value={p}>
                        {p}
                      </option>
                    );
                  })}
                </Input>
              </div>
              <div className="col-3 ps-2">
                <Button onClick={toggle}>Add</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            Role <span className="text-danger">*</span>
          </Label>
          <Input
            type="select"
            id="role"
            name="role"
            defaultValue={"Staff"}
            onChange={(e) => {
              setState((p) => ({
                ...p,
                role: e.target.value
              }));
            }}
          >
            <option value="">Selecting...</option>
            {rolesArray?.map((r, i) => {
              return (
                <option key={i} value={r._id}>
                  {r.roleName}
                </option>
              );
            })}
          </Input>
        </div>

        {/* Custom Accordion */}
        <div className="custom_accordion__section">
          <div
            className={`custom_accordion ${
              active ? 'custom_active' : ''
            } d-flex justify-content-between`}
            onClick={toggleAccordion}
          >
            <p className="custom_accordion__title">Create Access (Optional)</p>
            <span>{active ? <ChevronDown /> : <ChevronUp />}</span>
          </div>
          <div
            ref={content}
            style={{ maxHeight: `${height}` }}
            className="custom_accordion__content"
          >
            <div className="mb-1">
              <Label className="form-label" for="contact">
                User Name
              </Label>
              <Input
                type="text"
                id="contact"
                placeholder="username"
                onKeyDown={blockInvalidChar}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    username: e?.target?.value
                  }));
                }}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="contact">
                Password
              </Label>
              <InputPasswordToggle
                className="input-group-merge"
                id="login-password"
                name="password"
                value={state.password}
                onChange={(e) => {
                  setState((p) => ({
                    ...p,
                    password: e?.target?.value
                  }));
                }}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="contact">
                Send Invite <span className="text-danger">*</span>
              </Label>
              <FormGroup check>
                <Input type="checkbox" />
                <Label check>Send email invitation to activate employee account</Label>
              </FormGroup>
            </div>
          </div>
        </div>

        {/* <div className="custom_accordion__section" style={{ margin: '7px' }}>
          <div
            className={`custom_accordion ${
              active ? 'custom_active' : ''
            } d-flex justify-content-between`}
            onClick={toggleAccordion}
          >
            <p className="custom_accordion__title"></p>
            <span style={{ marginLeft: '10px' }}>{active ? <ChevronDown /> : <ChevronUp /> }</span>
          </div>
          <div
            ref={content}
            style={{ maxHeight: `${height}` }}
            className="custom_accordion__content"
          >
            
          </div>
        </div> */}

        {/* <Accordion className="me-1" open={openAccordion} toggle={toggleAccordion}>
          <AccordionItem>
            <AccordionHeader targetId="3">Create Access (Optional)</AccordionHeader>
            <AccordionBody accordionId="3">
              <div className="mb-1">
                <Label className="form-label" for="contact">
                  User Name
                </Label>
                <Input
                  type="text"
                  id="contact"
                  placeholder="username"
                  onKeyDown={blockInvalidChar}
                  onChange={(e) => {
                    setState((p) => ({
                      ...p,
                      username: e?.target?.value
                    }));
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="contact">
                  Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  name="password"
                  value={state.password}
                  onChange={(e) => {
                    setState((p) => ({
                      ...p,
                      password: e?.target?.value
                    }));
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="contact">
                  Send Invite <span className="text-danger">*</span>
                </Label>
                <FormGroup check>
                  <Input type="checkbox" name="willSendEmail" onChange={(e) => {
                    setState((p) => (
                      {
                        ...p,
                        willSendEmail: e?.target?.checked
                      }))
                  }} />
                  <Label check>Send email invitation to activate employee account</Label>
                </FormGroup>
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion> */}

        <Button onClick={submitHandler} className="me-1" color="primary" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </Button>

        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
      <AddPositionModal
        modal={modal}
        setState={setState}
        toggle={toggle}
        setPositionOptions={setPositionOptions}
        positionOptions={positionOptions}
        positions={positions}
        positionsArray={positionsArray}
        refetch={refetch}
      ></AddPositionModal>
    </Sidebar>
  );
};

export default SidebarNewUsers;
