// ** React Imports
import { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiBorderRadius, BiUser } from 'react-icons/bi';
import { BiCalendarEvent } from 'react-icons/bi';
import { BsPrinter } from 'react-icons/bs';
import { MdAddIcCall } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';

// import PopConfirm from 'react-popconfirm'

// ** import from react-feather
import { Check, MoreVertical, Trash2, X } from 'react-feather';

// ** New Client Sidebar
import Sidebar from './Sidebar';
import CSVReader from 'react-csv-reader';

// import csv for export csv table
import { CSVLink } from 'react-csv';

// for PDF export
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// ** Table Columns
import useColumns from './useColumns';

// import client contacts and positions
// import {
//   useGetClientContacts,
//   useGetClientPosition
// } from '../../../../requests/contacts/client-contacts';

// ** Store & Actions
import { getAllData, getData } from '../store';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  ClientContactFetchAction,
  totalClientCountAction,
  totalActiveClientCountAction,
  totalPastDueClientCountAction,
  totalFormerClientCountAction,
  contactFileUploadAction,
  contactImportAction,

  //tags Fetch
  fetchTagsAction,
  deleteClientContact
} from '../store/actions';
import Avatar from '@components/avatar';
import { importProcessingReset } from '../store/reducer';

// ** Third Party Components
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, Share, FileText, File, Upload, TrendingUp, Download } from 'react-feather';

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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  FormText
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

import { deleteContactReset } from '../store/reducer';
import useMessage from '../../../../lib/useMessage';
// import BorderStyle from 'pdf-lib/cjs/core/annotation/BorderStyle';
import AddProgression from './AddProgression';
// import MergeModal from './MergeModal';

