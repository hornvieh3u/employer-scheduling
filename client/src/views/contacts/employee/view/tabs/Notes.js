import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';
import NotesView from './NotesView';

function Notes() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={10} className="mt-1">
              <Label htmlFor="notes">Schaduling Notes</Label>
              <Input
                id="exampleText"
                name="text"
                type="textarea"
                placeholder="Write your notes..."
              />
            </Col>
          </Row>
        </CardBody>
        <div className="d-flex p-1">
          <Button className="me-1" color="primary" size="sm" type="button">
            Save
          </Button>
          <Button outline color="secondary" size="sm" type="reset">
            Cancel
          </Button>
        </div>
      </Card>

      <NotesView />
    </>
  );
}
export default Notes;
