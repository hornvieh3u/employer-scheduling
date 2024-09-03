// ** React Imports
import { Fragment, useState, useRef } from 'react';

// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';

// ** User List Component
import DataTable from 'react-data-table-component';
import { MoreVertical, Edit, Eye } from 'react-feather';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ImAddressBook } from "react-icons/im";
import Avatar from '../../../../../../components/avatar';
import { FiUser, FiUsers } from 'react-icons/fi';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
import Modaldata from './Modaldata';
import progressionimage from './belt.png';
const Roles = () => {
  const projectsArr = [
    {
      Name: 'Type A',
      Type: 'Form 1',
      Smartlist: 'info',
      Subcategory: '01/01/2023',
      Email: 'N/A',
      Phone: 'N/A',
      EntryDate: '01/01/2023',
    },
    {
      Name: 'Type A',
      Type: 'Form 1',
      Smartlist: 'info',
      Subcategory: '01/01/2023',
      Email: 'N/A',
      Phone: 'N/A',
      EntryDate: '01/01/2023',
    },
    {
      Name: 'Type A',
      Type: 'Form 1',
      Smartlist: 'info',
      Subcategory: '01/01/2023',
      Email: 'N/A',
      Phone: 'N/A',
      EntryDate: '01/01/2023',
    },
    {
      Name: 'Type A',
      Type: 'Form 1',
      Smartlist: 'info',
      Subcategory: '01/01/2023',
      Email: 'N/A',
      Phone: 'N/A',
      EntryDate: '01/01/2023',
    }
  ];

  const columns = [
    {
      name: 'Form Name',
      selector: (row) => row.Name,
    },
    {
      name: 'Type',
      selector: (row) => row.Type,
      sortable: true,
    },
    {
      name: 'Smartlist',
      selector: (row) => row.Smartlist
    },

    {
      name: 'Subcategory',
      selector: (row) => row.Subcategory
    },
    {
      name: 'Email',
      selector: (row) => row.Email,
    },
    {
      name: 'Phone',
      selector: (row) => row.Phone,
    },
    {
      name: 'Entry Date',
      selector: (row) => row.EntryDate,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="span" className="w-100">
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem tag="span" className="w-100">
                <Edit size={14} className="me-50" />
                <span className="align-middle">Remove</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];
  const carddata = [
    {
      title: 'Total Contacts',
      icon: <ImAddressBook size={30} />,
      rank: '21'
    },
    {
      title: 'Last Week Contacts',
      icon: <FiUsers size={30} />,
      rank: '21'
    },
    {
      title: 'Last Week Contacts',
      icon: <FiUser size={30} />,
      rank: '21'
    }
  ];
  const hiddenFileInput = useRef();
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const [activecard, setActivecard] = useState('');
  const [tabledata, setTabledata] = useState([]);
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  return (
    <div className="m-1">
      <div className="">
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="md">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody>
            <Modaldata />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancle
            </Button>{' '}
            <Button color="btn btn-primary" onClick={toggleitemmodal}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list">
          <Row>
            {carddata?.map((item, i) => (
              <>
                <Col lg="4" sm="6">
                  <div
                    className={`card border ${
                      activecard === item?.title ? 'border border-primary' : ''
                    }`}
                    onClick={() => {
                      setActivecard(item?.title);

                      item?.title === 'Teakwondo' ? setTabledata([]) : setTabledata([]);
                    }}
                  >
                    <Card
                      title={item?.title}
                      rank={item?.rank}
                      icon={item?.icon}
                    />
                  </div>
                </Col>
              </>
            ))}
            {/* <Col xl="12" className="d-flex justify-content-end">

              <Button onClick={toggleitemmodal} color="primary " className="mb-1">
                Add New Role
              </Button >

            </Col> */}
          </Row>
        </div>
      </Fragment>
      <Col xl={12}>
        <div className="react-dataTable user-view-account-projects">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={projectsArr}
            className="react-dataTable"
          />
        </div>
      </Col>
    </div>
  );
};

export default Roles;