// ** Table Header
const CustomHeader = ({
  store,
  clientStore,
  tableData,
  toggleSidebar,
  handlePerPage,
  showdelete,
  rowsPerPage,
  handleFilter,
  setContactImportModal,
  setIsMergeModalOpen
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(store?.data[0]);
    // const keys = Object.keys(array)

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // for CSV export

  // const tableData = clientStore?.contacts?.list

  const formatedData =
    tableData &&
    tableData.map(
      (
        { _id, userId, photo, tags, isFormer, isDelete, ranks, files, others, __v, ...rest },
        index
      ) => {
        const sl = index + 1;
        const restData = { sl, ...rest };
        const { address } = { ...rest };

        const reorderedAddress = {
          city: null,
          street: null,
          zipCode: null,
          state: null,
          country: null
        };
        const newAddressData = Object.assign(reorderedAddress, address);

        const addressValues = Object.values(newAddressData);
        const joinedAddressValues = addressValues
          .filter((x) => typeof x === 'string' && x.length > 0)
          .join(', ');

        /* if (joinedAddressValues === '') {
            joinedAddressValues = 'N/A'
        } */

        const fullAddress = { address: joinedAddressValues };

        const finalData = Object.assign(restData, fullAddress);

        return finalData;
      }
    );

  // csv headers

  const headers = [
    { label: 'Serial', key: 'sl' },
    { label: 'Client Name', key: 'fullName' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Gender', key: 'gender' },
    { label: 'Address', key: 'address' },
    { label: 'Status', key: 'status' },
    { label: 'Note', key: 'note' },
    { label: 'Company Phone', key: 'companyPhone' },
    { label: 'Company Email', key: 'companyEmail' },
    { label: 'Type', key: 'type' },
    { label: 'Company', key: 'company' },
    { label: 'Position', key: 'position' },
    { label: 'Social Links', key: 'socialLinks' },
    { label: 'Payment Methods', key: 'paymentMethods' }
  ];

  const csvReport = {
    filename: 'clients.csv',
    headers: headers,
    data: formatedData
  };

  // Hover on CSV

  const [isHover, setIsHover] = useState(false);
  const [openAddProgression, setOpenAddProgression] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // for PDF export

  const columns = [
    { title: 'Sl', field: 'sl' },
    { title: 'Client', field: 'fullName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'Gender', field: 'gender' },
    { title: 'Address', field: 'address' },
    { title: 'Status', field: 'status' },
    { title: 'Note', field: 'note' },
    { title: 'Company Phone', field: 'companyPhone' },
    { title: 'Company Email', field: 'companyEmail' },
    { title: 'Type', field: 'type' },
    { title: 'Company', field: 'company' },
    { title: 'Position', field: 'position' },
    { title: 'Social Link', field: 'socialLink' },
    { title: 'Payment Methods', field: 'paymentMethods' }
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Client Details', 15, 10);
    doc.autoTable({
      styles: {
        fontSize: 8
      },
      theme: 'grid',
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: formatedData,
      horizontalPageBreak: true,
      headStyles: {
        halign: 'center',
        valign: 'middle',
        fontSize: 7,
        fillColor: ['#f3f2f7'],
        textColor: '#202c33',
        tableWidth: 'auto'
      },
      bodyStyles: {
        textColor: 'black'
      }
    });
    doc.save('clients.pdf');
  };

  // temp value store
  const [tempValue, setTempValue] = useState('');

  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row className="mb-2 border p-2">
        <h4>Filters</h4>
        <Col md="3">
          <Label for="role-select">Position</Label>
          <Select
            isClearable={false}
            // value={currentRole}
            // options={roleOptions}
            className="react-select"
            classNamePrefix="select"
            theme={selectThemeColors}
            // onChange={(data) => {
            //   setCurrentRole(data);
            // }}
          />
        </Col>
        <Col className="my-md-0 my-1" md="3">
          <Label for="plan-select">Client Type</Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            // options={planOptions}
            // value={currentPlan}
            // onChange={(data) => {
            //   setCurrentPlan(data);
            // }}
          />
        </Col>
        <Col md="3">
          <Label for="status-select">Status</Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            // options={statusOptions}
            // value={currentStatus}
            // onChange={(data) => {
            //   setCurrentStatus(data);
            // }}
          />
        </Col>
        <Col md="3">
          <Label for="status-select">Tag</Label>
          <Select
            // isMulti
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            // options={tags}
            // value={currentTag}
            // onChange={(data) => {
            //   setCurrentTag(data);
            // }}
          />
        </Col>
      </Row>
      <Row>
        <Col xl="" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="8"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              // value={tempValue}
              onChange={(e) => {
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
              }}
            />
          </div>

          <div className="d-flex text-center">
            {showdelete ? (
              <div>
                <Button
                  className="btn-icon me-1"
                  outline
                  color="primary"
                  // onClick={() => toggle ((p) => !p)}
                >
                  <AiOutlineDelete size={16} />
                </Button>
              </div>
            ) : (
              ''
            )}
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setOpenAddProgression(true)}
              >
                {/* <BiUser size={16} /> */}
                <TrendingUp size={16} />
              </Button>
            </div>
            <div>
              <Button className="btn-icon me-1" outline color="primary">
                <BiCalendarEvent size={16} />
              </Button>
            </div>
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setIsMergeModalOpen(true)}
              >
                <BsPrinter size={16} />
              </Button>
            </div>

            <div>
              <Button.Ripple
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setContactImportModal((p) => !p)}
              >
                {/* <Upload size={16} /> */}
                <Download size={16} />
              </Button.Ripple>
            </div>
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="w-100"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    // downloadCSV(store.data)
                  }}
                >
                  <FileText className="font-small-4 me-50" />
                  {tableData && (
                    <CSVLink {...csvReport}>
                      <span
                        className="align-middle"
                        style={{
                          color: isHover ? '#7367f0' : '#b4b7bd'
                        }}
                      >
                        CSV
                      </span>
                    </CSVLink>
                  )}
                </DropdownItem>
                {tableData && (
                  <DropdownItem className="w-100" onClick={() => downloadPdf()}>
                    <File className="font-small-4 me-50" />
                    <span className="align-middle">PDF</span>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button
              style={{ fontSize: '12px' }}
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              Add New Client
            </Button>
          </div>
        </Col>
      </Row>
      <AddProgression
        setOpenAddProgression={setOpenAddProgression}
        openAddProgression={openAddProgression}
      />
    </div>
  );
};

