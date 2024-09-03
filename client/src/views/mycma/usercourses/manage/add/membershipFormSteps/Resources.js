// ** React Imports
import { Fragment } from 'react';

// ** Components
import AddResourcesForm from '../AddResourcesForm';

// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';

// ** Icons Imports
import { ArrowLeft } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Button } from 'reactstrap';

// ** Styles
import '@styles/react/libs/editor/editor.scss';

const Resources = ({ stepper, type }) => {
  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="12" sm="12" className="mb-1">
            <Label className="form-label" for="description">
              Description
            </Label>
            <Editor />
          </Col>
        </Row>
        <div className="mb-2">
          <AddResourcesForm />
        </div>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="success" className="btn-submit" onClick={() => alert('submitted')}>
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Resources;
