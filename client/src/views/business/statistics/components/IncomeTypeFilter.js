import React, { useState } from 'react';
import { Card, Col, FormGroup, Input, Label, Row } from 'reactstrap';

function Statistics() {
  const [state, setState] = useState(true);

  return (
    <Card className="p-1 mb-0" style={{ height: '65px' }}>
      <Row className="d-flex justify-content-between">
        <Col md={6}>
          <Row>
            <Col md={4}>
              <h5 style={{ marginTop: '10px' }}>Program Statistics</h5>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Input id="exampleSelect" name="select" type="select">
                  <option>All</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={4}>
              <Input id="exampleSelect" name="select" type="select">
                <option>All</option>
                <option>Join</option>
                <option>Not Join</option>
              </Input>
            </Col>
          </Row>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <div>
            <FormGroup switch>
              <Input
                type="switch"
                checked={state}
                onClick={() => {
                  setState(!state);
                }}
              />
              <Label check>Enable day view</Label>
            </FormGroup>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default Statistics;
