import {React, Fragment} from 'react';
import { Card, CardTitle, CardText, CardBody, Row, Button, FormGroup, Col, Label, Input, CardContent, CardHeader,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container  } from 'reactstrap';
import { MoreVertical,Edit } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar'


// table import 
import DataTable from 'react-data-table-component';

function Overview() {

  const projectsArr = [
    {
      type: 'Candidate',
      from: 'Leadership Club',
      subject: 'info',
      date: '1',
    }
  ];

  const columns = [
    {
      name: 'Type',
      selector: (row) => row.from
    },
    {
      name: 'From',
      selector: (row) => row.from,
      sortable: true,

      selector: (row) => row.from
    },
    {
      name: 'Subject',
      selector: (row) => row.subject
    },

    {
      name: 'Activation Date',
      selector: (row) => row.date
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="span" className="w-100">
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

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
          <Col lg={4} md={4} sm={12}>
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
                value="ha"
                type="select"
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
              value="haha"
              />
            </FormGroup>
          </Col>
      </Row>
      <Row>
        <Col md={4} sm={4} lg={4}>
        <Card
          color="primary"
          outline
        >
          <CardHeader>
            EMBED CODE
          </CardHeader>
          <CardBody style={{ minHeight: "4rem" }}>
            <CardText>
            Add your page inside of an iframe to embed on any website
            </CardText>
          </CardBody>
          <Button color="primary">
            VIEW
          </Button>
        </Card>
        </Col>
        <Col md={4} sm={4} lg={4}>
        <Card
          color="primary"
          outline
        >
          <CardHeader>
            DOWNLOAD HTML
          </CardHeader>
          <CardBody style={{ minHeight: "4rem" }}>
            <CardText>
              Download the .html file of your page to host anywhere
            </CardText>
          </CardBody>
          <Button color="primary">
            DOWNLOAD
          </Button>
        </Card>
        </Col>
        <Col md={4} sm={4} lg={4}>
        <Card
          color="primary"
          outline
        >
          <CardHeader>
            EMBED CODE
          </CardHeader>
          <CardBody style={{ minHeight: "4rem" }}>
            <CardText>
              Scan the QR code
            </CardText>
          </CardBody>
          <Button color="primary">
            Go somewhere
          </Button>
        </Card>
        </Col>
      </Row>
      <Fragment>
          <div className="app-user-list p-1">
            <div className="my-1 d-flex justify-content-end">
              <Button color="primary">Add AUTOMATION</Button>
            </div>

            <div className="react-dataTable user-view-account-projects">
              <DataTable
                noHeader
                responsive
                columns={columns}
                data={projectsArr}
                className="react-dataTable"
              />
            </div>
          </div>
        </Fragment>
        </Container>
        </div>
        </div>
    </>
  );
}

export default Overview;
