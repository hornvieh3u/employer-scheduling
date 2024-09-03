// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

//** third party imports */

import { ChevronDown } from 'react-feather';
import moment from 'moment';
// ** Custom Components
import Avatar from '@components/avatar';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

// ** Events Actions  Import
import StudentAttendanceAction from './StudentAttendanceAction';
import { getAttendance } from './store';

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

const columns = [
  {
    name: 'Profile',
    sortable: true,
    selector: (row) => {
      if (row?.image !== '') {
        return <Avatar className="me-1" img={row?.image} width="32" height="32" initials />;
      } else {
        return (
          <Avatar
            color={color || 'primary'}
            className="me-1"
            // initials
          />
        );
      }
    }
  },
  {
    name: 'Name',
    sortable: true,
    selector: (row) => <span>{`${row?.fullName}` || 'N A'}</span>
  },
  {
    name: 'Class',
    sortable: true,
    selector: (row) => row.className
  },
  {
    name: 'Date',
    sortable: true,
    selector: (row) => moment(row.date).format('MM/DD/YY')
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: (row) => <StudentAttendanceAction classRow={row} />
  }
];

const AttendanceList = (props) => {
  const { classId } = props;
  // ** Store vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance);
  const classAttendees = store?.classAttendees;
  // ** States
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (classId !== undefined && classId !== '') {
      dispatch(getAttendance(classId));
    }
  }, [classId]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(classAttendees.length / 7) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  return (
    <Fragment>
      <Row>
        <Col>
          <div className="react-dataTable mt-2">
            <DataTable
              noHeader
              pagination
              columns={columns}
              paginationPerPage={7}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
              data={classAttendees}
              // selectableRowsComponent={BootstrapCheckbox}
              // selectableRows
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AttendanceList;
