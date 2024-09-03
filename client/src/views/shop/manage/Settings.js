// ** React Imports
import { Fragment } from 'react';

// ** Custom Components
import CardAction from '@components/card-actions';

// ** Reactstrap Imports
import {
  CardBody,
  CardText,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
  FormFeedback,
  Button,
  Label
} from 'reactstrap';

const Settings = () => {
  return (
    <Fragment>
      <Row>
        <Col md="6" sm="12">
          <CardAction title="Domain Name" actions="collapse">
            <CardBody className="pt-0">
              <CardText>
                Create a <code>domain name</code> that best describes your business
              </CardText>
              <InputGroup className="mb-2">
                <InputGroupText>www.mymanager.com/shop/</InputGroupText>
                <Input type="text" id="validState" name="validState" valid />
                <FormFeedback valid>Sweet! That name is available.</FormFeedback>
              </InputGroup>
              <InputGroup className="mb-2">
                <InputGroupText>www.mymanager.com/shop/</InputGroupText>
                <Input type="text" id="invalidState" name="invalidState" invalid />
                <FormFeedback>Oh no! That name is already taken.</FormFeedback>
              </InputGroup>
              <Button color="primary">Confirm</Button>
            </CardBody>
          </CardAction>
        </Col>
        <Col md="6" sm="12">
          <CardAction title="Contact Information" actions="collapse">
            <CardBody className="pt-0">
              <Row>
                <Col className="mb-1" md="12">
                  <Label className="form-label" for="basicInput">
                    Business Email
                  </Label>
                  <Input type="email" id="basicInput" placeholder="Enter Email" />
                </Col>
                <Col className="mb-1" md="12">
                  <Label className="form-label" for="basicInput">
                    Business Phone
                  </Label>
                  <Input type="email" id="basicInput" placeholder="Enter Phone Number" />
                </Col>
                <Col className="mb-1" md="12">
                  <Label className="form-label" for="basicInput">
                    Office Address
                  </Label>
                  <Input type="email" id="basicInput" placeholder="Enter Email" />
                </Col>
              </Row>
              <Button color="primary">Confirm</Button>
            </CardBody>
          </CardAction>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Settings;
