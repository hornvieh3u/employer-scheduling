import React from 'react';
import { Trash } from 'react-feather';
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Label, Row } from 'reactstrap';

function NotesView() {
  return (
    <>
      <CardTitle>Notes</CardTitle>
      <Row>
        <Col md={3}>
          <Card className="border-top-primary">
            <CardHeader className="d-flex justify-content-between">
              <h6>Jan 10, 2023</h6>
              <Trash size="15" />
            </CardHeader>
            <CardBody>
              <CardText>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-top-primary">
            <CardHeader className="d-flex justify-content-between">
              <h6>Jan 10, 2023</h6>
              <Trash size="15" />
            </CardHeader>
            <CardBody>
              <CardText>
                but also the leap into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-top-primary">
            <CardHeader className="d-flex justify-content-between">
              <h6>Jan 10, 2023</h6>
              <Trash size="15" />
            </CardHeader>
            <CardBody>
              <CardText>
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout.{' '}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-top-primary">
            <CardHeader className="d-flex justify-content-between">
              <h6>Jan 10, 2023</h6>
              <Trash size="15" />
            </CardHeader>
            <CardBody>
              <CardText>
                Various versions have evolved over the years, reader sometimes by accident,
                sometimes page when looking at its layout.{' '}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Card>
        <Row>
          <Col md={12}>
            <ul className="list-group todos mx-auto text-light">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>eat pizza</span>
                <Trash sm={15} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>eat pizza</span>
                <Trash sm={15} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>eat pizza</span>
                <Trash sm={15} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>eat pizza</span>
                <Trash sm={15} />
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default NotesView;
