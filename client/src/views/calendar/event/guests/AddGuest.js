// ** Components
import CardInvite from '../CardInvite';
import InvitationPreview from '../InvitationPreview';
import { useParams, useHistory } from 'react-router-dom';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, getEventInfo } from '../store';
import { toast, Slide } from 'react-toastify';
// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, CardBody, Input, Label, Button } from 'reactstrap';

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';
import Table from './Table';
import AddGuestCheckModal from './AddGuestCheckModal';

const AddGuest = (props) => {
  const API = customInterIceptors();

  const [addGuestByInput, setAddGuestByInput] = useState('');
  //const [isNewMember, setIsNewMember] = useState(true);
  const [isCheckedClient, setIsCheckedClient] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [isCheckedVenders, setIsCheckedVenders] = useState(false);
  const [allVenders, setAllVenders] = useState([]);
  const [isCheckedLeads, setIsCheckedLeads] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [isCheckedEmployees, setIsCheckedEmployees] = useState(false);
  const [allLeads, setAllLeads] = useState([]);
  const [isCheckedRelationship, setIsCheckedRelationship] = useState(false);
  const [allRelationships, setAllRelationship] = useState([]);
  const [guestsData, setGuestsData] = useState([]);

  const eventId = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event);
  const eventInfo = useSelector((state) => state.event.eventInfo);
  useEffect(() => {
    dispatch(getEventInfo(eventId.eventId));
  }, []);
  const onChangeAddGuestByInput = (e) => {
    setAddGuestByInput(e.target.value);
  };
  const getClient = async () => {
    const response = await API.get(`client-contact/get-for-addevent`);
    let clients = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        clients.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Client'
        });
    });
    setAllClients(clients);
  };
  const getLead = async () => {
    const response = await API.get(`lead-contact/get-for-addevent`);
    let Leads = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Leads.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Lead'
        });
    });
    setAllLeads(Leads);
  };
  const getVender = async () => {
    const response = await API.get(`vendor-contact/get-for-addevent`);
    let Venders = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Venders.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Vender'
        });
    });
    setAllVenders(Venders);
  };
  const getEmployee = async () => {
    const response = await API.get(`employee-contact/get-for-addevent`);
    let Employees = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Employees.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Employee'
        });
    });
    setAllEmployees(Employees);
  };
  const getRelationship = async () => {
    const response = await API.get(`relation-contact/get-for-addevent`);
    let Relationships = [];
    response.data.map((item) => {
      if (eventInfo.guests.findIndex((guest) => guest.email == item.email) == -1)
        Relationships.push({
          id: item._id,
          name: item.fullName,
          email: item.email,
          phone: item.phone,
          category: 'Relationshiop'
        });
    });
    setAllRelationship(Relationships);
  };
  const checkClient = (status) => {
    setIsCheckedClient(status);
    if (status) {
      getClient();
    } else {
      setAllClients([]);
    }
  };
  const checkLead = (status) => {
    setIsCheckedLeads(status);
    if (status) {
      getLead();
    } else {
      setAllLeads([]);
    }
  };
  const checkVender = (status) => {
    setIsCheckedVenders(status);
    if (status) {
      getVender();
    } else {
      setAllVenders([]);
    }
  };
  const checkEmployee = (status) => {
    setIsCheckedEmployees(status);
    if (status) {
      getEmployee();
    } else {
      setAllEmployees([]);
    }
  };
  const checkRelationship = (status) => {
    setIsCheckedRelationship(status);
    if (status) {
      getRelationship();
    } else {
      setAllRelationship([]);
    }
  };

  // Check New Employee
  // useEffect(() => {
  //   if (isCheckedClient == true || isCheckedEmployees == true || isCheckedLeads == true || isCheckedRelationship == true || isCheckedVenders == true) {
  //     setIsNewMember(false);
  //   }
  // }, [isCheckedClient, isCheckedEmployees, isCheckedLeads, isCheckedRelationship, isCheckedVenders])
  // ** Modal
  const [modal, setModal] = useState(false);
  const toggle = () => {
    let isVaildEmail = true;
    let addEmailArray = [];
    if (addGuestByInput != '') {
      addEmailArray = addGuestByInput.split(',').map((item) => item.trim());
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      addEmailArray.map((item) => {
        if (!item.match(validRegex)) {
          isVaildEmail = false;
        }
      });
    }

    if (isVaildEmail == false) {
      toast.error('Invalid Email');
    } else {
      let guests = event.addGuests;
      if (addEmailArray) {
        addEmailArray.map(
          (email) =>
          (guests = [
            ...guests,
            {
              id: '',
              fullName: '',
              email: email,
              phone: '',
              category: ''
            }
          ])
        );
      }

      if (guests.length == 0) {
        toast.error('Select Guests!');
      } else {
        setGuestsData(guests);
        setModal(!modal)
      }
    }
  };

  return (
    <>
      <Row>
        <Col lg="8" md="8" sm="12">
          <Card>
            <CardBody>
              <CardTitle>Invite Guests</CardTitle>
              <div className="mb-2">
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedClient}
                    onChange={() => checkClient(!isCheckedClient)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Clients
                  </Label>
                </div>
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedVenders}
                    onChange={() => checkVender(!isCheckedVenders)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Vendors
                  </Label>
                </div>
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedLeads}
                    onChange={() => checkLead(!isCheckedLeads)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Leads
                  </Label>
                </div>
                <div className="form-check form-check-inline me-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedEmployees}
                    onChange={() => checkEmployee(!isCheckedEmployees)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Employees
                  </Label>
                </div>
                <div className="form-check form-check-inline">
                  <Input
                    type="checkbox"
                    id="basic-cb-unchecked"
                    defaultChecked={isCheckedRelationship}
                    onChange={() => checkRelationship(!isCheckedRelationship)}
                  />
                  <Label for="basic-cb-unchecked" className="form-check-label">
                    Relationships
                  </Label>
                </div>
              </div>

              <div className="mb-1">
                <div className="mb-1 d-flex justify-content-between">
                  <div>Or Enter emails</div>
                  <div>
                    Total Found: <strong>45</strong>
                  </div>
                </div>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  rows="3"
                  disabled={(isCheckedClient == true || isCheckedEmployees == true || isCheckedLeads == true || isCheckedRelationship == true || isCheckedVenders == true) ? true : false}
                  value={addGuestByInput}
                  onChange={onChangeAddGuestByInput}
                  placeholder="Seperated By Commas Ex. example1@gmail.com, example2@gmail.com ..."
                />
              </div>
              <div>
                <Button color="primary" onClick={toggle}>
                  Add Guests
                </Button>
              </div>
            </CardBody>
          </Card>
          <div className="app-user-list">
            <Table
              allClients={allClients}
              allLeads={allLeads}
              allVenders={allVenders}
              allEmployees={allEmployees}
              allRelationships={allRelationships}
            />
          </div>
        </Col>
        <Col lg="4" md="4" sm="12">
          <CardInvite eventInfo={{ url: eventInfo.eventBanner }} />
          <InvitationPreview eventInfo={{ eventInfo }} />
        </Col>
      </Row>
      <AddGuestCheckModal
        modal={modal}
        setModal={setModal}
        toggle={toggle}
        guestsData={guestsData}
        setGuestsData={setGuestsData}
      ></AddGuestCheckModal>
    </>
  );
};

export default AddGuest;
