/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather';
import moment from 'moment';

// ** Vars
const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
};

// ** renders client column
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      'light-success',
      'light-danger',
      'light-warning',
      'light-info',
      'light-primary',
      'light-secondary'
    ],
    color = states[stateNum];

  if (row?.avatar?.length) {
    return <Avatar className="me-50" img={row?.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color}
        className="me-50"
        content={row?.client ? row.client.name : 'John Doe'}
        initials
      />
    );
  }
};

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'no',
    minWidth: '100px',
    cell: (row) => (
      <Link
        to={{
          pathname: `/invoice/preview/${row._id}`,
          state: {
            ...row
          }
        }}
      >{`#${row.no}`}</Link>
    )
  },
  // {
  //     sortable: true,
  //     minWidth: '102px',
  //     sortField: 'invoiceStatus',
  //     name: <TrendingUp size={14} />,
  //     cell: (row) => {
  //         const color = invoiceStatusObj[row.invoiceStatus]
  //             ? invoiceStatusObj[row.invoiceStatus].color
  //             : 'primary',
  //             Icon = invoiceStatusObj[row.invoiceStatus]
  //                 ? invoiceStatusObj[row.invoiceStatus].icon
  //                 : Edit
  //         return (
  //             <Fragment>
  //                 <Avatar
  //                     color={color}
  //                     icon={<Icon size={14} />}
  //                     id={`av-tooltip-${row.id}`}
  //                 />
  //                 <UncontrolledTooltip
  //                     placement="top"
  //                     target={`av-tooltip-${row.id}`}
  //                 >
  //                     <span className="fw-bold">{row.invoiceStatus}</span>
  //                     <br />
  //                     <span className="fw-bold">Balance:</span> {row.balance}
  //                     <br />
  //                     <span className="fw-bold">Due Date:</span> {row.dueDate}
  //                 </UncontrolledTooltip>
  //             </Fragment>
  //         )
  //     }
  // },
  {
    name: 'Client',
    sortable: true,
    minWidth: '200px',
    sortField: 'client.name',
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <h6 className="user-name text-truncate mb-0">{name}</h6>
            <Link
              to={{
                pathname: `/invoice/preview/${row._id}`,
                state: {
                  ...row
                }
              }}
            >
              <small className="text-truncate mb-0">{'Full name'}</small>
            </Link>
          </div>
        </div>
      );
    }
  },
  {
    name: 'Invoice Name',
    sortable: true,
    minWidth: '100px',
    sortField: 'totalAmount',
    cell: (row) => <span>${row.totalAmount || 0}</span>
  },
  {
    sortable: true,
    minWidth: '100px',
    name: 'Status',
    sortField: 'createdAt',
    cell: (row) => (
      <div>
        <UncontrolledDropdown caret>
          <DropdownToggle tag="span">
            <Badge color="success">Paid</Badge>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="status">
              <Badge color="success">Paid</Badge>
            </DropdownItem>
            <DropdownItem className="status">
              <Badge color="warning">Pendding</Badge>
            </DropdownItem>
            <DropdownItem className="status">
              <Badge color="info">Due</Badge>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  },
  {
    name: 'Issue Date',
    sortable: true,
    minWidth: '100px',
    sortField: 'totalAmount',
    cell: (row) => <span>{moment(row.date).format('MM/DD/YYYY')}</span>
  },
  {
    name: 'Paid',
    sortable: true,
    minWidth: '100px',
    sortField: 'totalAmount',
    cell: (row) => <span>${row?.balance - row.totalAmount}</span>
  },
  {
    sortable: true,
    name: 'Due',
    minWidth: '100px',
    sortField: 'balance',
    cell: (row) => <span>{moment(row.dueDate).format('MM/DD/YYYY')}</span>
  },
  {
    sortable: true,
    name: 'Total',
    minWidth: '100px',
    sortField: 'balance',
    cell: (row) => <span>${row.totalAmount || 0}</span>
  },
  {
    name: 'Action',
    minWidth: '100px',
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Send className="cursor-pointer" size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>
        <Link to={`/invoice/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag="span">
            <MoreVertical size={17} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
              <Download size={14} className="me-50" />
              <span className="align-middle">Download</span>
            </DropdownItem>
            <DropdownItem tag={Link} to={`/invoice/edit/${row._id}`} className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Trash size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
            <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
              <Copy size={14} className="me-50" />
              <span className="align-middle">Duplicate</span>
            </DropdownItem>
            <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
              <Send size={14} className="me-50" />
              <span className="align-middle">Send Invoice</span>
            </DropdownItem>
            <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
              <Save size={14} className="me-50" />
              <span className="align-middle">Save Invoice</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
];
