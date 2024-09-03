import {React, Fragment} from 'react';
import { Card, CardTitle, CardText, CardBody, Row, Button, FormGroup, Col, Label, Input, CardContent, CardHeader,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupText, Container  } from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar'
import { FiImage } from 'react-icons/fi';


function Seo() {
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
      <Row>
          <Col lg={6} md={6} sm={12}>
              <FormGroup>
                  <Label for="seoMetaData">
                      SEO META DATA
                  </Label>
                  <Input
                      id="seoMetaData"
                      name={name}
                      onChange={e=> setName(e.target.value)}
                      placeholder="Form Name"
                      type="text"
                      required
                    />
              </FormGroup>
          </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} lg={12}>
          <FormGroup>
            <Label>
              DESCRIPTION
            </Label>
            <Input
              id="description"
              name="description"
              placeholder='Page Description'
              type="textarea"
             />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={12} lg={4}>
          <FormGroup>
            <Label for="keywords">
              KEYWORDS
            </Label>
            <Input
              id="keywords"
              name="keywords"
              placeholder='Click funnel landing page'
              type="text"
             />
          </FormGroup>
        </Col>
        <Col md={4} sm={12} lg={4}>
          <FormGroup>
            <Label for="author">
              AUTHOR
            </Label>
            <Input
              id="author"
              name="author"
              placeholder='Click funnel landing page'
              type="text"
             />
          </FormGroup>
        </Col>
        <Col md={4} sm={12} lg={4}>
          <FormGroup>
            <Label for="socialImage">
              SOCIAL IMAGE
            </Label>
            <InputGroup>
              <Input
                id="socialImage"
                name="socialImage"
                placeholder='Click funnel landing page'
                type="text"
              />
              <InputGroupText>
                <FiImage />
              </InputGroupText>
            </InputGroup>     
          </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={12} sm={12} lg={12}>
          <FormGroup>
            <Label for="headCode">
              Head Tracking Code
            </Label>
            <Input
              id="headCode"
              name="headCode"
              type="textarea"
             />
          </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col md={12} sm={12} lg={12}>
          <FormGroup>
            <Label for="bodyCode">
              Body Tracking Code
            </Label>
            <Input
              id="bodyCode"
              name="bodyCode"
              type="textarea"
             />
          </FormGroup>
        </Col>
      </Row>
    </Container>
    </div>
    </div>
  </>
  );
}

export default Seo;
