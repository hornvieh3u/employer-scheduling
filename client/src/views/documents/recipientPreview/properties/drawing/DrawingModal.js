import React, { useContext, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useUploadSignature } from '../../../../../requests/documents/recipient-doc';
import { DocumentContext } from '../../../../../utility/context/Document';
import { b64toBlob } from '../../../helpers/loadPdfHelper';
const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem'
};

export default function DrawingModal({ open, toggle, item }) {
  // States
  const { setBoard } = useContext(DocumentContext);

  const drawingRef = useRef();
  const handleSave = () => {
    drawingRef.current.exportImage('png').then((data) => {
      const blob = b64toBlob(data);
      const file = new File([blob], 'drawing.png', {
        type: 'image/png'
      });
      const formData = new FormData();
      formData.append('file', file);
      useUploadSignature(formData).then((res) => {
        if (res.success) {
          //set board
          setBoard((board) =>
            board.map((b) => {
              let x = b;
              if (x.id === item.id && x.type === item.type) {
                x.isDone = true;
                x.signValue = {
                  path: res.url
                };
              }
              return x;
            })
          );
        }
      });
    });
    toggle();
  };

  //set drawing url to done object
  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Drawing</ModalHeader>
      <ModalBody>
        <ReactSketchCanvas
          style={styles}
          width="800"
          height="800"
          strokeWidth={4}
          strokeColor="black"
          ref={drawingRef}
        ></ReactSketchCanvas>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="me-2" onClick={handleSave}>
            <span className="align-middle d-sm-inline-block d-none">Save</span>
          </Button>
          <Button color="primary" outline onClick={toggle}>
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
