// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import axios from 'axios';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import Upload from './upload/Upload';
import SignDocumment from '../tabs/docSign';
import DocumentSignAndUpload from './docSign/document/signAndUpload/NewProgressionWizard';

import {
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Send,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  Eye
} from 'react-feather';
import { CiCircleCheck } from 'react-icons/ci';
import { GrReactjs } from 'react-icons/gr';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Progress,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';
import ModalTheme from '../../../../components/modal/ModalThemes';

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];

const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
};

const status = {
  1: { title: 'Approved', color: 'light-primary' },
  2: { title: 'Pending', color: 'light-success' },
  3: { title: 'Denied', color: 'light-danger' },
  4: { title: '', color: 'light-warning' },
  5: { title: '', color: 'light-info' }
};

const signAndUpload = {
  1: { title: 'Sign', color: 'light-primary' },
  2: { title: 'Upload', color: 'light-info' }
};

const pdfUrl = 'http://p.calameoassets.com/120611080311-273ec90a2704cd09c6d0f10a5e814290/p1.jpg';

export let data;

// ** Get initial Data
axios.get('/api/datatables/initial-data').then((response) => {
  data = response.data;
});

// ** Table Common Column
export const columns = [
  {
    name: 'Form Name ',
    minWidth: '220px',
    sortable: (row) => row.full_name,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <Avatar
          className="me-1"
          color={'light-primary'}
          icon={<GrReactjs size={18} />}
          id={`av-tooltip-${row.id}`}
        />
        <div className="d-flex flex-column">
          <span className="text-truncate fw-bolder">{row.full_name}</span>
          <small className="text-muted">React Project</small>
        </div>
      </div>
    )
  },
  {
    name: 'Type',
    sortable: true,
    sortable: (row) => row.signAndUpload.title,
    minWidth: '150px',
    cell: (row) => {
      const [modal2, setModal2] = useState(false);
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);
      const toggle2 = () => setModal2(!modal2);

      return (
        <div>
          <Badge
            color={signAndUpload[row.signAndUpload ? 0 : 1].color}
            pill
            onClick={
              row.signAndUpload === 1
                ? (e) => {
                  e.preventDefault();
                  toggle2();
                }
                : (e) => {
                  e.preventDefault();
                  toggle();
                }
            }
          >
            {signAndUpload[row.signAndUpload ? 0 : 1].title}
          </Badge>

          <Modal
            fullscreen="lg"
            size="lg"
            centered="true"
            scrollable="false"
            isOpen={modal2}
            toggle={toggle2}
          >
            <ModalHeader toggle={toggle2}>Add Employee Task</ModalHeader>
            <ModalBody>
              <DocumentSignAndUpload />
            </ModalBody>
            <ModalFooter>{/* <SignDocumment /> */}</ModalFooter>
          </Modal>

          <Modal
            fullscreen="lg"
            size="lg"
            centered="true"
            scrollable="false"
            isOpen={modal}
            toggle={toggle}
          >
            <ModalHeader toggle={toggle}>Upload</ModalHeader>
            <ModalBody>
              <div className="d-flex justify-content-end">
                <Badge style={{ color: 'light-info' }}>Pending</Badge>
              </div>
              <Upload />
            </ModalBody>
          </Modal>
        </div>
      );
    }
  },
  {
    name: 'Status',
    minWidth: '150px',
    sortable: (row) => row.status.title,
    cell: (row) => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      );
    }
  },
  {
    name: 'Task',
    minWidth: '150px',
    sortable: (row) => row.status.title,
    cell: (row) => {
      const [viewModel, setViewModel] = useState(false);
      const viewToggle = () => setViewModel(!viewModel);

      return (
        <>
          <Button
            color="primary"
            className="btn btn-sm"
            outline
            onClick={(e) => {
              e.preventDefault();
              viewToggle();
            }}
          >
            View
          </Button>
          <Modal
            fullscreen="lg"
            size="lg"
            centered="true"
            scrollable="false"
            isOpen={viewModel}
            toggle={viewToggle}
          >
            <ModalHeader toggle={viewToggle}>
              <Label>Document Name</Label>
            </ModalHeader>
            <ModalBody>
              <CardBody>
                <img src={pdfUrl} alt="" style={{ width: '100%', height: '100vh' }} />
              </CardBody>
            </ModalBody>
          </Modal>
        </>
      );
    }
  },

  {
    name: 'Action',
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    }
  }
];
const drowpstatus = {
  1: { title: 'Sent', color: 'light-primary' },
  2: { title: 'Opened', color: 'light-success' },
  3: { title: 'Signed', color: 'light-danger' },
  4: { title: 'Viewed', color: 'light-warning' },
  5: { title: 'Marked Complete', color: 'light-info' }
};

