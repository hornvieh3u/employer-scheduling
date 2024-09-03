// ** React Imports
import React from "react";

// ** Third Party Components
import { MoreVertical, FileText, Trash, Slash } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Table Columns
export const columns = [
  {
    name: "Full Name",
    sortable: true,
    minWidth: "200px",
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.email,
  },
  {
    name: "Phone",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.phone,
  },
  {
    name: "Acc Type",
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.accType,
  },
  {
    name: "User Type",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.userType,
  },
  {
    name: "Business Type",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.businessType,
  },
  {
    name: "Position",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.position,
  },
  {
    name: "Current Package",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.package,
  },
  {
    name: "Actions",
    allowOverflow: true,
    minWidth: "200px",
    cell: () => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pe-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <FileText size={15} />
                <span className="align-middle ms-50">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Trash size={15} />
                <span className="align-middle ms-50">Delete</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => e.preventDefault()}
              >
                <Slash size={15} />
                <span className="align-middle ms-50">Ban User</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      );
    },
  },
];
