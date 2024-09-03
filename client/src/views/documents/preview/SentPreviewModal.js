import React, { useContext, useEffect, useState } from 'react';

import {
  ModalBody,
  Button,
  ModalFooter,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from 'reactstrap';
import { Modal } from 'reactstrap';
import { Circle, X } from 'react-feather';
import DocumentPreview from './DocumentPreview';
import { DocumentContext } from '../../../utility/context/Document';
import SentDocumentPreview from './SentDocumentPreview';
import jsPDF from 'jspdf';
import FileSaver from 'file-saver';

export default function SentPreviewModal({ open, toggle }) {
  const { recipients,board,documentTitle } = useContext(DocumentContext);
  const [recipient, setRecipient] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAll,setIsAll]=useState(false);
  const [boardDimention, setBoardDimention] = useState({ x: 0, y: 0 });
  


  const handleDownload = async () => {
    var elementHTML = document.querySelector('#pageContainer');

    const doc = new jsPDF('p', 'px', [boardDimention.x + 1, boardDimention.y + 1]);
    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save(`${documentTitle}.pdf`);
      }
    });
    const attachments = board.filter(x=>x.type==='attachment');
    if(attachments.length>0){
 
      attachments.map(x=>{
       if(x.isDone===true){
        FileSaver.saveAs(x.list[0],`attachment-${documentTitle}-${x.recipient.name}.pdf`)
       }
      })
    }
  };
  const handleChange = (item) => {
    setRecipient(item);
    setIsAll(false)
  };
  const handleAllRecipients = () => {
    setIsAll(true)
  };
  const handleOpenDropDown = () => setDropdownOpen((prevState) => !prevState);
 
  useEffect(() => {
    handleChange(recipients.find((x) => x.active === true));
  }, [recipients]);
  return (
    <>
      <Modal isOpen={open} toggle={toggle} fullscreen scrollable style={{ overflowX: 'hidden' }}>
        <div className="bg-light " style={{ paddingTop: '5px', paddingBottom: '5px' }}>
          <Row className="w-100 mx-0">
            <Col xs="1" style={{ maxWidth: '40px' }} className="my-auto">
              <Button onClick={toggle} color="link" className="p-0">
                <X />
              </Button>
            </Col>
            <Col xs="11">
              <div className="d-flex justify-content-end">
              <Button color="primary" className="me-2" onClick={handleDownload}>
                    Download
                  </Button>
                {recipients && (
                  <UncontrolledButtonDropdown
                    size="sm"
                    isOpen={dropdownOpen}
                    toggle={handleOpenDropDown}
                  >
                    <DropdownToggle
                      outline
                      color="primary"
                      caret
                      className="w-100"
                      style={{ borderRadius: 'none' }}
                    >
                     
                      {}

                      {isAll===true ? (
                        <>
                          <Circle color='primary' />
                          <span className="px-2"> All Recipients</span>
                        </>
                      ):recipient && (
                        <>
                          <Circle color={recipient.color} />
                          <span className="px-2"> {recipient.name}</span>
                        </>
                      )}
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem
                            
                            className="w-100"
                            onClick={handleAllRecipients}
                          >
                            <Circle color='primary' /> <span className="px-2">All Recipients</span>
                          </DropdownItem>
                      {recipients &&
                        recipients.map((item, idx) => (
                          <DropdownItem
                            key={idx}
                            className="w-100"
                            onClick={() => handleChange(item)}
                          >
                            <Circle color={item.color} /> <span className="px-2">{item.name}</span>
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <ModalBody className="bg-light-secondary">
          <SentDocumentPreview recipient={recipient} isAll={isAll} boardDimention={boardDimention} setBoardDimention={setBoardDimention}/>
        </ModalBody>
      </Modal>
    </>
  );
}
