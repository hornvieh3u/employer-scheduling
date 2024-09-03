import React, { useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Label,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Row,
  Form,
  Input,
  Col
} from 'reactstrap';

function Modaldata() {
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <>
      <div>
        <Accordion open={open} toggle={toggle}>
          <Label>Member Info</Label>
          <AccordionItem>
            <AccordionHeader targetId="1">Member Type</AccordionHeader>
            <AccordionBody accordionId="1">
              <ListGroup flush>
                <Row>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Acitve Trial</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Former Trial</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Active Student</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Leads</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                </Row>
              </ListGroup>
            </AccordionBody>
          </AccordionItem>
          <Label>Custom Info</Label>
          <AccordionItem>
            <AccordionHeader targetId="2">Lead Tracking</AccordionHeader>
            <AccordionBody accordionId="2">
              <ListGroup flush>
                <Row>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Fb</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Instagram</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Google</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Referral</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                </Row>
              </ListGroup>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">After Camp</AccordionHeader>
            <AccordionBody accordionId="3">
              <ListGroup flush>
                <Row>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Google</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Spring Camp</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Special needs</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Winter Camp</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                </Row>
              </ListGroup>
            </AccordionBody>
          </AccordionItem>
          <Label>Membership Info</Label>
          <AccordionItem>
            <AccordionHeader targetId="4">Program</AccordionHeader>
            <AccordionBody accordionId="4">
              <ListGroup flush>
                <Row>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Taekwondo</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Little Tiger</Label>
                      </FormGroup>
                    </ListGroupItem>
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Royal tiger</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                  <Col xl="6">
                    <ListGroupItem>
                      <FormGroup check inline>
                        <Input type="checkbox" />
                        <Label check>Test item</Label>
                      </FormGroup>
                    </ListGroupItem>
                  </Col>
                </Row>
              </ListGroup>
            </AccordionBody>
          </AccordionItem>
          <Label>Creteria Met</Label>
          <AccordionItem>
            <AccordionHeader targetId="5">Creteria</AccordionHeader>
            <AccordionBody accordionId="5">
              <FormGroup>
                <Label for="formlabel">Enter Details</Label>
                <Input id="labelForm" name="formlabel" placeholder="Enter Details" type="text" />
              </FormGroup>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>

      {/* 

      <Form className="p-2">
        <FormGroup>
          <Label for="userRole">
            Role
          </Label>
          <Input
            id="userRole"
            name="role"
            placeholder="Please Enter Role Name"
            type="text"
          />
        </FormGroup>

        <h3>Role Permission</h3>

        <Row>
          <ListGroup flush>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  Dashboard
                </Label>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  Contacts
                </Label>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check >
                  Finance
                </Label>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  Shop
                </Label>
              </FormGroup>
            </ListGroupItem>

            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  My Business
                </Label>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  Marketing
                </Label>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  Documents
                </Label>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  Calender
                </Label>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check>
                  Finance
                </Label>
              </FormGroup>

            </ListGroupItem>
            <ListGroupItem>
              <FormGroup
                check
                inline
              >
                <Input type="checkbox" />
                <Label check >
                  File Manager
                </Label>
              </FormGroup>
            </ListGroupItem>
          </ListGroup>





        </Row>






      </Form > */}
    </>
  );
}

export default Modaldata;
