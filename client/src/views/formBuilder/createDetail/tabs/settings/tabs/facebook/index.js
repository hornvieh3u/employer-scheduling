import React from 'react';
import { Copy } from 'react-feather';
import { Card, CardTitle, CardText, CardBody, Badge, Col, Row, FormGroup, Button, Label, Input, Container } from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar'


function Facebook() {
  return (
    <>
      <div className="overflow-hidden email-application">
        <div className="content-overlay"></div>
        <div className="container-xxl p-0 animate__animated animate__fadeIn">
    <Container>
      <Row>
        <Col md={6}>
          <h2>
            Edit Settings For This Form
          </h2>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Button color="primary">
          Save & UPDATE
          </Button>
        </Col>
      </Row>
      <Row className='my-1'>
          <Col>
            <h3>
              Facebook Conversion Pixel Integration
            </h3>
          </Col>
          <Col md={3} sm={6} lg={3}  className='d-flex justify-content-end'>
            <Input
              id="input"
              placeholder='Not Connected'
             />
          </Col>
      </Row>
      <Row>
        <Col md={4} sm={12} lg={4}>
          <h5>
            Here you will be able to select which Facebook Pixel Conversion Event will be triggered when this page loads
          </h5>
          <FormGroup>
            <Label>
              Sub Category
            </Label>
            <Input 

              id='subCategory'
              name="subCategory"
              type="select"
             >
              <option value="Active Member" selected>Smart List</option>
             </Input>
          </FormGroup>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
    </>
  );
}

export default Facebook;
