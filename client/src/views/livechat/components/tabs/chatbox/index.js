import React from 'react';
import { Table } from 'reactstrap';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  DropdownItem,
  Form
} from 'reactstrap';

function myForm() {
  return (
    <div className="overflow-hidden email-application">
      <Row className="mt-1">
        <Col md="9" sm="12" className="mb-1"></Col>
        <Col md="3" sm="12" className="mb-1 mr-1">
          <Button color="btn btn-outline-primary">Cancel</Button>{' '}
          <Button color="btn btn-primary">Save</Button>
        </Col>
      </Row>

      <Row className="mt-1">
        <Col md="3" sm="12" className="mb-1"></Col>

        <Col md="6" sm="12" className="mb-1">
          <Input type="select" name="genter" id="divisionGender">
            <option> Install LiveChat code manually</option>
            <option></option>
          </Input>
        </Col>
        <Col md="3" sm="12" className="mb-1"></Col>
      </Row>

      <Row className="mt-1">
        <Col md="3" sm="12" className="mb-1"></Col>

        <Col md="6" sm="12" className="mb-1">
          <Input type="select" name="genter" id="divisionGender">
            <option> Appearance</option>
            <option></option>
          </Input>
        </Col>
        <Col md="3" sm="12" className="mb-1"></Col>
      </Row>

      <Row className="mt-1">
        <Col md="3" sm="12" className="mb-1"></Col>

        <Col md="6" sm="12" className="mb-1">
          <Input type="select" name="genter" id="divisionGender">
            <option> Position</option>
            <option></option>
          </Input>
        </Col>
        <Col md="3" sm="12" className="mb-1"></Col>
      </Row>
    </div>
  );
}

export default myForm;
