import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
import Table from './employeeTable';

// ** Reactstrap Imports
import { Row, Col, InputGroupText, Input } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// redux
import { useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-users.scss';

const Client = () => {
  const { totalEmployeeCount, activeEmployeeCount, internshipEmployeeCount, formerEmployeeCount } =
    useSelector((state) => state.employeeContact);
  return (
    <Fragment>
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Employees"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{totalEmployeeCount?.data}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Active Employees"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{activeEmployeeCount?.data}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Active Internships"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{internshipEmployeeCount?.data}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Former Employees"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{formerEmployeeCount?.data}</h3>}
            />
          </Col>
        </Row>
        <Table />
      </div>
    </Fragment>
  );
};

export default Client;
