import { useState } from 'react';

// ** Reactstrap Imports
import { Form, Label, Input, Button, Row, Col } from 'reactstrap';

const CashPayment = () => {
  const [selectedMethod, setSelectedMethod] = useState();

  return (
    <div className="card-payment">
      <Form className="form" onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Label className="form-label mb-1" for="payment-input-name">
            Choose a payment method
          </Label>
          <Col sm="12" className="mb-3">
            <div className="d-flex">
              <div className="form-check me-3">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="ex1"
                  value="cash"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                />
                <Label className="form-check-label" for="ex1-active">
                  Cash On Delivery
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="ex1"
                  value="cheque"
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  id="ex1-inactive"
                />
                <Label className="form-check-label" for="ex1-inactive">
                  Cheque
                </Label>
              </div>
            </div>
          </Col>
          {selectedMethod && selectedMethod === 'cheque' ? (
            <Col sm="12" className="mb-2">
              <Label className="form-label" for="payment-input-name">
                Check Number
              </Label>
              <Input placeholder="Type the cheque number here" id="payment-input-name" />
            </Col>
          ) : (
            <></>
          )}

          <Col className="d-grid" sm="12">
            <Button color="primary">Make Payment</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CashPayment;
