import React, { useEffect, useRef } from 'react';
import { Card, CardBody } from 'reactstrap';

import signatureBg from './../../../../../../assets/images/documents/mmSigned.png';
import initialBg from './../../../../../../assets/images/documents/mmInitial.png';

export default function SelectStyle({ form, signatureRef, initialRef }) {
  const drawBg = (ref, type) => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    if (type === 'sign') {
      img.src = signatureBg;
    } else {
      img.src = initialBg;
    }

    img.onload = () => {
      context.drawImage(img, 0, 0, ref.current.width, ref.current.height);
    };
  };
  const writeText = (ref, type) => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.font = '45px style2';
    context.fillStyle = 'black';
    if (type === 'sign') {
      context.fillText(form.fullName, 25, 80);
    } else {
      context.fillText(form.initials.initial, 25, 80);
    }
    context.stroke();
  };

  useEffect(() => {
    if (form.initials.initial) {
      drawBg(initialRef, 'initial');
    }
    if (form.fullName != '') {
      drawBg(signatureRef, 'sign');
    }

    writeText(signatureRef, 'sign');
    writeText(initialRef, 'initial');
  }, [form]);

  return (
    <>
      <h6>Preview</h6>
      <Card className="border my-2">
        <CardBody>
          <div className="d-flex justify-content-between">
            <canvas ref={signatureRef} width="250" height="138"></canvas>
            <canvas ref={initialRef} width="138" height="138"></canvas>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
