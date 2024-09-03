import { Archive, Edit, FileText, MoreVertical, PenTool, Trash } from 'react-feather';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Badge,
  Input
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

export const groupHeader = (editGroup, deleteGroup) => [
  {
    name: 'Group Name',
    selector: (row) => row.name
  },
  // {
  //   name: 'Location',
  //   sortable: false,
  //   selector: (row) => row.location
  // },
  {
    name: 'Positions',
    selector: (row) => {
      if( row.positions.length ) {
        return (
          <div className="d-flex gap-1">
            {
              row.positions.map(position => (
                <span className='badge' style={{ backgroundColor: `${position.color}` }}>
                  {position.name}
                </span>))
            }
          </div>
        )
      } else {
        return (<Badge>none</Badge>);
      }
    }
  },
  {
    name: 'Action',
    sortable: true,
    selector: (row) => row,
    cell: (row) => {
      return (
        <div class="d-flex gap-1">
          <Button size='sm' color='primary' onClick={() => editGroup(row._id)}><Edit size={12} /></Button>
          <Button size='sm' color='danger' onClick={() => deleteGroup(row._id)}><Trash size={12} /></Button>
        </div>
      );
    }
  }
];

export const positionHeader = (editPosition, deletePosition) => [
  {
    name: 'Position Name',
    selector: (row) => row.name
  },
  {
    name: 'Position Color',
    selector: (row) => {
      return (
        <Input type="color" value={row.color} style={{ width: "100px" }} disabled={true}/>
      )
    }
  },
  {
    name: 'Position Order',
    selector: (row) => row.order
  },
  {
    name: 'Action',
    selector: (row) => row,
    cell: (row) => {
      return (
        <div class="d-flex gap-1">
          <Button size='sm' color='primary' onClick={() => editPosition(row._id)}><Edit size={12} /></Button>
          <Button size='sm' color='danger' onClick={() => deletePosition(row._id)}><Trash size={12} /></Button>
        </div>
      );
    }
  }
];

export const shiftHeader = (editShift, deleteShift) => [
  {
    name: 'Title',
    selector: (row) => row.title
  },
  {
    name: 'StartTime',
    selector: (row) => row.startTime
  },
  {
    name: 'EndTime',
    selector: (row) => row.endTime
  },
  {
    name: 'Note',
    selector: (row) => row.note
  },
  {
    name: 'Action',
    selector: (row) => row,
    cell: (row) => {
      return (
        <div class="d-flex gap-1">
          <Button size='sm' color='primary' onClick={() => editShift(row._id)}><Edit size={12} /></Button>
          <Button size='sm' color='danger' onClick={() => deleteShift(row._id)}><Trash size={12} /></Button>
        </div>
      )
    }
  },
];

export const data1 = [
  {
    id: 1,
    rolename: 'Sr Front End Developer',
    createDate: 'Jan 1, 2022',
    manages: 'admin'
  },
  {
    id: 2,
    rolename: 'Jr Front End Developer',
    createDate: 'Jan 1, 2022',
    manages: 'admin'
  },
  {
    id: 3,
    rolename: 'Sr Backend Developer',
    createDate: 'Jan 1, 2022',
    manages: 'admin'
  },
  {
    id: 4,
    rolename: 'Jr Backend Developer',
    createDate: 'Jan 1, 2022',
    manages: 'admin'
  }
];

export const payrollHeader = [
  {
    name: 'Country Name',
    sortable: true,
    selector: (row) => row.countryName
  },
  {
    name: 'Pay Rate',
    sortable: true,
    selector: (row) => row.payRate
  },
  {
    name: 'OT Rate',
    sortable: true,
    center: true,
    selector: (row) => row.otRate
  },
  {
    name: 'Wage Types',
    sortable: true,
    center: true,
    selector: (row) => row.wageTypes
  },
  {
    name: 'Pay Method',
    sortable: true,
    center: true,
    selector: (row) => row.payMethod
  },

];

export const payrollData = [
  {
    id: 1,
    countryName: 'Usa',
    payRate: '0',
    otRate: '0',
    wageTypes: 'Sr Front End Developer',
    payMethod: 'none'
  },
  {
    id: 2,
    countryName: 'India',
    payRate: '0',
    otRate: '0',
    wageTypes: 'Sr Front End Developer',
    payMethod: 'none'
  },
  {
    id: 3,
    countryName: 'Chaina',
    payRate: '0',
    otRate: '0',
    wageTypes: 'Sr Front End Developer',
    payMethod: 'none'
  },
  {
    id: 4,
    countryName: 'Delhi',
    payRate: '0',
    otRate: '0',
    wageTypes: 'Sr Front End Developer',
    payMethod: 'none'
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
