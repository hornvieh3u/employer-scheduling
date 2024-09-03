// ** React Imports
import { forwardRef } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  User,
  UserPlus,
  UserCheck,
  UserX,
  FileText,
  Trash,
  Slash,
  CheckCircle,
} from "react-feather";

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardTitle, Input } from "reactstrap";
import { Popconfirm, Space } from "antd";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Custom Hooks
import {
  useGetUsers,
  useDeleteUser,
  useBanUser,
} from "../../../requests/users";

// ** Styles
import "@styles/react/apps/app-users.scss";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const UsersList = () => {
  // Hooks
  const { data: users, isLoading: fetchingUsers } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: banUser } = useBanUser();

  // ** Table Columns
  const columns = [
    {
      name: "Full Name",
      sortable: true,
      minWidth: "200px",
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link
              to={`/user-list/view/${row.id}`}
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
      minWidth: "200px",
      selector: (row) => row.email,
    },

    {
      name: "Acc Type",
      sortable: true,
      minWidth: "150px",
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
    // {
    //   name: "Position",
    //   sortable: true,
    //   minWidth: "150px",
    //   selector: (row) => row.position,
    // },
    // {
    //   name: "Current Package",
    //   sortable: true,
    //   minWidth: "180px",
    //   selector: (row) => row.package,
    // },
    {
      name: "Actions",
      allowOverflow: true,
      minWidth: "200px",
      cell: (row) => {
        return (
          <div className="d-flex">
            <Space>
              <FileText size={15} className="cursor-pointer" />
              <Popconfirm
                title="Are you sure to delete?"
                placement="topRight"
                onConfirm={() => deleteUser(row.id)}
                okText="Yes"
                cancelText="No"
              >
                <Trash size={15} className="text-danger cursor-pointer" />
              </Popconfirm>
              <Popconfirm
                title={
                  row.isActive
                    ? "Are you sure to BAN this user?"
                    : "Are you sure to ACTIVATE this user?"
                }
                placement="topRight"
                onConfirm={() => banUser(row.id)}
                okText="Yes"
                cancelText="No"
              >
                {row.isActive ? (
                  <Slash size={15} className="cursor-pointer text-warning" />
                ) : (
                  <CheckCircle
                    size={15}
                    className="cursor-pointer text-success"
                  />
                )}
              </Popconfirm>
            </Space>
          </div>
        );
      },
    },
  ];

  const userData = users?.map((user) => {
    return {
      id: user?._id,
      fullName: `${user?.firstName} ${user?.lastName}`,
      email: user?.userId?.email,
      phone: user?.userId?.phone,
      userType: user?.userId?.userType,
      gender: user?.gender,
      dob: user?.dob,
      accType: user?.accType,
      businessType: user?.businessType,
      package: user?.packageId,
      address: user?.address,
      position: user?.position,
      isActive: user?.isActive,
    };
  });

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{userData?.length}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">0</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">0</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">0</h3>}
          />
        </Col>
      </Row>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle tag="h4">User List</CardTitle>
        </CardHeader>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            data={userData}
            columns={columns}
            progressPending={fetchingUsers}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            selectableRows
            selectableRowsComponent={BootstrapCheckbox}
          />
        </div>
      </Card>
    </div>
  );
};

export default UsersList;
