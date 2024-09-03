import React, { Fragment } from 'react';
import { CheckCircle, Clock } from 'react-feather';
import { Card, CardHeader, Col, Row } from 'reactstrap';

const GridView = () => {
  return (
    <Fragment>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div style={{ height: '200px' }} className="d-flex justify-content-end align-items-end">
              <CheckCircle className="me-1" />
              <Clock />
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div style={{ height: '200px' }} className="d-flex justify-content-end align-items-end">
              <CheckCircle className="me-1" />
              <Clock />
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div style={{ height: '200px' }} className="d-flex justify-content-end align-items-end">
              <CheckCircle className="me-1" />
              <Clock />
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div style={{ height: '200px' }} className="d-flex justify-content-end align-items-end">
              <CheckCircle className="me-1" />
              <Clock />
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div style={{ height: '200px' }} className="d-flex justify-content-end align-items-end">
              <CheckCircle className="me-1" />
              <Clock />
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div style={{ height: '200px' }} className="d-flex justify-content-end align-items-end">
              <CheckCircle className="me-1" />
              <Clock />
            </div>
          </Card>
        </Col>
        <Col sm={3} md={3} lg={3}>
          <Card className="p-1">
            <CardHeader>Title</CardHeader>
            <div style={{ height: '200px' }} className="d-flex justify-content-end align-items-end">
              <CheckCircle className="me-1" />
              <Clock />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default GridView;