const UsersList = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(false);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);

  const toggle = () => setModal(!modal);

  const [modal2, setModal2] = useState(false);

  const toggle2 = () => setModal2(!modal2);

  const notify = () => toast.success(<ToastContent message="Note Edited successfully" />);
  // get all client's data from db
  // const { data: tableData, refetch: clientRefetch } = useGetClientContacts();

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const clientStore = useSelector((state) => state.clientContact);
  // table columns
  const { success } = useMessage();

  // Delete Contact Modal
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    show: false
  });

  // const {
  //   deleteContact: { isSuccess: deleteSuccess, isLoading: deleteLoading }
  // } = useSelector((state) => state.clientContact);

  // useMemo(() => {
  //   if (deleteSuccess) {
  //     // Reset Store
  //     dispatch(deleteContactReset());

  //     // Refetch All Counts
  //     dispatch(totalClientCountAction());
  //     dispatch(totalActiveClientCountAction());
  //     dispatch(totalPastDueClientCountAction());
  //     dispatch(totalFormerClientCountAction());
  //     dispatch(fetchTagsAction());

  //     // show Message
  //     success('contact Deleted Successfully');

  //     // Hide modal
  //     setDeleteModal({
  //       id: '',
  //       show: false
  //     });
  //   }
  // }, [deleteSuccess]);
  // table columns
  const { columns } = useColumns({ setDeleteModal }, { toggle });

  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );

  // ** States
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  const [currentTag, setCurrentTag] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  // Contact import modal
  const [contactImportModal, setContactImportModal] = useState(false);
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [contactImportStep, setContactImportStep] = useState('first');
  const [contactImportCsvFile, setContactImportCsvFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showdelete, setShowdelete] = useState(false);

  function onchangeImportContact(index, column, value) {
    let newData = [];
    let i = 0;
    for (let each of contacts) {
      if (i === index) {
        newData.push({ ...each, [column]: value });
      } else {
        newData.push(each);
      }
      i++;
    }
    setContacts(newData);
  }

  // Popover
  // const [popoverOpen, setPopoverOpen] = useState(false)

  function fetchData() {
    dispatch(
      ClientContactFetchAction({
        sortType: sort,
        sortKey: sortColumn,
        text: searchTerm,
        page: currentPage,
        pageSize: rowsPerPage,
        position: currentRole.value,
        status: currentStatus.value,
        type: String(currentPlan.value).toLowerCase(),
        status: String(currentStatus.value).toLowerCase(),
        tag: currentTag.value
      })
    );
  }

  // ** Get data on mount
  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    sort,
    sortColumn,
    currentPage,
    currentRole,
    currentPlan,
    currentStatus,
    rowsPerPage,
    searchTerm,
    currentTag
  ]);

  // ** get State data on mount
  useEffect(() => {
    dispatch(totalClientCountAction());
    dispatch(totalActiveClientCountAction());
    dispatch(totalPastDueClientCountAction());
    dispatch(totalFormerClientCountAction());
    dispatch(fetchTagsAction());
  }, [dispatch]);

  // Search By Tags
  const [tags, setTags] = useState([]);

  useMemo(() => {
    if (
      !clientStore?.contactUpload?.fileProcessing &&
      clientStore?.contactUpload?.contacts?.length > 0
    ) {
      setContactImportStep('second');
      setContacts(clientStore.contactUpload.contacts);
    } else {
      setContactImportStep('first');
    }

    // if (clientStore.contactUpload.uploadState === 'success') {
    //   setContactImportModal(false);
    //   // // Recall Fetch data again
    //   fetchData();
    //   // // Reset upload state
    //   dispatch(importProcessingReset());
    //   dispatch(totalClientCountAction());
    //   toast.success(<ToastContent message="Contacts import successfully" />);
    // }

    if (clientStore?.tags?.data?.length > 0) {
      let buildTags = clientStore?.tags?.data.map((x, i) => ({
        value: x,
        label: x,
        number: i
      }));

      buildTags = [{ value: '', label: 'Select Tag', number: buildTags.length }, ...buildTags];

      setTags(buildTags);
    }
  }, [clientStore]);
  // ** User filter options

  // Default client position options
  const roleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];
  // get client positions data from db
  // const { data: positions } = useGetClientPosition();
  // push every position to roleoptions
  // positions?.map((p) => {
  //   const value = p.position;
  //   const label = p.position;
  //   const roles = { value, label };

  //   roleOptions.push(roles);
  // });

  // ----------------------------------

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'Individual', label: 'Individual' },
    { value: 'company', label: 'Company' }
  ];

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ];

  // ** Function in get data on page change
  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change

  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(clientStore?.contacts?.total / rowsPerPage);
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
  const dataToRender = () => {
    return [
      {
        "_id": "63d150bec681252e78d0be07",
        "userId": "63ca9114e88b09d5d926009f",
        "fullName": "Shiv",
        "email": "cmatkd187th@gmail.com",
        "phone": "",
        "photo": "",
        "gender": "male",
        "address": {
          "zipCode": "",
          "state": "",
          "street": "",
          "city": "",
          "country": ""
        },
        "status": "active",
        "note": "",
        "tags": [],
        "companyPhone": "",
        "companyEmail": "",
        "type": "individual",
        "company": "ijdkljdsbdhgfdfgdsfdfd",
        "position": "Owner",
        "isFormer": false,
        "isDelete": false,
        "socialLinks": [],
        "ranks": [],
        "files": [],
        "others": [],
        "paymentMethods": [],
        "__v": 0
      },
      {
        "_id": "63d150bec681252e78d0be07",
        "userId": "63ca9114e88b09d5d926009f",
        "fullName": "Admin",
        "email": "admin@gmail.com",
        "phone": "",
        "photo": "",
        "gender": "male",
        "address": {
          "zipCode": "",
          "state": "",
          "street": "",
          "city": "",
          "country": ""
        },
        "status": "active",
        "note": "",
        "tags": [],
        "companyPhone": "",
        "companyEmail": "",
        "type": "individual",
        "company": "ijdkljdbddhgfgdfghdfdfhhd",
        "position": "Owner",
        "isFormer": false,
        "isDelete": false,
        "socialLinks": [],
        "ranks": [],
        "files": [],
        "others": [],
        "paymentMethods": [],
        "__v": 0
      }
    ]
    // return clientStore?.contacts?.list || [];
  };
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
  const tabledata = [
    {
      id: 1,
      date: '1/01/2023',
      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP',
      mode: <MoreVertical size={14} className="cursor-pointer" />
    },
    {
      id: 2,
      date: '2/01/2023',

      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP',
      mode: <MoreVertical size={14} className="cursor-pointer" />
    },
    {
      id: 3,
      date: '3/01/2023',
      title: 'Beetlejuice',
      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP',
      mode: <MoreVertical size={14} className="cursor-pointer" />
    },
    {
      id: 4,
      date: '4/01/2023    ',
      title: 'Beetlejuice',
      name: '',
      category: 'The Bird',
      subcategory: 'BBC MEMBERSHIP',
      mode: <MoreVertical size={14} className="cursor-pointer" />,
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 5,
      date: '5/01/2023',
      title: 'Beetlejuice',
      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP'
    }
  ];
  const columnsdata = [
    {
      name: 'Date',
      selector: (row) => row.date
    },
    {
      name: 'Note Type',
      selector: (row) => row.name
    },
    {
      name: 'Follow up',
      selector: (row) => row.category
    },
    {
      name: 'Note',
      selector: (row) => row.subcategory
    },
    {
      name: 'Action',
      selector: (row) => row.mode,
      cell: (row) => (
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="span"
              // href="/"
              className="w-100"
              // onClick={(e) => {
              //     // e.preventDefault()
              //     // onDelete(row._id)
              //     setDeleteModal({
              //         id: row._id,
              //         show: true
              //     })
              // }}
              onClick={(e) => {
                e.preventDefault();
                toggle2();
                // store.dispatch(deleteClientContact(row._id))
              }}
            >
              <FiEdit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="span"
              // href="/"
              className="w-100"
              onClick={(e) => {
                // e.preventDefault()
                // onDelete(row._id)
                setDeleteModal({
                  // id: row._id,
                  show: true
                });
              }}
            >
              <AiOutlineDelete size={14} className="me-50" />
              <span className="align-middle">Remove</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setShowdelete(true);
    } else {
      setShowdelete(false);
    }
  };
  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="3">
              <Label for="role-select">Position</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="3">
              <Label for="plan-select">Client Type</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                }}
              />
            </Col>
            <Col md="3">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col>
            <Col md="3">
              <Label for="status-select">Tag</Label>
              <Select
                // isMulti
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={tags}
                value={currentTag}
                onChange={(data) => {
                  setCurrentTag(data);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                setContactImportModal={setContactImportModal}
                store={store}
                clientStore={clientStore}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                showdelete={showdelete}
                setIsMergeModalOpen={setIsMergeModalOpen}
              />
            }
            onSelectedRowsChange={handleRowSelected}
            selectableRows
          />
        </div>
      </Card>
      {/* Notes Modal */}
      <Modal
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={modal}
        // modalTransition={{ timeout: 100 }}
        // backdropTransition={{ timeout: 200 }}
        toggle={toggle}
        style={{ maxWidth: '80rem ' }}
        className={className}
      >
        <ModalHeader toggle={toggle}>Notes for Users</ModalHeader>
        <ModalBody>
          <Row>
            <Col xl="5" sm="12">
              <Row>
                <Col xl="6">
                  <Card
                    style={{
                      width: '100',
                      boxShadow: 'none'
                    }}
                  >
                    <img class="rounded" alt="Sample" src="https://picsum.photos/300/200" />

                    <Button className="mt-2 color-primary" color="primary">
                      Add Appointment
                    </Button>
                  </Card>
                </Col>
                <Col xl="6" className="">
                  <div className="mb-1">
                    <MdAddIcCall size={20} className="" />
                    <Label className="px-1">516-543-9671 </Label>
                  </div>
                  <div className="mb-1">
                    <AiOutlineMail size={20} />
                    <Label className="px-1"> N/A</Label>
                  </div>
                  <div>
                    <GoLocation size={20} className="mb-4" />
                    <Label className="px-1">
                      {' '}
                      1040 46th Road. <br />
                      long island city,
                      <br />
                      NewYork-11101
                    </Label>
                  </div>
                  <p className="mx-2">Primary Note : N/A</p>
                </Col>
                <Col xl="12">
                  <Form row>
                    <Row>
                      <span>
                        <b>New Note</b>
                      </span>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleSelect" sm={2}></Label>
                          <Col sm={12}>
                            <Label for="exampleText">
                              <b>Follow Up Type</b>
                            </Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              placeholder="Select Notes"
                            >
                              <option selected> Select Notes</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleSelect" sm={2}></Label>
                          <Col sm={10}>
                            <Label for="exampleText">
                              <b>Response*</b>
                            </Label>
                            <Input id="exampleSelect" name="select" type="select">
                              <option selected>Left Message</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col xl="11">
                        <FormGroup>
                          <Label for="exampleText">
                            <b>Notes*</b>
                          </Label>
                          <Input id="exampleText" name="text" type="textarea" />
                        </FormGroup>
                      </Col>
                      <Col xl="11">
                        <div className="d-flex mt-0 justify-content-end">
                          <button type="button" class="btn btn-primary">
                            Save Notes
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col xl="7">
              <DataTable columns={columnsdata} data={tabledata} pagination />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal
        fullscreen="md"
        size="sm"
        centered="true"
        scrollable="false"
        isOpen={modal2}
        toggle={toggle2}
      >
        <ModalHeader toggle={toggle2}>Edit Note</ModalHeader>
        <ModalBody>
          <Col lg="12">
            <Form row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Follow Up Type</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        placeholder="Select Notes"
                      >
                        <option selected> Select Notes</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect" sm={2}></Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Response*</b>
                      </Label>
                      <Input id="exampleSelect" name="select" type="select">
                        <option selected>Left Message</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <FormGroup>
                    <Label for="exampleText">
                      <b>Notes*</b>
                    </Label>
                    <Input id="exampleText" name="text" type="textarea" />
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <div className="d-flex mt-0 justify-content-end">
                    <button type="button" class="btn btn-primary" onClick={notify}>
                      Save Notes
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={contactImportModal}
        toggle={() => setContactImportModal(false)}
        className={`modal-dialog-centered ${
          contactImportStep === 'first' ? 'modal-sm' : 'modal-xl'
        }`}
        key={123}
      >
        <ModalHeader toggle={() => setContactImportModal(false)}>
          {contactImportStep === 'first' ? 'Choose CSV file' : 'Final Check to import '}
        </ModalHeader>
        <ModalBody>
          {contactImportStep === 'first' ? (
            <Fragment>
              <CSVReader
                onFileLoaded={(data, fileInfo, originalFile) => {
                  let contactData = [];

                  contactData = data.filter((x, i) => {
                    let isEmpty = true;
                    for (let each of Object.values(x)) {
                      if (each !== '') {
                        isEmpty = false;
                      }
                    }
                    return !isEmpty;
                  });

                  contactData = contactData.map((x, i) => {
                    let data = Object.values(x).filter((x) => x !== '');
                    return {
                      ...data
                    };
                  });

                  setContacts(contactData);
                  setContactImportStep('second');
                }}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <span style={{ textAlign: 'center', flex: 1 }}>Serial</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Full Name</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Email</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Contact</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Type</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Company</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Position</span>
              </div>
              {contacts &&
                contacts.map((contact, index) => (
                  <div
                    key={index + 1}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Input style={{ flex: 1 }} value={index + 1} />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[0]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 0, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[1]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 1, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[2]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 2, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[3]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 3, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[4]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 4, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[5]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 5, e.target.value)}
                    />
                  </div>
                ))}
            </Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          {contactImportStep !== 'first' && (
            <Button
              onClick={() => {
                setContactImportStep('first');
              }}
              color="primary"
              outline
            >
              Upload Again
            </Button>
          )}

          <Button
            color="primary"
            outline
            onClick={() => {
              if (contactImportStep === 'first') {
                if (contactImportCsvFile === null) {
                  return;
                }
                // let form = new FormData()
                // form.append('file', contactImportCsvFile)
                // form.append('type', 'csv')
                // dispatch(contactFileUploadAction(form))

                // Lets Parse This Here
              } else {
                // Import Contact
                // Check if type has Error or Not
                const CheckInvalidType = contacts.find((x, i) => {
                  if (x[3] === 'individual' || x[3] === 'company') {
                    return false;
                  }
                  return true;
                });

                if (CheckInvalidType) {
                  toast.error(
                    <ToastContent message="Type Column must have value individual or company" />
                  );
                  return;
                }

                // Check Position Error
                const CheckInvalidPosition = contacts.find((x, i) => {
                  if (
                    x[5] === 'owner' ||
                    x[5] === 'assitant' ||
                    x[5] === 'billing' ||
                    x[5] === 'n/a'
                  ) {
                    return false;
                  }
                  return true;
                });

                if (CheckInvalidPosition) {
                  toast.error(
                    <ToastContent message="Position Column must have value owner / assitant / billing / n/a" />
                  );
                  return;
                }

                dispatch(contactImportAction({ contacts }));
              }
            }}
          >
            {contactImportStep === 'first' ? 'submit' : ' finish import'}
          </Button>
        </ModalFooter>
      </Modal>
      {/* // Sidebar Open */}
      <Sidebar
        clientStore={clientStore}
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setCurrentPage={setCurrentPage}
      />

      {/* // Delete Modal  */}
      <Modal
        toggle={() => {
          setDeleteModal({
            id: '',
            show: false
          });
        }}
        centered
        isOpen={deleteModal.show}
      >
        <ModalBody>
          <div>
            <h3>Are you sure to Delete ?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={() => {
              setDeleteModal({
                id: '',
                show: false
              });
            }}
          >
            No
          </Button>
          <Button
            size="sm"
            color="primary"
            onClick={() => {
              setCurrentPage(1);
              dispatch(deleteClientContact(deleteModal?.id));
            }}
          >
            {/* {deleteLoading ? 'Deleting...' : 'Yes'} */}
          </Button>{' '}
        </ModalFooter>
      </Modal>


      {/*  */}
    </Fragment>
  );
};

export default UsersList;
