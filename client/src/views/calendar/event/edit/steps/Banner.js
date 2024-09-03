// ** React Imports
import { Fragment, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';

// ** Components
import FileUploaderSingle from '../FileUploaderSingle';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';

const Banner = ({ stepper, type, eventForm, eventInfo }) => {
  const [files, setFiles] = useState([]);

  const url = eventInfo.eventBanner;
  const handleNext = () => {
    if (files.length) {
      eventForm.set('file', files[0]);
    } else {
      eventForm.set('eventBanner', url);
    }
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Banner</h5>
        <small className="text-muted">Upload An Event Banner.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="12">
            <FileUploaderSingle files={files} setFiles={setFiles} url={url} />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev btn btn-primary"
            outline
            onClick={() => stepper.previous()}
          >
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => handleNext()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Banner;
