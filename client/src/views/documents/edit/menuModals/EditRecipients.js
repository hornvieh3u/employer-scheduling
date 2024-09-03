import { Fragment, useContext, useEffect } from 'react';
import { ModalBody, Button, Row, Col, Label, Form, Input, UncontrolledTooltip } from 'reactstrap';
import { Modal } from 'reactstrap';
import { ArrowRight, Info, X } from 'react-feather';
import RepeatingForm from '../../create/RepeatingFormAnimated';
import { DocumentContext } from '../../../../utility/context/Document';

export default function EditRecipients({ open, toggle }) {
  const { recipients, setRecipients, isOnlySigner, setIsOnlySigner } = useContext(DocumentContext);
  const handleOnlySigner = () => {
    setIsOnlySigner(!isOnlySigner);
  };

  useEffect(() => {
    if (isOnlySigner === true) {
      const temp = recipients;
      setRecipients([{ ...temp[0], name: '', email: '' }]);
    }
  }, [isOnlySigner]);

  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="lg" scrollable>
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
              <h5 className="mb-0">Edit Recipients</h5>
              <small className="text-muted">Add Manually or Choose from Contacts</small>
            </div>
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-1">
                <div className="form-check form-check-inline mb-1">
                  <Input
                    type="checkbox"
                    id="basic-cb-checked"
                    checked={isOnlySigner}
                    onChange={handleOnlySigner}
                  />
                  <Label for="basic-cb-checked" className="form-check-label">
                    I am the only signer <Info id="onlySignerTooltip" size={18} className="ms-1" />
                  </Label>
                  <UncontrolledTooltip placement="right" target="onlySignerTooltip">
                    As the only signer, you can place fields and sign your document. Once you're
                    done, it'll be saved in your account.
                  </UncontrolledTooltip>
                </div>
                <div>
                  <RepeatingForm disabled={isOnlySigner} />
                </div>
              </div>
            </Form>
          </Fragment>
        </ModalBody>
      </Modal>
    </>
  );
}
