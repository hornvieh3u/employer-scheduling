import React, { useState } from 'react';
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import { Col, Row } from 'reactstrap';

function TopCard(props) {
  const { totalEmployeeCount, activeEmployeeCount, internshipEmployeeCount, formerEmployeeCount } =
    props;
  return (
    <>
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
    </>
  );
}

export default TopCard;
