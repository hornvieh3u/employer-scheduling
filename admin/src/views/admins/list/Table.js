// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ** Add New Modal Component
import AddNewModal from "./AddNewAdmin";

// import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown, Plus, Edit, Trash } from "react-feather";
import toast from "react-hot-toast";
import { Popconfirm } from "antd";

// ** Reactstrap Imports
import { Card, Button, CardTitle, CardHeader } from "reactstrap";

// ** Custom Hooks
import {
  useGetAdmins,
  useCreateAdmin,
  useDeleteAdmin,
} from "../../../requests/admins";

// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef((props, ref) => (
//   <div className="form-check">
//     <Input type="checkbox" ref={ref} {...props} />
//   </div>
// ));

const EmptyAdmin = {
  fullName: "",
  email: "",
  phone: "",
  adminType: "",
  password: "",
};

const AdminTable = () => {
  // ** Table Columns
  const columns = [
    {
      name: "Full Name",
      sortable: true,
      minWidth: "250px",
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link
              to={`/admin-list/view/${row.id}`}
              className="user_name text-truncate text-body"
            >
              <span>{row.fullName}</span>
            </Link>
          </div>
        </div>
      ),
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
      cell: (row) => (
        <div className="d-flex">
          <Popconfirm
            title="Are you sure to delete?"
            placement="topRight"
            onConfirm={() => deleteAdmin(row._id)}
            okText="Yes"
            cancelText="No"
          >
            <Trash size={15} className="me-2 cursor-pointer text-danger" />
          </Popconfirm>

          {/* <Edit size={15} className="cursor-pointer" /> */}
        </div>
      ),
    },
  ];

  const { data: admins, isLoading: fetchingAdmins } = useGetAdmins();
  const {
    mutate: createAdmin,
    status,
    isLoading: adminCreating,
  } = useCreateAdmin();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  // ** States
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [admin, setAdmin] = useState(EmptyAdmin);
  const { fullName, email, phone, adminType, password } = admin;

  const adminData = {
    fullName,
    email,
    phone,
    adminType: adminType.value,
    password,
  };

  useEffect(() => {
    if (status === "success") {
      setAdmin(EmptyAdmin);
    }
  }, [status]);

  // ** Function to handle Modal toggle
  const handleModal = () => {
    setModal(!modal);
  };

  // ** Function to create Admin
  const handleCreateAdmin = () => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 character");
    }
    createAdmin(adminData);
    setModal(!modal);
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(admins.length / 7) || 1}
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
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center align-items-start border-bottom">
          <CardTitle tag="h4">NLM Officials & Staffs</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Create Staff</span>
            </Button>
          </div>
        </CardHeader>

        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            progressPending={fetchingAdmins}
            data={admins}

            // selectableRows
            // selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>
      <AddNewModal
        open={modal}
        handleModal={handleModal}
        admin={admin}
        setAdmin={setAdmin}
        handleCreateAdmin={handleCreateAdmin}
      />
    </Fragment>
  );
};

export default AdminTable;
