// ** React Import
import { useMemo, useState } from 'react';

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
import { Button, Label, FormText, Form, Input, FormGroup } from 'reactstrap';
import useMessage from '../../../../lib/useMessage';
// ** Store & Actions
import { addUser } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from '../store/actions';

import { addEmployeeReset } from '../store/reducer';
import AddPositionModal from './AddPositionModal';
import { useQuery } from 'react-query';
import { useEffect } from 'react';
import ToastPositions from '../../../extensions/toastify/ToastPositions';
import {
  useGetEmployeePosition,
  useGetAllEmployees
} from '../../../../requests/contacts/employee-contacts';
import InputPasswordToggle from '../../../../@core/components/input-password-toggle';

const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null,
  password: ''
};

//prettier-ignore
const checkIsValid = (data) => {
    return Object.values(data).every(function (field) {
        return typeof field === 'object' ? field !== null : field.length > 0
    })
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'In Active', label: 'in active' },
  { value: 'Terminate', label: 'Terminate' }
];

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('subscriber');
  const [positionOptions, setPositionOptions] = useState([{ value: '', label: 'Select Position' }]);
  const [modal, setModal] = useState(false);

  // get position data from db
  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();

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
      if (!newPositionsArray.includes(position.position.toLowerCase())) {
        newPositionsArray.push(position.position);
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
      dispatch(addEmployeeReset());
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
  const onSubmit = (data) => {
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar();
      dispatch(
        addUser({
          role,
          avatar: '',
          status: 'active',
          email: data?.email,
          currentPlan: plan,
          billing: 'auto debit',
          company: data.company,
          contact: data.contact,
          fullName: data.fullName,
          username: data.username,
          country: data.country.value
        })
      );
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    //
  };

  // ** state manage
  const [state, setState] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: 'owner',
    password: Math.random().toString(36).slice(2, 18)
  });

  function submitHandler() {
    const { fullName, email, phone, position } = state;
    if (fullName === '') {
      error('Full name must not be empty !');
      return;
    }
    if (email === '' || email.length < 11) {
      error('Enter a valid email');
      return;
    }
    if (existingEmails.includes(email)) {
      error('Email already exists!');
      return;
    }
    if (existingPhones.includes(phone)) {
      error('Phone already exists!');
      return;
    }
    if (phone === '' || phone.length < 8 || !isNaN) {
      error('Enter a valid phone number');
      return;
    }

    if (position === '') {
      error('Position must not be empty !');
      return;
    }
    // dispatch addContact
    dispatch(addContactAction(state));
  }

  useMemo(() => {
    if (isSuccess) {
      dispatch(addEmployeeReset());
      success('New Employee Added successfully !');
      toggleSidebar();
    }
  }, [isSuccess]);

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
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            User Name <span className="text-danger">*</span>
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
            Password <span className="text-danger">*</span>
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
            Employee Type <span className="text-danger">*</span>
          </Label>
          <Input
            id="contact"
            placeholder="temporary password for Employee"
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
            Employee Type <span className="text-danger">*</span>
          </Label>
          <Input
            id="contact"
            placeholder="temporary password for Employee"
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
            Employee Type <span className="text-danger">*</span>
          </Label>
          <FormGroup check>
            <Input type="checkbox" />
            <Label check>Invite to Mymember via Email/SMS</Label>
          </FormGroup>
        </div>
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
