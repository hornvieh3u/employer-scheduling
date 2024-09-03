import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ModalBody, Button, ModalFooter, Row, Col } from 'reactstrap';
import PdfViewer from './PdfViewer';
import SideMenu from './SideMenu';
import { Modal } from 'reactstrap';
import { X } from 'react-feather';
import PageTitle from './PageTitle';
import { putSendEmail } from '../../../requests/documents/create-doc';
import { DocumentContext } from '../../../utility/context/Document';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { generateDocCode } from '../helpers/loadPdfHelper';

const MySwal = withReactContent(Swal);

export default function EditDoc({ open, toggle, isEdit }) {
  const {
    url,
    board,
    recipients,
    docMessage,
    setBoardCurrent,
    setSelectedItem,
    setRecipients,
    setUrl,
    setDocumentFiles,
    setDocMessage,
    setCurrentPage,
    setZoom,
    setIsOnlySigner,
    setHashcode,
    setSignatures,
    setStamps,
    setSignatureId,
    setSignature,
    setStamp,
    setCustomFields,
    setRedoList,
    setUndoList,
    setIsUndoRedo,
    setBoard,
    setDocumentTitle
  } = useContext(DocumentContext);

  const history = useHistory();
  const handleSaveDoc = () => {
    let boardPayload = [];
    board.map((b) => {
      boardPayload.push({ ...b, icon: null });
    });

    recipients.map((r) => {
      const temp = r;
      if (temp.hashCode === undefined || temp.hashCode === '') {
        temp.hashCode = generateDocCode(url.id, temp.email);
        temp.url = `https://mymanager.com/document/email-link/${temp.hashCode}`;
      }
      return temp;
    });
    putSendEmail(
      url.id,
      {
        documentUrl: url.url,
        mymanagerUrl: `https://mymanager.com/document/preview/`,
        recipients: recipients,
        properties: boardPayload,
        docMessage: docMessage,
        isSent: true
      },
      true
    );
    setBoardCurrent([]);
    setSelectedItem({});
    setRecipients([]);
    setUrl({});
    setDocumentFiles([]);
    setDocMessage({});
    setCurrentPage(1);
    setZoom(1);
    setIsOnlySigner(false);
    setHashcode();
    setSignatures([]);
    setStamps([]);
    setSignatureId();
    setSignature({});
    setStamp({});
    setCustomFields([]);
    setRedoList([]);
    setUndoList([]);
    setIsUndoRedo(false);
    setBoard([]);
    setDocumentTitle('');
    history.push('/documents');
    toggle();
  };
  const handleCloseDoc = async () => {
    const result = await MySwal.fire({
      title: '',
      text: 'Are you sure you want to exit edit document?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Save and close',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      let boardPayload = [];
      board.map((b) => {
        boardPayload.push({ ...b, icon: null });
      });

      recipients.map((r) => {
        const temp = r;
        if (temp.hashCode === undefined || temp.hashCode === '') {
          temp.hashCode = generateDocCode(url.id, temp.email);
          temp.url = `https://mymanager.com/document/email-link/${temp.hashCode}`;
        }
        return temp;
      });
      putSendEmail(
        url.id,
        {
          documentUrl: url.url,
          mymanagerUrl: `https://mymanager.com/document/preview/`,
          recipients: recipients,
          properties: boardPayload,
          docMessage: docMessage
        },
        false
      );
      setBoardCurrent([]);
      setSelectedItem({});
      setRecipients([]);
      setUrl({});
      setDocumentFiles([]);
      setDocMessage({});
      setCurrentPage(1);
      setZoom(1);
      setIsOnlySigner(false);
      setHashcode();
      setSignatures([]);
      setStamps([]);
      setSignatureId();
      setSignature({});
      setStamp({});
      setCustomFields([]);
      setRedoList([]);
      setUndoList([]);
      setIsUndoRedo(false);
      setBoard([]);
      setDocumentTitle('');
      history.push('/documents');
      toggle();
    }
  };

  const handleSendEmail = () => {
    //save doc & send
    handleSaveDoc();

    toggle();
    //redirect to documents
    //clear board
    setBoardCurrent([]);
    setSelectedItem({});
    setRecipients([]);
    setUrl({});
    setDocumentFiles([]);
    setDocMessage({});
    setCurrentPage(1);
    setZoom(1);
    setIsOnlySigner(false);
    setHashcode();
    setSignatures([]);
    setStamps([]);
    setSignatureId();
    setSignature({});
    setStamp({});
    setCustomFields([]);
    setRedoList([]);
    setUndoList([]);
    setIsUndoRedo(false);
    setBoard([]);
    setDocumentTitle('');

    //redirect to document page

    history.push('/documents');
  };

  return (
    <>
      <Modal
        isOpen={open}
        toggle={toggle}
        fullscreen
        scrollable
        style={{ overflowX: 'hidden' }}
        keyboard={false}
      >
        <div className="bg-light" id="modalHeader">
          <Row className="w-100 mx-0">
            <Col xs="1" style={{ maxWidth: '40px' }} className="my-auto">
              <Button onClick={handleCloseDoc} color="link" className="p-0">
                <X />
              </Button>
            </Col>
            <Col>
              <PageTitle closeToggle={toggle} />
            </Col>
          </Row>
        </div>
        <ModalBody className="bg-light-secondary">
          <div>
            <Row>
              <Col md="2" className="mx-0 px-0">
                <SideMenu />
              </Col>
              <Col md="10">
                <PdfViewer  />
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter id="modalFooter">
          <Button color="secondary" onClick={toggle}>
            Back
          </Button>
          <Button color="primary" onClick={handleSendEmail}>
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
