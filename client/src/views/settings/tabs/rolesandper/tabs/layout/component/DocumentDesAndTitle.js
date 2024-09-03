// ** React Imports
import { Fragment } from 'react';

// ** Icons Imports
import { ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Form, Button, Label, Input } from 'reactstrap';

// ** Components
import FileUploaderMultiple from './FileUpload';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';

function DocumentDesAndTitle() {
  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="6">
            <Label className="form-label" for="title">
              Title
            </Label>
            <Input type="text" />
          </Col>
          <Col sm="12" className="mt-1">
            <Label className="form-label" for="des">
              Description
            </Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              placeholder="Write your notes..."
              style={{ height: '150px' }}
            />
          </Col>
          <div className=" d-flex justify-content-end float-end mt-1 mb-2">
            <Button color="primary" className="btn-next">
              <span className="align-middle d-sm-inline-block d-none">Submit</span>
            </Button>
          </div>
        </Row>
      </Form>
    </Fragment>
  );
}

export default DocumentDesAndTitle;
