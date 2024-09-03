import React from 'react'
import { Copy } from 'react-feather'
import {Card,CardTitle,CardText,CardBody,Badge,Col} from 'reactstrap'

import { Form, FormGroup, Label, Input } from 'reactstrap'


function System() {
    return (
        <Card className="m-1">

        <CardBody className="rounded-none">
          <CardTitle tag="h5">
            System Notifications
          </CardTitle>
          <CardText>
          <Form className="">
              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>24 hour Email Report</Label></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>

              <FormGroup switch className="my-1">
                <div class="d-flex justify-content-between"><div> <Label check>24 hour Text Report</Label></div><div><Input
                  type="switch"
                     
                   
                /></div></div>


              </FormGroup>
   
            </Form>
          </CardText>
    
        </CardBody>
      </Card>
    )
}

export default System
