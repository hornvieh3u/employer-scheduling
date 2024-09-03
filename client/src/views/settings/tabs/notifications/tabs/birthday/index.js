import React from 'react';
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
function Birthday() {
  return (
    <Card className="m-2">
      <CardBody className="rounded-none">
        <CardTitle tag="h5">Birthday Notification</CardTitle>
        <CardText>
          <Form className="">
            <FormGroup switch className="my-1">
              <div class="d-flex justify-content-between">
                <div>
                  {' '}
                  <Label check>This Week Notification</Label>
                  <p className="text-primary">Block Birthday This Week Notification</p>
                </div>
                <div>
                  <Input type="switch" />{' '}
                </div>
              </div>
            </FormGroup>

            <FormGroup switch className="my-1">
              <div class="d-flex justify-content-between">
                <div>
                  {' '}
                  <Label check>This Month Notification</Label>
                  <p className="text-primary">Block Birthday This Month Notification</p>
                </div>
                <div>
                  <Input type="switch" />
                </div>
              </div>
            </FormGroup>
            <FormGroup switch className="my-1">
              <div class="d-flex justify-content-between">
                <div>
                  {' '}
                  <Label check>Last Month Notification</Label>
                  <p className="text-primary">Block Birthday Last Month Notification </p>
                </div>
                <div>
                  <Input type="switch" />
                </div>
              </div>
            </FormGroup>
            <FormGroup switch className="my-1">
              <div class="d-flex justify-content-between">
                <div>
                  {' '}
                  <Label check>In 60 Days Notification</Label>
                  <p className="text-primary">Block Birthday In 60 Days Notification</p>
                </div>
                <div>
                  <Input type="switch" />
                </div>
              </div>
            </FormGroup>
            <FormGroup switch className="my-1">
              <div class="d-flex justify-content-between">
                <div>
                  {' '}
                  <Label check>In 90 Days Notification</Label>
                  <p className="text-primary">Block Birthday In 90 Days Notification</p>
                </div>
                <div>
                  <Input type="switch" />
                </div>
              </div>
            </FormGroup>
          </Form>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default Birthday;
