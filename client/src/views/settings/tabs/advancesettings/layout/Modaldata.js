import React, { useState } from 'react';
import Select, { components } from 'react-select';

// ** Utils
import { selectThemeColors } from '@utils';

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

// ** contactTypeOption Select Options
const contactTypeOption = [
  { value: 'Clients', label: 'Clients' },
  { value: 'Employee', label: 'Employee' },
  { value: 'Leads', label: 'Leads' },
  { value: 'Relationships', label: 'Relationships' },
  { value: 'Vendor', label: 'Vendor' }
];

const customInfoOption = [
  { value: 'Fb', label: 'Fb' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Google', label: 'Google' },
  { value: 'Referral', label: 'Referral' }
];

const afterCampOption = [
  { value: 'Google', label: 'Google' },
  { value: 'Spring Camp', label: 'Spring Camp' },
  { value: 'Special needs', label: 'Special needs' },
  { value: 'Winter Camp', label: 'Winter Camp' }
];

const membershipInfoOption = [
  { value: 'Taekwondo', label: 'Taekwondo' },
  { value: 'Little Tiger', label: 'Little Tiger' },
  { value: 'Royal tiger', label: 'Royal tiger' },
  { value: 'Test item', label: 'Test item' }
];

function Modaldata(props) {
  const { title, creteria, contactType, customInfo, afterCamp, membershipInfo, changeTab } = props;

  const [modalInfo, setModalInfo] = useState({
    contactType: contactType,
    customInfo: customInfo,
    afterCamp: afterCamp,
    membershipInfo: membershipInfo,
    creteria: creteria,
    title: title
  });

  React.useEffect(() => {
    changeTab(modalInfo);
  }, [modalInfo]);

  return (
    <>
      <div>
        <h5>Title</h5>
        <FormGroup>
          <Label for="formlabel">Enter Title</Label>
          <Input
            id="labelForm"
            name="formlabel"
            placeholder="Enter Details"
            type="text"
            value={modalInfo.title}
            onChange={(data) => {
              setModalInfo((prevModalInfo) => ({ ...prevModalInfo, title: data.target.value }));
            }}
          />
        </FormGroup>
        <Label>Member Info</Label>
        <h5>Contact Type</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={contactTypeOption}
              theme={selectThemeColors}
              value={modalInfo.contactType}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  contactType: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>
        <Label>Custom Info</Label>
        <h5>Lead Tracking</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={customInfoOption}
              theme={selectThemeColors}
              value={modalInfo.customInfo}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  customInfo: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>
        <h5>After Camp</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={afterCampOption}
              theme={selectThemeColors}
              value={modalInfo.afterCamp}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  afterCamp: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>
        <Label>Membership Info</Label>
        <h5>Program</h5>
        <Row>
          <Col sm="12" className="mb-1">
            <Select
              isMulti
              id="task-tags"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={membershipInfoOption}
              theme={selectThemeColors}
              value={modalInfo.membershipInfo}
              onChange={(data) => {
                setModalInfo((prevModalInfo) => ({
                  ...prevModalInfo,
                  membershipInfo: data !== null ? [...data] : []
                }));
              }}
            />
          </Col>
        </Row>
        <Label>Creteria Met</Label>
        <h5>Creteria</h5>
        <FormGroup>
          <Label for="formlabel">Enter Details</Label>
          <Input
            id="labelForm"
            name="formlabel"
            placeholder="Enter Details"
            type="text"
            value={modalInfo.creteria}
            onChange={(data) => {
              setModalInfo((prevModalInfo) => ({ ...prevModalInfo, creteria: data.target.value }));
            }}
          />
        </FormGroup>
      </div>

      {/* <Accordion open={open} toggle={toggle}>
          <Label>Member Info</Label>
          <AccordionItem>
            <AccordionHeader targetId="1">Member Type</AccordionHeader>
            <AccordionBody accordionId="1">
              <ListGroup flush>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Select
                        isMulti
                        id="task-tags"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={contactTypeOption}
                        theme={selectThemeColors}
                        value={contactType}
                        onChange={(data) => {
                          setContactType(data !== null ? [...data] : [])
                        }}
                    />
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
                  <Col sm="12" className="mb-1">
                    <Select
                        isMulti
                        id="task-tags"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={customInfoOption}
                        theme={selectThemeColors}
                        value={customInfo}
                        onChange={(data) => {
                          setCustomInfo(data !== null ? [...data] : [])
                        }}
                    />
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
                  <Col sm="12" className="mb-1">
                    <Select
                        isMulti
                        id="task-tags"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={afterCampOption}
                        theme={selectThemeColors}
                        value={afterCamp}
                        onChange={(data) => {
                          setAfterCamp(data !== null ? [...data] : [])
                        }}
                    />
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
                  <Col sm="12" className="mb-1">
                    <Select
                        isMulti
                        id="task-tags"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={membershipInfoOption}
                        theme={selectThemeColors}
                        value={membershipInfo}
                        onChange={(data) => {
                          setMembershipInfo(data !== null ? [...data] : [])
                        }}
                    />
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
      </Accordion> */}
    </>
  );
}

export default Modaldata;
