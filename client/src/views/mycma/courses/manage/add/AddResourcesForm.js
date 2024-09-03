// ** React Imports
import { useState, Fragment } from 'react';

// ** Custom Components
import Repeater from '@components/repeater';

// ** Third Party Components
import { X, Plus } from 'react-feather';
import { SlideDown } from 'react-slidedown';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  Label,
  Input,
  Button
} from 'reactstrap';

// ** Styles
import 'react-slidedown/lib/slidedown.css';

const RepeatingForm = () => {
  // ** State
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const deleteForm = (e) => {
    e.preventDefault();
    const slideDownWrapper = e.target.closest('.react-slidedown'),
      form = e.target.closest('form');
    if (slideDownWrapper) {
      slideDownWrapper.remove();
    } else {
      form.remove();
    }
  };

  return (
    <Fragment>
      <Row className="justify-content-between align-items-center">
        <Col md={4} className="mb-md-0 mb-1">
          <Label className="form-label">Resource Title</Label>
        </Col>
        <Col md={3} className="mb-md-0 mb-1">
          <Label className="form-label">Link</Label>
        </Col>
        <Col md={3} className="mb-md-0 mb-1">
          <Label className="form-label">Upload File</Label>
        </Col>

        <Col md={2}>
          <Label className="form-label">Delete</Label>
        </Col>
        <Col sm={12}>
          <hr />
        </Col>
      </Row>
      <Repeater count={count}>
        {(i) => {
          const Tag = i === 0 ? 'div' : SlideDown;
          return (
            <Tag key={i}>
              <Form>
                <Row className="justify-content-between align-items-center">
                  <Col md={4} className="mb-md-0 mb-1">
                    <Input
                      type="text"
                      id={`animation-item-name-${i}`}
                      placeholder="Type resource title"
                    />
                  </Col>
                  <Col md={3} className="mb-md-0 mb-1">
                    <Input
                      type="text"
                      id={`animation-item-name-${i}`}
                      placeholder="MyManager Admin Template"
                    />
                  </Col>
                  <Col md={3} className="mb-md-0 mb-1">
                    <Input type="file" id={`animation-item-name-${i}`} />
                  </Col>
                  <Col md={2}>
                    <Button
                      color="danger"
                      className="text-nowrap px-1"
                      onClick={deleteForm}
                      outline
                    >
                      <X size={14} />
                    </Button>
                  </Col>
                  <Col sm={12}>
                    <hr />
                  </Col>
                </Row>
              </Form>
            </Tag>
          );
        }}
      </Repeater>
      <Button className="btn-icon" color="primary" onClick={increaseCount}>
        <Plus size={14} />
        <span className="align-middle ms-25">Add New</span>
      </Button>
    </Fragment>
  );
};

export default RepeatingForm;
