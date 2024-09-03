// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react';

// ** Invoice List Sidebar

// ** Table Columns
import useColumns from './useColumns';

import CSVReader from 'react-csv-reader';

// ** Store & Actions
import { getAllData, getData } from './store';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import {
  ChevronDown,
  Share,
  // Printer,
  FileText,
  File,
  // Grid,
  // Copy,
  Upload
} from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,

  //----------- >
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

import { contactImportAction } from './store/actions';
import { importProcessingReset } from './store/reducer';
import useMessage from '../../../lib/useMessage';

// Message
import 'jspdf-autotable';
import { useGetEmployeePosition } from '../../../requests/contacts/employee-contacts';

const EmployeeList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const { employeeList } = useSelector((state) => state.employeeContact);
  // table columns
  const { success } = useMessage();
  const {
    deleteEmployee: { success: deleteSuccess, loading: deleteLoading }
  } = useSelector((state) => state.employeeContact);

  // Delete Contact Modal
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  useMemo(() => {
    if (deleteSuccess) {
      // Reset Store

      // refetch all data again

      dispatch(deleteEmployeeReset());
      // show Message
      success('contact Deleted Successfully');
      // Hide modal
      setDeleteModal({
        id: '',
        show: false
      });
    }
  }, [deleteSuccess]);

  // table columns
  const { columns } = useColumns({ setDeleteModal });

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Outlet'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  // Contact import modal
  const [contactImportModal, setContactImportModal] = useState(false);
  const [contactImportCsvFile, setContactImportCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [contactImportStep, setContactImportStep] = useState('first');

  const {
    contactUpload: { importing, uploadState }
  } = useSelector((state) => state.employeeContact);
  // contactUpload
  useMemo(() => {
    if (uploadState === 'success') {
      // Reset state
      dispatch(importProcessingReset());

      // fetch list with empy option

      // hide modal
      setContactImportModal(false);
      setContacts([]);
      setContactImportCsvFile(null);
      setContactImportStep('first');
      // show message
      success('contact import successfull');
    }
  }, [uploadState]);


  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
    console.log(rows?.id)
  };
  // ** User filter options

  const [roleOptions, setRoleOptions] = useState([
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ]);

  // get position data from db
  const { data: positions, refetch, isLoading: positionLoading } = useGetEmployeePosition();

  // ** Sort by role
  const newRoleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'owner', label: 'owner' }
  ];

  //positions array function
  const getPositions = () => {
    try {
      //loading handler
      if (positionLoading) {
        return <h2>Loading</h2>;
      }
      if (positions) {
        positions?.map((position) => {
          if (newRoleOptions.includes(position?.position.toLowerCase())) {
            return;
          }
          newRoleOptions.push({
            value: `${position.position.toLowerCase()}`,
            label: `${position.position.toLowerCase()}`
          });
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
    setRoleOptions(newRoleOptions);
  };
  //calling the function
  useEffect(getPositions, [positions]);


  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };


  // ** Custom Pagination
  const CustomPagination = () => {
    // const count = Number(Math.ceil(store.total / rowsPerPage));
    const count = Math.ceil(employeeList?.data?.total / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };

  // ** Table data to render

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    );
  };

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable employee-list-table">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={employeeList?.data?.list}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default EmployeeList;
