import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { Button } from 'reactstrap';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem'
};

export default function DrawSigniture({ signatureRef, form }) {
  const handleClearClicked = () => {
    drawRef.current.clearCanvas();
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h6>Draw You Signature</h6>
        <Button color="link" onClick={handleClearClicked}>
          Clear
        </Button>
      </div>
      <ReactSketchCanvas
        style={styles}
        width="600"
        height="400"
        strokeWidth={4}
        strokeColor="black"
        ref={signatureRef}
      ></ReactSketchCanvas>
    </>
  );
}
