// ** React Imports
import React from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import { Edit, Trash } from "react-feather";
import {
  Button,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";

// ** Table Common Column
export const columns = [
  {
    name: "Full Name",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.fullName,
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "250px",
    selector: (row) => row.email,
  },
  {
    name: "Phone",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.phone,
  },
  {
    name: "Role",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.adminType,
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row) => {
      return (
        <div className="d-flex">
          <Trash size={15} className="me-2 cursor-pointer" id="popFocus" />
          <UncontrolledPopover
            trigger="focus"
            placement="top"
            target="popFocus"
          >
            <PopoverHeader>Delete Admin</PopoverHeader>
            <PopoverBody>
              <div>Are You sure to delete?</div>
              <div>
                <div>{row._id}</div>
                <div>{row.fullName}</div>
                <div>{row.email}</div>
                <div>{row.phone}</div>
              </div>
              <div>
                <Button>Delete</Button>
              </div>
            </PopoverBody>
          </UncontrolledPopover>

          <Edit size={15} className="cursor-pointer" />
        </div>
      );
    },
  },
];
