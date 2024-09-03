// ** Third Party Components
import classnames from 'classnames';
import { TrendingUp, Box, DollarSign, FileText, User, Lock } from 'react-feather';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
  InputGroup,
  Row,
  Col,
  InputGroupText,
  Badge,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { useState } from 'react';

const statusColors = {
  active: 'light-success',
  deactive: 'light-danger'
};

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'pending' }
];

const Others = () => {
  // ** State
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <Card className="card-statistics pb-1">
      <CardHeader>
        <CardTitle tag="h4">Employee Access</CardTitle>
        <CardText className="card-text font-small-2 me-25">
          {statusOptions === 'active' ? (
            <Badge color={statusColors.active} className="text-capitalize me-1">
              Active
            </Badge>
          ) : (
            <Badge className="text-capitalize" color={statusColors.deactive}>
              De-Active
            </Badge>
          )}
        </CardText>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="12">
            <Label className="form-label" for="username">
              Username
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
              <Input type="text" name="username" id="username" placeholder="User Name" />
            </InputGroup>
          </Col>
          <Col sm="12">
            <Label className="form-label" for="username">
              Password
            </Label>
            <InputGroup className="input-group-merge mb-2">
              <InputGroupText>
                <Lock size={15} />
              </InputGroupText>
              <Input type="password" name="password" id="password" placeholder="Password" />
            </InputGroup>
          </Col>
          <Col sm="12">
            <div className="d-flex">
              <Button className="me-1" color="primary" type="button">
                Send
              </Button>
              <Button outline color="secondary" type="reset">
                Re-Send
              </Button>
            </div>
            <p className="mt-1 text-primary" onClick={() => setShow(true)} active>
              Change your password
            </p>
          </Col>
        </Row>
      </CardBody>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-md">
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}>
          Edit Employee Access
        </ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <Row>
            <Col sm="12">
              <Label className="form-label" for="username">
                Username
              </Label>
              <InputGroup className="input-group-merge mb-2">
                <InputGroupText>
                  <User size={15} />
                </InputGroupText>
                <Input type="text" name="username" id="username" placeholder="User Name" />
              </InputGroup>
            </Col>
            <Col sm="12">
              <Label className="form-label" for="username">
                Password
              </Label>
              <InputGroup className="input-group-merge mb-2">
                <InputGroupText>
                  <Lock size={15} />
                </InputGroupText>
                <Input type="password" name="password" id="password" placeholder="Password" />
              </InputGroup>
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button className="me-1" color="primary" size="sm" type="button">
                  Save
                </Button>
                <Button outline color="secondary" size="sm" type="reset">
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default Others;
