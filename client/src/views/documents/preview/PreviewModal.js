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

export default function PreviewModal({ open, toggle }) {
  const { recipients, setHashcode } = useContext(DocumentContext);

  const [recipient, setRecipient] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleChange = (item) => {
    setRecipient(item);
  };
  const handleOpenDropDown = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    if (recipient) {
      setHashcode(recipient.hashCode);
    }
  }, [recipient]);
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
                      {recipient && (
                        <>
                          <Circle color={recipient.color} />
                          <span className="px-2"> {recipient.name}</span>
                        </>
                      )}
                    </DropdownToggle>
                    <DropdownMenu>
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
          <DocumentPreview recipient={recipient} />
        </ModalBody>
      </Modal>
    </>
  );
}
