import React from 'react'
import {Card,CardTitle,CardText,CardBody} from 'reactstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap'
function Renewal() {
  return (
    <Card className="m-2">
    <CardBody className="rounded-none">
      <CardTitle tag="h5">
        Renewal Notification
      </CardTitle>
      <CardText>
      <Form className="">
              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>Expired Notification</Label><p className="text-primary">Block Renewal Expired Notification</p></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>

              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>In 30  Days Notification</Label><p className="text-primary">Block Renewal In 30 Days Notification</p></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>
              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>In 60 Days Notification</Label><p className="text-primary">Block Renewal In 60 Days Days Notification</p></div><div><Input
                  type="switch"
              
                  
                /></div></div>


              </FormGroup>
              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>Block Renewal In 90 Days Notification</Label><p className="text-primary">Block Renewal In 90 Days Notification</p></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>
            </Form>
      </CardText>
    </CardBody>
  </Card>
  )
}

export default Renewal