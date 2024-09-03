import React from 'react';
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'reactstrap';
import { Input } from 'reactstrap';
import EmployeeTable from './EmployeeTable'

const AddEmpolye = () => {
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState([
    {
      employename: '',
      hourlywegas: '',
      rolestheyperform: '',
      phone: '',
      email: ''
    }
  ]);
  const handleAddRow = () => {
    let copy = [...data];
    const item = {
      employename: '',
      hourlywegas: '',
      rolestheyperform: '',
      phone: '',
      email: ''
    };
    copy.push(item);
    setdata(copy);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={handleClickOpen}>
        Add Employee
      </button>
      <Modal isOpen={open} size="lg">
        <ModalHeader toggle={handleClose}>Employee List</ModalHeader>
        <ModalBody>
          <Row>
            <EmployeeTable />
            {/* {data?.map(() => {
              return (
                <>
                  <Col md="3" lg="3" sm="12">
                    <FormGroup>
                      <Label>Employee name</Label>
                      <Input />
                    </FormGroup>
                  </Col>
                  <Col md="3" lg="3" sm="12">
                    <FormGroup>
                      <Label>Email</Label>
                      <Input />
                    </FormGroup>
                  </Col>
                  <Col md="3" lg="2" sm="12">
                    <FormGroup>
                      <Label>Phone</Label>
                      <Input />
                    </FormGroup>
                  </Col>
                  <Col md="3" lg="2" sm="12">
                    <FormGroup>
                      <Label>Hourly Wage</Label>
                      <Input />
                    </FormGroup>
                  </Col>
                  <Col md="3" lg="2" sm="12">
                    <FormGroup>
                      <Label>Roles they perform </Label>
                      <Input />
                    </FormGroup>
                  </Col>
                </>
              );
            })} */}
          </Row>
        </ModalBody>
        <ModalFooter>
          <button className="btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary">Add Employee</button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddEmpolye;
