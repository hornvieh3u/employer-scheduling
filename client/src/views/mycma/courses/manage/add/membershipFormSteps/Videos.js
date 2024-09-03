// ** React Imports
import { Fragment } from 'react';

// ** Components
import UploadVideosForm from '../UploadVideosForm';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Button } from 'reactstrap';

// ** Styles
import 'react-slidedown/lib/slidedown.css';

const Videos = ({ stepper, type }) => {
  return (
    <Fragment>
      <UploadVideosForm />
      <div className="d-flex justify-content-between mt-2">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
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

export default Videos;
