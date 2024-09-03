// ** React Imports
import { Fragment, useState } from 'react';
import { BsPrinter } from 'react-icons/bs';

// import csv for export csv table
import { CSVLink } from 'react-csv';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// import client contacts and positions
import {
  useGetClientContacts,
  useGetClientPosition
} from '../../../../requests/contacts/client-contacts';

// ** Store & Actions

import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { Share, FileText, File } from 'react-feather';

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
  UncontrolledDropdown
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const UsersList = (props) => {
  // get all client's data from db
  const { data: tableData, refetch: clientRefetch } = useGetClientContacts();

  // ** States

  const [searchTerm, setSearchTerm] = useState('');

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });

  // Default client position options
  const roleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];
  // get client positions data from db
  const { data: positions } = useGetClientPosition();
  // push every position to roleoptions
  positions?.map((p) => {
    const value = p.position;
    const label = p.position;
    const roles = { value, label };

    roleOptions.push(roles);
  });

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

  // ** Function in get data on search query change

  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  const tabledata = [
    {
      id: 1,
      date: '1/01/2023',
      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP',
      mode: (() => {
        return (
          <div>
            <a>Print</a>/<a>View</a>
          </div>
        );
      })()
    },
    {
      id: 2,
      date: '2/01/2023',

      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP',
      mode: (() => {
        return (
          <div>
            <a>Print</a>/<a>View</a>
          </div>
        );
      })()
    },
    {
      id: 3,
      date: '3/01/2023',
      title: 'Beetlejuice',
      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP',
      mode: (() => {
        return (
          <div>
            <a>Print</a>/<a>View</a>
          </div>
        );
      })()
    },
    {
      id: 4,
      date: '4/01/2023    ',
      title: 'Beetlejuice',
      name: '',
      category: 'The Bird',
      subcategory: 'BBC MEMBERSHIP',
      mode: (() => {
        return (
          <div>
            <a>Print</a>/<a>View</a>
          </div>
        );
      })(),
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 5,
      date: '5/01/2023',
      title: 'Beetlejuice',
      name: '',
      category: '',
      subcategory: 'BBC MEMBERSHIP',
      mode: (() => {
        return (
          <div>
            <a>Print</a>/<a>View</a>
          </div>
        );
      })()
    }
  ];
  const columnsdata = [
    {
      name: 'Serial Number',
      selector: (row) => row.id
    },
    {
      name: 'Order Time',
      selector: (row) => row.date
    },
    {
      name: 'Shipping Address',
      selector: (row) => row.category
    },
    {
      name: 'Payment Method',
      selector: (row) => row.subcategory
    },
    {
      name: 'Amount',
      selector: (row) => row.subcategory
    },
    {
      name: 'Status',
      selector: (row) => row.subcategory
    },
    {
      name: 'Action',
      selector: (row) => row.subcategory
    },
    {
      name: 'Invoice',
      selector: (row) => row.mode
    }
  ];

  const columns1 = [
    { title: 'Serial Number', field: 'Serial Number' },
    { title: 'Order Time', field: 'Order Time' },
    { title: 'Shipping Address', field: 'Shipping Address' },
    { title: 'Phone', field: 'phone', type: 'numeric' },
    { title: 'Payment Method', field: 'Payment Method' },
    { title: 'Amount', field: 'Amount' },
    { title: 'Status (Badge)', field: 'Status (Badge)' },
    { title: 'Action', field: 'Action' },
    { title: 'Invoice', field: 'Invoice' }
    // { title: "Company Email", field: 'companyEmail' },
    // { title: "Type", field: 'type' },
    // { title: "Company", field: 'company' },
    // { title: "Position", field: 'position' },
    // { title: "Social Link", field: 'socialLink' },
    // { title: "Payment Methods", field: 'paymentMethods' }
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Orders Details', 15, 10);
    doc.autoTable({
      styles: {
        fontSize: 8
      },
      theme: 'grid',
      columns: columns1.map((col) => ({ ...col, dataKey: col.field })),
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
    doc.save('orders.pdf');
  };

  let typingTimer;
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }

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

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="3">
              {/* <div className="d-flex align-items-center mb-sm-0 mb-1 me-1"> */}
              <Label for="search-invoice">Search:</Label>
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
              {/* </div> */}
            </Col>
            <Col className="my-md-0 my-1" md="3">
              <Label for="plan-select">Filter by status</Label>
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
              <Label for="status-select">Filter by days</Label>
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
            <Col md="2">
              <Label for="plan-select"></Label>
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
            </Col>
            <Col md="1">
              <Label for="plan-select"></Label>
              <div>
                <Button className="btn-icon me-1" outline color="primary">
                  <BsPrinter size={16} />
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <Col>
          <DataTable columns={columnsdata} data={tabledata} pagination />
        </Col>
      </Card>
    </Fragment>
  );
};

export default UsersList;
