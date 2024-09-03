// ** React Imports
import React, { Fragment, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Edit2, Eye, Trash2, User } from 'react-feather';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Badge, Button, Input } from 'reactstrap';
import Avatar from '../../../components/avatar';

const DailyAttendance = [
  { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
  { name: 'English Class', date: '01/18/23', type: 'Personal' },
  { name: 'Science Class', date: '01/24/23', type: 'Business' },
  { name: 'Practice Class', date: '01/03/23', type: 'Business' },
  { name: 'Maths Class', date: '01/13/23', type: 'Other' },
  { name: 'English Class', date: '01/18/23', type: 'New Member' },
  { name: 'Science Class', date: '01/24/23', type: 'Other' },
  { name: 'Practice Class', date: '01/03/23', type: 'Information' },
  { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
  { name: 'English Class', date: '01/18/23', type: 'Personal' },
  { name: 'Science Class', date: '01/24/23', type: 'Reschedule' },
  { name: 'Practice Class', date: '01/03/23', type: 'Business' }
];
const columns = [
  {
    name: 'Student',
    sortable: true,
    selector: (row) => row.name
  },
  {
    name: 'Rank',
    sortable: true,
    selector: (row) => (
      <div className="d-flex align-items-center">
        <div
          className="d-flex justify-content-center align-items-center me-1"
          style={{
            height: '40px',
            width: '40px',
            backgroundColor: '#f3f2f7',
            borderRadius: '50%'
          }}
        >
          <User />
        </div>
        {row.name}
      </div>
    )
  },
  {
    name: 'Next Rank',
    sortable: true,
    selector: (row) => row.type
  },
  {
    name: 'Recommended',
    sortable: true,
    selector: (row) => row.date
  },

  // {
  //     name: "Candidate",
  //     sortable: true,
  //     selector: (row) => (
  //         <Input
  //             type="select"
  //             name="cansidate"

  //         >
  //             <option>Leadership</option>
  //             <option>BBC Candidate List 2</option>
  //         </Input>
  //     )
  // },
  // {
  //     name: "Stripe",
  //     sortable: true,
  //     selector: (row) => (
  //         <Input
  //             type="select"
  //             name="stripe"

  //         >
  //             <option>Stripe 1</option>
  //             <option>Stripe 2</option>
  //             <option>Stripe 3</option>
  //             <option>Stripe 4</option>

  //         </Input>
  //     )
  // },
  {
    name: 'Status',
    sortable: true,
    selector: (row) => (
      <Badge className="text-capitalize" color="light-success" pill>
        Promoted
      </Badge>
    )
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: (row) => (
      <div>
        {/* <Eye size={16} /> */}
        <Edit2 size={16} />
        <Trash2 size={16} className="ms-1" />
      </div>
    )
  }
];

const FinalStepperStatus = (props) => {
  const { stepper } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(DailyAttendance.length / 7) || 1}
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
          data={DailyAttendance}
          // selectableRowsComponent={BootstrapCheckbox}
          // selectableRows
        />
      </div>

      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
          <span className="align-middle d-sm-inline-block d-none">Close</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default FinalStepperStatus;
