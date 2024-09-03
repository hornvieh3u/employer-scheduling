import React from 'react'
import {Card,CardTitle,CardText,CardBody} from 'reactstrap'
import { Form, FormGroup, Label, Input } from 'reactstrap'
function Retention() {
  return (
    <Card className="m-2">
    <CardBody className="rounded-none">
      <CardTitle tag="h5">
        Retentions
      </CardTitle>
      <CardText>
      <Form className="">
              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>Retention type 1</Label><p className="text-primary">Retention type 1</p></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>

              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>Retention type 2</Label><p className="text-primary">Retention type 2</p></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>
              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>Retention type 3</Label><p className="text-primary">Retention type 3</p></div><div><Input
                  type="switch"
              
                  
                /></div></div>


              </FormGroup>
              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>Retention type 4</Label><p className="text-primary">Retention type 4</p></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>
            </Form>
      </CardText>
    </CardBody>
  </Card>
  )
}

export default Retention