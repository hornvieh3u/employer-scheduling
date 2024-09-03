import React from 'react'
import { Card, CardTitle, CardText, CardBody,Col,FormGroup,Label,Input,Button } from 'reactstrap'
function Api() {
    return (
      <Card className="m-2">
      <CardBody className="rounded-none">
        <CardTitle tag="h5">
         Stripe Payment Gateway
        </CardTitle>
        <CardText>
          <Col md={12}>
            <FormGroup>
              <Label for="secretKey">
                SECRET KEY
              </Label>
              <Input
                id="secret"
                name="secretKey"
                placeholder="pk_test_51L8lf8C5g9w1DeQ2noHEfF408PPN9HHVzZjLL0EnBiKvA04PlAtDq3iXLv567ckNoqn86n02lm0qT9SuJSyA2tt"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="secretKey">
                PUBLISH KEY
              </Label>
              <Input
                id="publish"
                name="secretKey"
                placeholder="sk_test_51L8lf8C5g9w1DeQ21zFtwaxbZLRgHVcmQhsK578HrcJELXFtEjVVn9SUFzCqtCtseeOkqkWGf7VA96SImj4KVL"
                type="text"
              />
            </FormGroup>
          </Col>
          <div className="d-flex justify-content-end">
            <Button>Update</Button>
          </div>
  
        </CardText>
      </CardBody>
    </Card>
    )
}
export default Api
