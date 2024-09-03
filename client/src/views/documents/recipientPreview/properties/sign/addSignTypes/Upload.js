import React, { useRef } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { convertBase64 } from '../../../../helpers/loadPdfHelper';
import signatureBg from './../../../../../../assets/images/documents/mmSigned.png';
import initialBg from './../../../../../../assets/images/documents/mmInitial.png';
export default function Upload({ signatureRef, type }) {
  // ** References
  const fileUpload = useRef();
  // ** Functions
  const handleFileUpload = () => {
    fileUpload.current.click();
  };
  const handleUploadChanged = async (e) => {
    if (e.target.files.length > 0) {
      //add file to the signature design
      drawBg(signatureRef, type);
      const img = await convertBase64(e.target.files[0]);
      drawImage(signatureRef, img);
    }
  };
  const drawBg = (ref, type) => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    if (type === 'signature') {
      img.src = signatureBg;
    } else {
      img.src = initialBg;
    }

    img.onload = () => {
      context.drawImage(img, 0, 0, ref.current.width, ref.current.height);
    };
  };
  const drawImage = (ref, img) => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height)
    const image = new Image();

    image.onload = () => {
      context.drawImage(image, 35, 30, ref.current.width, ref.current.height - 60);
    };
    image.src = img;
  };

  return (
    <>
      <h6>Preview</h6>
      <Card className="border my-2">
        <CardBody>
          <canvas ref={signatureRef} width="250" height="138"></canvas>
        </CardBody>
      </Card>
      <input
        type="file"
        className="hidden"
        ref={fileUpload}
        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
        onChange={handleUploadChanged}
      />
      <Button color="primary" onClick={handleFileUpload}>
        Upload Your Signature
      </Button>
      <p>
        <small>For best results use an image that is 400 x 145 pixels</small>
      </p>
    </>
  );
}
