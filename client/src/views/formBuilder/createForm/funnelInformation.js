/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Card, Button, Alert } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { TbChartBar, TbFilter, TbForms, TbView360 } from 'react-icons/tb';
import { toast, Slide } from 'react-toastify';

import '@styles/react/libs/formBuilder/funnel.scss';
import { isEmpty } from '@firebase/util';

const FunnelInformation = (props) => {
  const {
    stepper,
    name,
    setName,
    memberType,
    setMemberType,
    smartList,
    setSmartList,
    subCategory,
    setSubCategory,
    automateEntry,
    setAutomateEntry,
    formType,
    setFormType
  } = props;

  useEffect(() => {
    
  },)

  const nextStep = () => {
    if (name != '' && name != undefined) {
      stepper.next();
    } else {
      toast.error('You have to enter form name!', {
        icon: true,
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2500,
        position: 'top-center',
        theme: 'dark'
      });
    }
  };

    return (
      <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="container-xxl p-0 animate__animated animate__fadeIn d-block">
        <div id="funnelinformation" className="m-4 from-stepper">
            <Row>
              <Col lg={3} md={3} sm={12}>
                  <FormGroup>
                      <Label for="formName">
                          Form Name
                      </Label>
                      <Input
                          id="formName"
                          name={name}
                          onChange={e=> setName(e.target.value)}
                          placeholder="Form Name"
                          type="text"
                          required
                        />
                  </FormGroup>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <FormGroup>
                  <Label for="memberType">
                    Member Type
                  </Label>
                  <Input
                    id="memberType"
                    name="memberType"
                    placeholder=""
                    value={memberType}
                    type="select"
                    onChange={e=> setMemberType(e.target.value)}
                    required
                  >
                  <option value="Active Member" selected>Active Member</option>
                  <option value="Active Trial">Active Trial</option>
                  <option value="Leads">Leads</option>
                  <option value="Former Member">Former Member</option>
                  <option value="Former Trial">Former Trial</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg={3} md={3} sm={12}>
              <FormGroup switch className='mt-2'>
                  <Label for="automateEntry">
                    Automate Entry
                  </Label>
                <Input
                  id='automateEntry'
                  name='automateEntry'
                  type='switch'
                  className='px-2'
                  value={automateEntry}
                  onClick={() => setAutomateEntry(!automateEntry)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
                <Col lg={4} md={4} sm={12}>
                    <FormGroup>
                        <Label for="smartList">
                            Select Smart List
                        </Label>
                        <Input
                            id="smartList"
                            name="smartLists"
                            placeholder="with"
                            type="select"
                            value={smartList}
                            onChange={e=> setSmartList(e.target.value)}
                          />
                    </FormGroup>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <FormGroup>
                    <Label for="subCategory">
                      Sub Category
                    </Label>
                    <Input
                      id="subCategory"
                      name="subCategory"
                      placeholder="Sub Category"
                      type="select"
                      value={subCategory}
                      onChange={e=> setSubCategory(e.target.value)}
                    />
                  </FormGroup>
                </Col>
            </Row>
            <Row>
              <Col item sm={12} md={2} lg={2}>
                <Card className={`funnelType ${formType === "optin" ? "active" : ""}`} onClick={() => setFormType("optin")}>
                  <TbFilter size={50} stroke="purple"/>
                    <span className='d-flex justify-content-center title'>optin</span>
                </Card>
              </Col>
              <Col item sm={12} md={2} lg={2}>
                <Card className={`funnelType ${formType === "sales" ? "active" : ""}`} onClick={() => setFormType("sales")}>
                    <TbChartBar size={50} stroke="purple" />
                    <span className='d-flex justify-content-center title'>Sales</span>
                </Card>
              </Col>
              <Col item sm={12} md={2} lg={2}>
                <Card className={`funnelType ${formType === "webinar" ? "active" : ""}`} onClick={() => setFormType("webinar")}>
                    <TbView360  size={50} stroke="purple" />
                    <span className='d-flex justify-content-center title'>Webinar</span>
                </Card>
              </Col>
              <Col item sm={12} md={2} lg={2}>
                <Card className={`funnelType ${formType === "forms" ? "active" : ""}`} onClick={() => setFormType("forms")}>
                    <TbForms size={50} stroke="purple" />
                    <span className='d-flex justify-content-center title'>Forms</span>
                </Card>
              </Col>
            </Row>
            <Row >
              <Col className='d-flex flex-row-reverse'>
                <Button 
                color="primary" 
                type="submit"
                onClick={nextStep}
                >
                  NEXT
                </Button>
              </Col>
            </Row>
        </div>
      </div>
    </div>
    )
}


export default FunnelInformation;
