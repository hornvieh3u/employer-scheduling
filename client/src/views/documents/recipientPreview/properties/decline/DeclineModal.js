import React, { useContext } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';

export default function DeclineModal({ open, toggle, item, handleDecline }) {
  const { setBoard } = useContext(DocumentContext);

  const handleContinue = () => {
    setBoard((board) =>
      board.map((b) => {
        let x = b;
        if (x.id === item.id && x.type === item.type) {
          x.isDone = true;
        }
        return x;
      })
    );
    //void document
    handleDecline();
    toggle();
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Caution</ModalHeader>
      <ModalBody>
        <p>
          If you select <b>CONTINUE</b>, this document will be voided.
        </p>
        <p>
          To request changes to this document, please select <b>CANCEL</b> and contact the sender
          directly with your request.
        </p>
        <p>
          You can exit signing and save the information you've entered by using the{' '}
          <b>FINISH LATER</b> option at the top.
        </p>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="me-2" onClick={handleContinue}>
            <span className="align-middle d-sm-inline-block d-none">Continue</span>
          </Button>
          <Button color="primary" outline onClick={toggle}>
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
