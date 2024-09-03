// ** React Imports
import { useState } from 'react';

// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Minus, X, Maximize2, MoreVertical, Trash, Plus, Send, FileText } from 'react-feather';

// ** Components
import ContactsModal from './ContactsModal';
import FoldersModal from './FoldersModal';

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Modal,
  Button,
  ModalBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Row,
  Col,
  InputGroup,
  InputGroupText
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import { RiContactsBookLine } from 'react-icons/ri';

const ComposePopup = (props) => {
  // ** Props & Custom Hooks
  const { composeOpen, toggleCompose } = props;

  // ** States
  const [contactsModal, setContactsModal] = useState(false);
  const [foldersModal, setFoldersModal] = useState(false);
  const [active, setActive] = useState('1');
  const [activeFoldersTab, setActiveFoldersTab] = useState('1');

  // ** Contacts Modal Tabs Toggle
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  // ** Folders Modal Tabs Toggle
  const toggleFoldersTab = (tab) => {
    if (activeFoldersTab !== tab) {
      setActiveFoldersTab(tab);
    }
  };

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault();
    toggleCompose();
  };

  return (
    <PerfectScrollbar style={{ height: '800px' }} options={{ wheelPropagation: false }}>
      <Modal
        scrollable
        fade={false}
        keyboard={false}
        backdrop={false}
        id="compose-mail"
        container=".content-body"
        className="modal-lg"
        isOpen={composeOpen}
        contentClassName="p-0"
        toggle={toggleCompose}
        modalClassName="modal-sticky"
      >
        <div className="modal-header">
          <h5 className="modal-title">Compose Mail</h5>
          <div className="modal-actions">
            <a href="/" className="text-body me-75" onClick={togglePopUp}>
              <Minus size={14} />
            </a>
            <a href="/" className="text-body me-75" onClick={(e) => e.preventDefault()}>
              <Maximize2 size={14} />
            </a>
            <a href="/" className="text-body" onClick={togglePopUp}>
              <X size={14} />
            </a>
          </div>
        </div>
        <ModalBody className="flex-grow-1 p-0">
          <Form className="compose-form" onSubmit={(e) => e.preventDefault()}>
            <div className="ms-2 mt-1 mb-1 d-flex">
              <Label className="mb-0 me-2" for="attach-email-item">
                <h6 className="text-primary cursor-pointer">Upload New File</h6>
                <input type="file" name="attach-email-item" id="attach-email-item" hidden />
              </Label>

              <h6
                className="text-primary cursor-pointer"
                onClick={() => setFoldersModal(!foldersModal)}
              >
                Choose From Library
              </h6>
              <FoldersModal
                foldersModal={foldersModal}
                setFoldersModal={setFoldersModal}
                toggle={toggleFoldersTab}
                active={activeFoldersTab}
              />
            </div>
            <div className="email-attachement"></div>
            <div className="m-2">
              <span>Recipients:</span>
              <Form>
                <Row className="justify-content-between align-items-center">
                  <Col md={4} className="mb-md-0">
                    <InputGroup>
                      <Input placeholder="Type a name..." />
                      <InputGroupText>
                        <RiContactsBookLine
                          size={20}
                          className="cursor-pointer"
                          onClick={() => setContactsModal(!contactsModal)}
                        />
                      </InputGroupText>
                    </InputGroup>
                    <ContactsModal
                      contactsModal={contactsModal}
                      setContactsModal={setContactsModal}
                      toggle={toggle}
                      active={active}
                    />
                  </Col>
                  <Col md={4} className="mb-md-0">
                    <Input type="text" placeholder="Email Address" />
                  </Col>
                  <Col md={2} className="mb-md-0">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        outline
                        className="dropdown-toggle-split"
                        color="secondary"
                        caret
                      >
                        <span className="me-1">Action</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem tag="a">Sign</DropdownItem>
                        <DropdownItem tag="a">Get A Copy</DropdownItem>
                        <DropdownItem tag="a">Proof Reading</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Col>
                  <Col md={2}>
                    <Plus
                      size={24}
                      className="cursor-pointer"
                      onClick={() => setContactsModal(!contactsModal)}
                    />
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="compose-mail-form-field">
              <Label for="email-subject" className="form-label">
                Subject:
              </Label>
              <Input id="email-subject" placeholder="Subject" />
            </div>
            <div id="message-editor">
              <Editor
                placeholder="Message"
                toolbarClassName="rounded-0"
                wrapperClassName="toolbar-bottom"
                editorClassName="rounded-0 border-0"
                toolbar={{
                  options: ['inline', 'textAlign'],
                  inline: {
                    inDropdown: false,
                    options: ['bold', 'italic', 'underline', 'strikethrough']
                  }
                }}
              />
            </div>
            <div className="compose-footer-wrapper">
              <div className="btn-wrapper d-flex align-items-center">
                <Button.Ripple color="primary" className="me-1">
                  <Send size={14} />
                  <span className="align-middle ms-25">Send</span>
                </Button.Ripple>
                <Button.Ripple outline color="primary">
                  <FileText size={14} />
                  <span className="align-middle ms-25">Draft</span>
                </Button.Ripple>
              </div>
              <div className="footer-action d-flex align-items-center">
                <UncontrolledDropdown className="me-50" direction="up">
                  <DropdownToggle tag="span">
                    <MoreVertical className="cursor-pointer" size={18} />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                      Add Label
                    </DropdownItem>
                    <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                      Plain text mode
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                      Print
                    </DropdownItem>
                    <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                      Check Spelling
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Trash className="cursor-pointer" size={18} onClick={toggleCompose} />
              </div>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </PerfectScrollbar>
  );
};

export default ComposePopup;
