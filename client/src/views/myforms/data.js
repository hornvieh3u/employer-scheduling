import { Archive, FileText, MoreVertical, Trash } from 'react-feather';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

// ** Table Zero Config Column

export const myFormData = [
  {
    name: 'Form Id',
    sortable: true,
    selector: (row) => row.formId
  },
  {
    name: 'Created Date',
    sortable: true,
    selector: (row) => row.createDate,
    minWidth: '150px'
  },
  {
    name: 'Document Name',
    sortable: true,
    selector: (row) => row.docName,
    minWidth: '200px'
  },
  {
    name: 'Access',
    sortable: true,
    selector: (row) => row.access,
    minWidth: '100px'
  },
  {
    name: 'View',
    sortable: true,
    center: true,
    minWidth: '100px',
    cell: (row) => (
      <>
        <Button className="btn btn-sm text-primary" outline>
          View
        </Button>
      </>
    )
  },
  {
    name: 'Action',
    sortable: true,
    selector: (row) => row,
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

export const myTask = [
  {
    name: 'Task Id',
    sortable: true,
    selector: (row) => row.formId
  },
  {
    name: 'Created',
    sortable: true,
    selector: (row) => row.createDate,
    minWidth: '150px'
  },
  {
    name: 'Task Name',
    sortable: true,
    selector: (row) => row.docName,
    minWidth: '200px'
  },
  {
    name: 'Access',
    sortable: true,
    selector: (row) => row.access,
    minWidth: '100px'
  },
  {
    name: 'View',
    sortable: true,
    center: true,
    minWidth: '100px',
    cell: (row) => (
      <>
        <Button className="btn btn-sm text-primary" outline>
          View
        </Button>
      </>
    )
  },
  {
    name: 'Action',
    sortable: true,
    selector: (row) => row,
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

const myTaskData = [
  {
    name: 'Form Id',
    sortable: true,
    selector: (row) => row.formId
  },
  {
    name: 'Type',
    sortable: true,
    selector: (row) => row.type
  },
  {
    name: 'Created',
    sortable: true,
    selector: (row) => row.created
  },
  {
    name: 'View',
    sortable: true,
    center: true,
    cell: (row) => (
      <>
        <Button color="link">View</Button>
      </>
    )
  }
];

export const data = [
  {
    id: 1,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 2,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 3,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 4,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 5,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 6,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 7,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 8,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 9,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 10,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 11,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 12,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 13,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 14,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 15,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 16,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  }
];

export const mytask = [
  {
    id: 1,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 2,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 3,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 4,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 5,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 6,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 7,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 8,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 9,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 10,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 11,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 12,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 13,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 14,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 15,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Passport ',
    access: 'admin',
    type: 'none'
  },
  {
    id: 16,
    formId: '167-161211',
    createDate: 'Jan 1, 2022',
    docName: 'Driving licence ',
    access: 'admin',
    type: 'none'
  }
];