const ExpandableTable = () => {
  const columns = [
    {
      name: 'Date',
      sortable: true,
      // minWidth: '150px',
      selector: (row) => row.start_date
    },
    {
      name: 'By',
      sortable: true,
      // minWidth: '150px',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span className="d-block fw-bold text-truncate">Employer</span>
          </div>
        </div>
      )
    },
    {
      name: 'Name',
      sortable: (row) => row.states.name,
      cell: (row) => {
        return (
          <div className="d-flex align-items-center">
            <span className="text-truncate fw-bolder">Ocument name</span>
          </div>
        );
      }
    },
    {
      name: 'Status',
      // minWidth: '150px',
      sortable: (row) => row.drowpstatus?.title,
      cell: (row) => {
        return (
          <Badge color={status[row.status].color} pill>
            {status[row.status].title}
          </Badge>
        );
      }
    },
    {
      name: 'History',
      sortable: true,
      minWidth: '220px',
      selector: (row) => row,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span className="d-block fw-bold text-truncate">Jan 3, 2023, 11:30 AM</span>
          </div>
        </div>
      )
    }
  ];
  const data = [
    {
      responsive_id: '',
      id: 1,
      avatar: '10.jpg',
      full_name: "Korrie O'Crevy",
      post: 'Nuclear Power Engineer',
      email: 'kocrevy0@thetimes.co.uk',
      city: 'Krasnosilka',
      start_date: '09/23/2016',
      salary: '$23896.35',
      paid: 'Paid',
      upload: 'Upload',
      cash: 'Cash',
      experience: '1 Year',
      status: 2
    },
    {
      responsive_id: '',
      id: 1,
      avatar: '10.jpg',
      full_name: "Korrie O'Crevy",
      post: 'Nuclear Power Engineer',
      email: 'kocrevy0@thetimes.co.uk',
      city: 'Krasnosilka',
      start_date: '09/23/2016',
      salary: '$23896.35',
      paid: 'Paid',
      age: '61',
      cash: 'Card',
      experience: '1 Year',
      status: 3
    }
  ];
  return (
    <div className="expandable-content p-2">
      <DataTable data={data} columns={columns}></DataTable>
    </div>
  );
};
// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: (row) => row.full_name
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.salary
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.status,
    cell: (row) => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      );
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className="align-middle ms-50">Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    }
  }
];

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: 'Full Name',
    minWidth: '225px',
    selector: (row) => row.full_name
  },
  {
    sortable: true,
    name: 'Email',
    minWidth: '250px',
    selector: (row) => row.email
  },
  {
    sortable: true,
    name: 'Position',
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    sortable: true,
    name: 'Office',
    minWidth: '150px',
    selector: (row) => row.city
  },
  {
    sortable: true,
    name: 'Start Date',
    minWidth: '150px',
    selector: (row) => row.start_date
  },
  {
    sortable: true,
    name: 'Salary',
    minWidth: '150px',
    selector: (row) => row.salary
  }
];

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: (row) => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.email
  },
  {
    name: 'Post',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    name: 'City',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.city
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.salary
  }
];

export default ExpandableTable;
