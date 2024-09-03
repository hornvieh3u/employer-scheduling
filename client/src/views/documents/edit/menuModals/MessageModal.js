import { Fragment, useContext } from 'react';

import { ModalBody, Button, Row, Col, Label, Form, Input } from 'reactstrap';
import { Modal } from 'reactstrap';
import { X } from 'react-feather';
import { DocumentContext } from '../../../../utility/context/Document';

export default function MessageModal({ open, toggle }) {
  const { docMessage, setDocMessage } = useContext(DocumentContext);
  const handleMessage = (e) => {
    setDocMessage({ ...docMessage, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Modal isOpen={open} toggle={toggle}>
        <div className="bg-light">
          <Row className="w-100 mx-0">
            <Col xs="1" style={{ maxWidth: '40px' }} className="my-auto">
              <Button onClick={toggle} color="link" className="p-1">
                <X />
              </Button>
            </Col>
          </Row>
        </div>
        <ModalBody className="bg-light-secondary">
          <Fragment>
            <div className="content-header">
              <h5 className="mb-0">Edit Message</h5>
              <small>A few words for recipients</small>
            </div>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="basicInput">
                    Email Subject
                  </Label>
                  <Input
                    type="host"
                    id="basicInput"
                    placeholder="Enter Host Name"
                    name="subject"
                    value={docMessage.subject}
                    onChange={handleMessage}
                  />
                </Col>
                <Col md="12" className="mb-1">
                  <Label className="form-label" for="basicInput">
                    Email Message
                  </Label>
                  <Input
                    type="textarea"
                    id="basicInput"
                    placeholder="Enter Message"
                    name="message"
                    onChange={handleMessage}
                    value={docMessage.message}
                  />
                </Col>
              </Row>
            </Form>
          </Fragment>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
