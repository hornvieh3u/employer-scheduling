// ** React Imports
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ** Third Party Components
// import Flatpickr from 'react-flatpickr'
import { ChevronDown, X } from 'react-feather';
import moment from 'moment';
// import Select, { components } from 'react-select'
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import AttendanceAction from './AttendanceAction';
import { getClasses } from './store';
import { getUserData } from '../../../auth/utils';
import AttendanceList from './AttendanceList';

const columns = [
  {
    name: 'Class',
    sortable: true,
    selector: (row) => row.classTitle
  },
  {
    name: 'Date',
    sortable: true,
    selector: (row) => moment(row.startDate).format('MM/DD/YY')
  },

  {
    name: 'Program',
    sortable: true,
    selector: (row) => row.programName[0]?.label
  },
  {
    name: 'Actions',
    allowOverflow: true,
    // style: {
    //     display: "flex", justifyContent: "center"
    // },
    cell: (row) => <AttendanceAction classRow={row} />
  }
];

const ViewAttendance = (props) => {
  const dispatch = useDispatch();
  // **  Props
  const { viewAttendanceOpen, setViewAttendanceOpen } = props;

  const classes = useSelector((state) => state.attendance?.classes);

  // ** States
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getClasses(getUserData()?.id));
  }, []);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Close BTN
  const CloseBtn = (
    <X
      className="cursor-pointer"
      size={15}
      onClick={() => setViewAttendanceOpen(!viewAttendanceOpen)}
    />
  );
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(classes.length / 7) || 1}
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
    <Modal
      isOpen={viewAttendanceOpen}
      // className="sidebar-xl"
      style={{ width: '600px' }}
      toggle={() => setViewAttendanceOpen(!viewAttendanceOpen)}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => setViewAttendanceOpen(!viewAttendanceOpen)}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Attendance</h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
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
              data={classes}
              expandableRows
              expandableRowsComponent={(row) => {
                return <AttendanceList classId={row?.data?._id} />;
              }}
              // selectableRowsComponent={BootstrapCheckbox}
              // selectableRows
            />
          </div>
          <Button
            color="secondary"
            type="reset"
            onClick={() => setViewAttendanceOpen(false)}
            outline
          >
            Close
          </Button>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default ViewAttendance;
