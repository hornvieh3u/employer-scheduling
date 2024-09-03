import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ContactsTable from './ContactsTable';
import SelectedContactsTable from './SelectedContactsTable';

import {
  Badge,
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';

import {
  clientContactsAction,
  employeesContactsAction,
  leadsContactsAction,
  relationshipsContactsAction,
  totalContactsAction,
  vendorContactsAction
} from '../contacts/store/actions';

import { useDispatch, useSelector } from 'react-redux';
import { DocumentContext } from '../../utility/context/Document';

const ContactsModal = (props) => {
  const { contactsModal, setContactsModal, toggle, active } = props;
  const { recipients, setRecipients } = useContext(DocumentContext);
  const [contactData, setContactData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [colors, setColors] = useState([]);

  const dispatch = useDispatch();
  const totalStore = useSelector((state) => state.totalContacts);

  const handleTabChanged = (value) => {
    switch (value) {
      case 'clients':
        setContactData(totalStore.clientContacts.list);
        break;
      case 'leads':
        setContactData(totalStore.leadContacts.list);
        break;
      case 'vendors':
        setContactData(totalStore.vendorContacs.list);
        break;
      case 'relationships':
        setContactData(totalStore.relationshipContacts.list);
        break;
      case 'employees':
        setContactData(totalStore.employeeContacts.list);
        break;

      default:
        setContactData(totalStore.clientContacts.list);
        break;
    }
  };
  const handleSelectRowChanged = (state) => {
    setSelectedData(state.selectedRows);
  };
  const createColor = () => {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    if (color === '#FFFFFF') {
      createColor();
    }
    if (colors.includes(color)) {
      createColor();
    } else {
      setColors([...colors, color]);
    }

    return color;
  };
  const handleApply = () => {
    if (selectedData.length > 0) {
      let temp = selectedData;
      let r = recipients;
      temp = temp.map((x) => {
        let b = x;
        return {
          ...x,
          color: createColor(),
          active: false,
          name: b.fullName,
          id: b._id,
          roleOption: 'sign'
        };
      });
      if (r.length > 0) {
        r = r.filter((x) => x.name !== '');
      }
      if (r.length === 0) {
        temp[0].active = true;
      }
      setRecipients([...r, ...temp]);
    }
    setContactsModal(!contactsModal);
  };
  useEffect(() => {
    dispatch(totalContactsAction());
    dispatch(clientContactsAction());
    dispatch(leadsContactsAction());
    dispatch(vendorContactsAction());
    dispatch(relationshipsContactsAction());
    dispatch(employeesContactsAction());
  }, [dispatch]);
  useEffect(() => {
    setContactData(totalStore.clientContacts.list);
  }, [totalStore]);

  useEffect(() => {
    if (recipients.length > 0) {
      let temp = [];
      for (const r of recipients) {
        temp.push(r.color);
      }
      setColors(temp);
    }
  }, []);

  return (
    <div>
      <Modal
        isOpen={contactsModal}
        className="modal-lg"
        toggle={() => setContactsModal(!contactsModal)}
      >
        <ModalHeader toggle={() => setContactsModal(!contactsModal)}>
          Select Recipients From Contacts
        </ModalHeader>
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  toggle('1');
                }}
              >
                My Contacts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  toggle('2');
                }}
              >
                Selected ({selectedData.length})
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1">
              <Row>
                <Col md={4}>
                  <ListGroup tag="div" className="list-group-labels">
                    <ListGroupItem
                      tag={Link}
                      // to="/apps/email/label/personal"
                      action
                      onClick={() => handleTabChanged('clients')}
                    >
                      <span className="bullet bullet-sm bullet-warning me-1"></span>
                      Clients
                      <Badge className="float-end" color="light-primary" pill>
                        {totalStore?.totalCount.clients}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      // to="/apps/email/label/company"
                      action
                      onClick={() => handleTabChanged('leads')}
                    >
                      <span className="bullet bullet-sm bullet-primary me-1"></span>
                      Leads
                      <Badge className="float-end" color="light-primary" pill>
                        {totalStore?.totalCount.leads}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      // to="/apps/email/label/important"
                      action
                      onClick={() => handleTabChanged('vendors')}
                    >
                      <span className="bullet bullet-sm bullet-success me-1"></span>
                      Vendors
                      <Badge className="float-end" color="light-primary" pill>
                        {totalStore?.totalCount.vendors}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      // to="/apps/email/label/private"
                      action
                      onClick={() => handleTabChanged('relationships')}
                    >
                      <span className="bullet bullet-sm bullet-danger me-1"></span>
                      Relationship
                      <Badge className="float-end" color="light-primary" pill>
                        {totalStore?.totalCount.relationships}
                      </Badge>
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      // to="/apps/email/label/private"
                      action
                      onClick={() => handleTabChanged('employees')}
                    >
                      <span className="bullet bullet-sm bullet-danger me-1"></span>
                      Employee
                      <Badge className="float-end" color="light-primary" pill>
                        {totalStore?.totalCount.employees}
                      </Badge>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col md={8}>
                  <ContactsTable
                    data={contactData}
                    handleSelectRowChanged={handleSelectRowChanged}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <SelectedContactsTable data={selectedData} />
            </TabPane>
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleApply}>
            Apply Selected
          </Button>
          <Button color="flat-danger" onClick={() => setContactsModal(!contactsModal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactsModal;
