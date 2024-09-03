// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { Card, CardImg, CardTitle, CardBody, CardText, Button } from 'reactstrap';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Images
import img1 from '@src/assets/images/goals/g1.png';
import img2 from '@src/assets/images/goals/g2.png';
import img3 from '@src/assets/images/goals/g3.png';

const Template = (props) => {
  const { rSelected, stepper, type, setRSelected } = props;
  // ** States

  return (
    <Fragment>
      <div className="d-flex mt-2 bg-transparent">
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img1} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">Target</CardTitle>
              <CardText>
                <small className="text-muted">Create a goal based on category.</small>
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
              <CardTitle tag="h4">Habit</CardTitle>
              <CardText>
                <small className="text-muted">
                  This goal type will help you break your bad habits and form new positive ones. Go
                  for your hot streaks!
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
        <div className="m-1">
          <Card className="mb-3">
            <CardImg top src={img3} alt="card-top" />
            <CardBody>
              <CardTitle tag="h4">My Manager</CardTitle>
              <CardText>
                <small className="text-muted">
                  Automate and track your goal based on Mymanager
                </small>
              </CardText>
              <Button
                onClick={() => setRSelected(3)}
                active={rSelected === 3}
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

export default Template;
