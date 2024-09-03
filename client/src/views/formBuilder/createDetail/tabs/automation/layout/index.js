// ** React Imports
import { Fragment, useState } from 'react';
// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';
import Avatar from '../../../../../../@core/components/avatar';
import { Progress } from 'reactstrap';
import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { Edit } from 'react-feather';
import { MoreVertical } from 'react-feather';

// ** User List Component
import DataTable from 'react-data-table-component';
// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  DropdownItem,
  ModalHeader,
  Button,
  Row,
  Col,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
import Modaldata from './Modaldata';
import Description from './Description';
import progressionimage from './belt.png';
const Layout = (props) => {
  const { title, subtitle1, subtitle2, des1, des2 } = props;

  const [descriptiondetails, setDescriptiondetails] = useState();
  const [showdetails, setShowdetails] = useState(false);
  const expandcard = (item) => {
    setDescriptiondetails(item);
    setShowdetails(true);
  };

  const [activecard, setActivecard] = useState('');
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);

  const projectsArr = [
    {
      type: 'Candidate',
      from: 'Leadership Club',
      subject: 'info',
      date: '1',
    }
  ];

  const columns = [
    {
      name: 'Type',
      selector: (row) => row.from
    },
    {
      name: 'From',
      selector: (row) => row.from,
      sortable: true,

      selector: (row) => row.from
    },
    {
      name: 'Subject',
      selector: (row) => row.subject
    },

    {
      name: 'Activation Date',
      selector: (row) => row.date
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
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  return !showdetails ? (
    <>
      <div>
        <Modal centered={true} isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody className="p-3">
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
        <div className="app-user-list p-1">
          <div className="my-1 d-flex justify-content-end">
            <Button color="primary">Add AUTOMATION</Button>
          </div>

          <div className="react-dataTable user-view-account-projects">
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={projectsArr}
              className="react-dataTable"
            />
          </div>
        </div>
      </Fragment>
    </>
  ) : (
    <Description setShowdetails={setShowdetails} descriptiondetails={descriptiondetails} />
  );
};

export default Layout;
