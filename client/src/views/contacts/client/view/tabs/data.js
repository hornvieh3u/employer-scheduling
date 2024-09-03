// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import axios from 'axios';
import DataTable from 'react-data-table-component';
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
  ArrowDownCircle
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
  Progress
} from 'reactstrap';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';

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
  1: { title: 'Monthly', color: 'light-primary' },
  2: { title: 'Weekly', color: 'light-success' },
  3: { title: 'Auto Pay', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
};

export let data;

// ** Get initial Data
axios.get('/api/datatables/initial-data').then((response) => {
  data = response.data;
});

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'ID',
    sortable: true,
    maxWidth: '100px',
    selector: (row) => row.id
  },
  {
    name: 'Name',
    sortable: true,
    minWidth: '225px',
    selector: (row) => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '310px',
    selector: (row) => row.email
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    name: 'Age',
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.age
  },
  {
    name: 'Salary',
    sortable: true,
    minWidth: '175px',
    selector: (row) => row.salary
  }
];
// ** Table ReOrder Column
export const reOrderColumns = [
  {
    name: 'ID',
    reorder: true,
    sortable: true,
    maxWidth: '100px',
    selector: (row) => row.id
  },
  {
    name: 'Name',
    reorder: true,
    sortable: true,
    minWidth: '225px',
    selector: (row) => row.full_name
  },
  {
    name: 'Email',
    reorder: true,
    sortable: true,
    minWidth: '310px',
    selector: (row) => row.email
  },
  {
    name: 'Position',
    reorder: true,
    sortable: true,
    minWidth: '250px',
    selector: (row) => row.post
  },
  {
    name: 'Age',
    reorder: true,
    sortable: true,
    minWidth: '100px',
    selector: (row) => row.age
  },
  {
    name: 'Salary',
    reorder: true,
    sortable: true,
    minWidth: '175px',
    selector: (row) => row.salary
  }
];

// ** Expandable table component

// ** Table Common Column
export const columns = [
  {
    name: 'Name ',
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
          <span className="text-truncate fw-bolder">BGC eCommerce</span>
          <small className="text-muted">React Project</small>
        </div>
      </div>
    )
  },
  //   {
  //     name: 'Email',
  //     sortable: true,
  //     minWidth: '250px',
  //     selector: row => row.email
  //   },
  {
    name: 'Start Date',
    sortable: true,
    minWidth: '150px',
    selector: (row) => row.start_date
  },
  {
    name: 'End Date',
    sortable: true,
    minWidth: '140px',
    selector: (row) => row.start_date
  },
  // {
  //   name: 'Status',
  //   minWidth: '150px',
  //   sortable: row => row.status.title,
  //   cell: row => {
  //     return (
  //       <Badge color={status[row.status].color} pill>
  //         {status[row.status].title}
  //       </Badge>
  //     )
  //   }
  // },
  {
    name: 'Payment',
    minWidth: '130px',
    sortable: true,
    sortField: 'invoiceStatus',
    selector: (row) => row.salary,
    cell: (row) => {
      // const color = invoiceStatusObj[row.invoiceStatus]
      //         ? invoiceStatusObj[row.invoiceStatus].color
      //         : 'primary',
      //     Icon = invoiceStatusObj[row.invoiceStatus]
      //         ? invoiceStatusObj[row.invoiceStatus].icon
      //         : Edit
      return (
        <>
          <Avatar
            color={'light-success'}
            icon={<CiCircleCheck size={16} />}
            id={`av-tooltip-${row.id}`}
          />
          <UncontrolledTooltip placement="top" target={`av-tooltip-${row.id}`}>
            <span className="fw-bold">Paid</span>
            <br />
            <span className="fw-bold">Balance:</span> {row.salary}
            <br />
            <span className="fw-bold">Due Date:</span> {row.start_date}
          </UncontrolledTooltip>
        </>
      );
    }
  },

  // {
  //   name: 'Type',
  //   minWidth: '150px',
  //   sortable: row => row.status.title,
  //   cell: row => {
  //     return (
  //       <Badge color={status[row.status].color} pill>
  //         {status[row.status].title}
  //       </Badge>
  //     )
  //   }
  // },
  {
    name: 'Progress',
    sortable: true,
    minWidth: '140px',
    selector: (row) => row.age,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ">
          <span className="d-block fw-bold text-truncate width-100 ">{row.age} Days Left</span>
          <Progress
            value={row.age}
            style={{ height: '6px' }}
            className={`w-100 mt-1 progress-bar-${row.progressColor}`}
          />
          {/* </div> */}
        </div>
      </div>
    )
  },
  {
    name: 'Manage',
    allowOverflow: true,
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
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
          <Edit size={15} />
        </div>
      );
    }
  }
];
const ExpandableTable = () => {
  const columns = [
    {
      name: 'Due Date',
      sortable: true,
      // minWidth: '150px',
      selector: (row) => row.start_date
    },
    {
      name: 'Payment',
      sortable: true,
      // minWidth: '150px',
      selector: (row) => row.paid
      // cell: row => (
      //   <div className='d-flex align-items-center'>
      //     <div className='user-info text-truncate ms-1'>
      //       <span className='d-block fw-bold text-truncate'> {row.salary}</span>
      //       {/* <small>Bal.: {row.salary}</small>{" "} */}

      //     </div>
      //   </div>
      // )
    },
    {
      name: 'Status',
      // minWidth: '150px',
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
      name: 'Payment Method',
      sortable: true,
      minWidth: '220px',
      selector: (row) => row.cash,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-1">
            <span className="d-block fw-bold text-truncate"> {row.cash}</span>
            {/* <span className='d-block fw-bold text-truncate'> CASH</span> */}

            {/* <small>Bal.: {row.salary}</small>{" "} */}
          </div>
        </div>
      )
    },
    // {
    //   name: 'Type',
    //   minWidth: '150px',
    //   sortable: row => row.status.title,
    //   cell: row => {
    //     return (
    //       <Badge color={status[row.status].color} pill>
    //         {status[row.status].title}
    //       </Badge>
    //     )
    //   }
    // },

    {
      name: 'Action',
      allowOverflow: true,
      cell: () => {
        return (
          <div className="d-flex">
            <UncontrolledDropdown>
              <DropdownToggle className="px-1" tag="span">
                <MoreVertical size={15} />
              </DropdownToggle>
            </UncontrolledDropdown>
          </div>
        );
      }
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
      age: '61',
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
