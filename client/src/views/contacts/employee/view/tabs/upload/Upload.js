// ** React Imports
import { Fragment } from 'react';

// ** Icons Imports
import { ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Form, Button } from 'reactstrap';

// ** Components
import FileUploaderMultiple from './FileUpload';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';

const UploadDoc = ({ stepper, type }) => {
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add Documents</h5>
        <small className="text-muted">Upload New or Choose from Library.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="12">
            <FileUploaderMultiple />
          </Col>
        </Row>

        <div className="float-end">
          <Button color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Upload</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default UploadDoc;
