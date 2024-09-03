import React, { useState } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Row
} from 'reactstrap';

function Retention() {
  let checkerarray = [];
  let a = null;
  const basicoptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 30
  ];
  const [optionarray1, setOptionarray1] = useState([]);
  const [optionarray2, setOptionarray2] = useState([]);
  const [optionarray3, setOptionarray3] = useState([]);
  const selectHandler = (e) => {
    if (e.target.name === 'from1') {
      setOptionarray1(basicoptions.slice(e.target.value));
      setOptionarray2([]);
      setOptionarray3([]);
    }
    if (e.target.name === 'to1') {
      setOptionarray2(basicoptions.slice(e.target.value));
      setOptionarray3([]);
    }
    if (e.target.name === 'to2') {
      setOptionarray3(basicoptions.slice(e.target.value));
    }
  };

  return (
    <Card className="m-2">
      <CardBody className="rounded-none">
        <CardTitle tag="h5"></CardTitle>
        <CardText>
          <form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md={2}>
                <FormGroup>
                  <Label>Color</Label>
                  <div className="bg-success p-2"></div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>From</Label>
                  <Input
                    id="from1input"
                    name="from1"
                    type="select"
                    onChange={selectHandler}
                    required
                  >
                    {basicoptions.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>To</Label>
                  <Input id="to1input" name="to1" type="select" onChange={selectHandler}>
                    {optionarray1.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <FormGroup>
                  <Label>Color</Label>
                  <div className="bg-warning p-2"></div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>From</Label>
                  <Input id="from2input" name="from2" type="select" required disabled={true}>
                    {optionarray2.slice(0, 1).map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>To</Label>
                  <Input id="to2input" name="to2" type="select" onChange={selectHandler} required>
                    {optionarray2.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <FormGroup>
                  <Label>Color</Label>
                  <div className="bg-danger p-2"></div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>From</Label>
                  <Input
                    id="from3input"
                    name="from3"
                    onChange={selectHandler}
                    type="select"
                    disabled={true}
                    required
                  >
                    {optionarray3.slice(0, 1).map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>To</Label>
                  <Input id="to3input" name="to3" onChange={selectHandler} type="select" required>
                    {optionarray3.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button color="primary" type="submit">
                Update
              </Button>
            </div>
          </form>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default Retention;
