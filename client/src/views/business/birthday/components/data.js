import { Badge } from 'reactstrap';
import Addnotes from '../../Addnotes/Addnotes';
import Avatar from '@components/avatar';
import { Link } from 'react-router-dom';

// ** Table Zero Config Column

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

  if (row?.photo) {
    return <Avatar className="me-1" img={row.photo} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color || 'primary'}
        className="me-1"
        content={row.fullName || 'John Doe'}
        initials
      />
    );
  }
};

export const basicColumns = [
  {
    name: 'Full Name',
    sortable: true,
    minWidth: '240px',
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link to={`#`} className="user_name text-truncate text-body">
            <span className="fw-bolder">{row?.name}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row?.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Status',
    sortable: true,
    selector: (row) => (
      <>
        <Badge className="float-end" color="light-primary" pill>
          {'active'}
        </Badge>
      </>
    )
  },
  {
    name: 'Dob',
    sortable: true,
    selector: (row) => row.created
  },
  {
    name: 'Days left',
    sortable: true,
    center: true,
    cell: (row) => (
      <>
        <div className="circle">
          <p className="text">1</p>
        </div>
      </>
    )
  },
  {
    name: 'Age',
    sortable: true,
    selector: (row) => row.created
  },
  {
    name: 'Last Contacted',
    sortable: true,
    selector: (row) => row.created
  },
  {
    name: 'Manage',
    sortable: true,
    selector: (row) => (
      <>
        <Addnotes />
      </>
    )
  }
];
