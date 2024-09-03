import React, { Fragment } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Button, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import img1 from '@src/assets/images/goals/g1.png';
import img2 from '@src/assets/images/goals/g2.png';
import img3 from '@src/assets/images/goals/g3.png';

const ProgressionTemplate = (props) => {
  const { stepper, setRSelected, rSelected } = props;
  return (
    <Fragment>
      {/* <Card className="p-2"> */}
      <div className="d-flex mt-2 bg-transparent">
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img1} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">FORM</CardTitle>
              <CardText>
                <small className="text-muted">
                  Add a form that employees will need to fill out with or without signature.
                </small>
              </CardText>
              <Button
                onClick={() => setRSelected(1)}
                active={rSelected === 1}
                color="primary"
                block
                outline
              >
                Select
              </Button>
            </CardBody>
          </Card>
        </div>
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img2} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">TASK</CardTitle>
              <CardText>
                <small className="text-muted">
                  Collect documents from employees in which they will need to upload themselves
                </small>
              </CardText>
              <Button
                onClick={() => setRSelected(2)}
                active={rSelected === 2}
                color="primary"
                block
                outline
              >
                Select
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
      {/* </Card > */}

      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" disabled>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};
export default ProgressionTemplate;
