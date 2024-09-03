import React from 'react';
import { Label, ListGroup, ListGroupItem, FormGroup, Row, Form, Input, Col } from 'reactstrap';

function Modaldata() {
  return (
    <Form className="p-2">
      <FormGroup>
        <Label for="userRole">Role</Label>
        <Input id="userRole" name="role" placeholder="Please Enter Role Name" type="text" />
      </FormGroup>

      <h3>Role Permission</h3>

      <Row>
        <ListGroup flush>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Dashboard</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Contacts</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Finance</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Shop</Label>
            </FormGroup>
          </ListGroupItem>

          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>My Business</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Marketing</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Documents</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Calender</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>Finance</Label>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup check inline>
              <Input type="checkbox" />
              <Label check>File Manager</Label>
            </FormGroup>
          </ListGroupItem>
        </ListGroup>
      </Row>
    </Form>
  );
}

export default Modaldata;
