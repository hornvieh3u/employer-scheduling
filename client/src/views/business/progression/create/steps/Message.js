// ** React Imports
import { Fragment, useContext, useState, useEffect, useCallback } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather';
import { decodeFromBase64, PDFDocument } from 'pdf-lib';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from 'reactstrap';
import { useAddRecipients, useUploadDocument } from '../../../../requests/documents/create-doc';
import { DocumentContext } from '../../../../utility/context/Document';
import EditDoc from '../../edit/EditDoc';
import { toast } from 'react-toastify';
import {
  blobToBase64,
  convertDocx,
  createImageDoc,
  convertBase64
} from '../../helpers/loadPdfHelper';

const generateDocCode = (documentId, recipient) => {
  const str = String(documentId + recipient);
  let output = '';
  for (let index = 0; index < str.length; index++) {
    output = output + str.charCodeAt(index);
  }
  return parseInt(output)
    .toString(36)
    .replace(/^0+|0+$/g, '');
};
const Message = ({ stepper, type }) => {
  // ** Contexts
  const {
    recipients,
    documentFiles,
    setUrl,
    docMessage,
    setDocMessage,
    setRecipients,
    isOnlySigner
  } = useContext(DocumentContext);
  // ** States
  const [modal, setModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate } = useAddRecipients();

  const handleMessage = (e) => {
    setDocMessage({ ...docMessage, [e.target.name]: e.target.value });
  };

  const handleAddRecipient = () => {
    if (documentFiles.length > 0) {
      //upload document to db

      if (recipients.length > 0) {
        if (isOnlySigner) {
          mergeFiles();
        } else {
          const temp = recipients.some((r) => r.name === '' || r.email === '');

          if (temp) {
            toast.error('Name and email is required for all recipients');
          } else {
            const regex =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const validEmail = recipients.filter((r) => regex.test(r.email));
            if (validEmail.length === recipients.length) {
              mergeFiles();
            } else {
              toast.error('Email is not valid');
            }
          }
        }
      }
    } else {
      toast.error('Please upload document!');
    }
  };
  const toggle = () => setModal(!modal);
  const mergeFiles = async () => {
    setIsUploading(true);
    const mergedDoc = await PDFDocument.create();
    for (const file of documentFiles) {
      if (file.type.startsWith('image')) {
        const pdf = await createImageDoc(file);
        const pdfFile = await PDFDocument.load(pdf);
        const copiedPdfPages = await mergedDoc.copyPages(pdfFile, pdfFile.getPageIndices());
        copiedPdfPages.forEach((page) => mergedDoc.addPage(page));
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        //convert to pdf
        const buffer = await convertDocx(file);
        const pdfFile = await PDFDocument.load(buffer);
        const copiedPdfPages = await mergedDoc.copyPages(pdfFile, pdfFile.getPageIndices());
        copiedPdfPages.forEach((page) => mergedDoc.addPage(page));
      } else {
        const f = await convertBase64(file);
        const fromBase64 = decodeFromBase64(f);
        const pdfFile = await PDFDocument.load(fromBase64);
        const copiedPdfPages = await mergedDoc.copyPages(pdfFile, pdfFile.getPageIndices());
        copiedPdfPages.forEach((page) => mergedDoc.addPage(page));
      }
    }
    //save mergedDoc
    saveMergedDoc(mergedDoc, recipients);
  };
  const saveMergedDoc = useCallback((mergedDoc, recipients) => {
    setIsUploading(true);
    mergedDoc.save().then(async (res) => {
      var blob = new Blob([res], { type: 'application/pdf' });
      const fileName = (Math.random() + 1).toString(36).substring(2);
      const file = new File([blob], `${fileName}.pdf`, {
        type: 'application/pdf;charset=utf-8'
      });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'general');
      //pass data to db
      useUploadDocument(formData).then((res) => {
        if (res?.success) {
          setUrl(res.uploadedDocuments);
          //create hashcode
          let rec = recipients;
          const reci = rec.map((c) => {
            const code = generateDocCode(res.uploadedDocuments.id, c.email);
            c = {
              ...c,
              hashCode: code,
              url: `https://mymanager.com/document/email-link/${code}`
            };
            return c;
          });

          setRecipients(reci);
          //add recipient to db
          if (recipients.length === 1 && recipients[0].name === '') {
            mutate({
              documentId: res.uploadedDocuments.id,
              documentUrl: res.uploadedDocuments.url,
              mymanagerUrl: `https://mymanager.com/document`,
              recipients: [],
              properties: [],
              docMessage: docMessage
            });
          } else {
            mutate({
              documentId: res.uploadedDocuments.id,
              documentUrl: res.uploadedDocuments.url,
              mymanagerUrl: `https://mymanager.com/document`,
              recipients: reci,
              properties: [],
              docMessage: docMessage
            });
          }
          toggle();
        }
      });
      //save on local storage
      const data = await blobToBase64(blob);
      localStorage.setItem('pdf', data);
      //toggle()
    });
    setIsUploading(false);
  }, []);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add Message</h5>
        <small>A few words for recipients</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label" for="basicInput">
              Email Subject
            </Label>
            <Input type="host" id="basicInput" placeholder="Enter Host Name" name="subject" />
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
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" outline onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={handleAddRecipient}
            disabled={isUploading}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {isUploading ? '...Loading' : 'Next'}
            </span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
      <EditDoc open={modal} toggle={toggle} />
    </Fragment>
  );
};

export default Message;
