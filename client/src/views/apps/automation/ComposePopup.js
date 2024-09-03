// ** React Imports
import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { TbArrowMerge } from 'react-icons/tb';
import { ModalFooter } from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
import { Col, Row } from 'reactstrap';
// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { Minus, X, Maximize2, Paperclip, MoreVertical, Trash } from 'react-feather';
// ** Reactstrap Imports
import {
  Form,
  Modal,
  Button,
  ModalBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Label,
  Input,
  FormGroup
} from 'reactstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useComposeMarketingEmail } from '../../../requests/contacts/marketing-emails';

// ** Utils
import { selectThemeColors } from '@utils';

// ** User Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';
import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const ComposePopup = (props) => {
  // ** Props & Custom Hooks
  const { composeOpen, toggleCompose } = props;

  // ** States
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [startPicker, setStartPicker] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const [showtoinput, setShowtoinput] = useState(false);
  const [showflatpicker, setShowflatpicker] = useState(false);
  const [sendtext, setSendtext] = useState('Send');
  const handleSchedule = () => {
    showflatpicker
      ? setShowflatpicker(false) & setSendtext('Send')
      : setShowflatpicker(true) & setSendtext('Scheduled Send');
  };
  const handleToSelect = (e) => {
    if (e.target.value === 'email') {
      setShowtoinput(false);
      setToType('email');
    } else {
      setShowtoinput(true);
      setToType('smart list');
    }
  };

  // ** User Select Options & Components
  const selectOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 }
  ];
  const toOptions = [
    { value: 'smart list', label: 'Smartlist' },
    { value: 'email', label: 'To email' }
  ];

  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex flex-wrap align-items-center">
          {data.img && <Avatar className="my-0 me-50" size="sm" img={data.img} />}
          {data.label}
        </div>
      </components.Option>
    );
  };

  // ** CC Toggle Function
  const toggleCC = (e) => {
    e.preventDefault();
    setCCOpen(!ccOpen);
  };

  // ** BCC Toggle Function
  const toggleBCC = (e) => {
    e.preventDefault();
    setBCCOpen(!bccOpen);
  };

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault();
    toggleCompose();
  };

  // ** Toggles Sub Modal
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);

  // ** Toggles Full Screen
  const toggleFullScreen = (e) => {
    e.preventDefault();
    setFullScreen(!fullScreen);
  };
  const [fullScreen, setFullScreen] = useState(false);

  // ** Switch To Options
  const [toType, setToType] = useState('email');

  // ** Multi-select text input
  const createOption = (label) => ({
    label,
    value: label
  });
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState([]);
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };

  // ** Mail content management
  const initialContent = `
        <p></p>
    `;
  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  const [from, setFrom] = useState([]);
  const [content, setContent] = useState(editorState);
  const { mutate } = useComposeMarketingEmail();

  // ** Submit email to the specific address
  const onSubmit = async (e) => {
    e.preventDefault();
    // toggleCompose()
    const payload = {
      toType,
      to: value,
      from: from,
      subject: e.target.elements.subject.value,
      startDate: e.target.elements.startDate.value,
      content: draftToHtml(convertToRaw(content.getCurrentContent()))
    };
    mutate(payload);
  };

  return (
    <>
      <div className="relative">
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
            <ModalBody>dsfads</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

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
            <Form className="compose-form" onSubmit={onSubmit}>
              <div>
                <Row>
                  <div className="d-flex justify-content-between">
                    <Col xl="4" className="p-2">
                      <button type="button" class="btn btn-primary rounded-0">
                        Basic
                      </button>
                      <button type="button" class="btn btn-outline-primary rounded-0" disabled>
                        Builder
                      </button>
                    </Col>
                    <Col xl="3">
                      <Flatpickr
                        required
                        id="startDate"
                        name="startDate"
                        className={`form-control m-1 ${!showflatpicker && 'd-none'}`}
                        onChange={(date) => setStartPicker(date[0])}
                        value={startPicker}
                        options={{
                          enableTime: allDay === false,
                          dateFormat: 'Y-m-d H:i'
                        }}
                      />
                    </Col>
                    <Col xl="3" className="py-2">
                      <FormGroup switch>
                        <Label check>Scheduled</Label>
                        <Input type="switch" checked={showflatpicker} onClick={handleSchedule} />
                      </FormGroup>
                    </Col>
                  </div>
                </Row>
                <Row className="px-1">
                  <Col xl="5">
                    <FormGroup row>
                      <Label for="exampleEmail" sm={2}>
                        From:
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="exampleEmail"
                          name="email"
                          placeholder="with a placeholder"
                          type="email"
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xl="3">
                    <Input
                      id="to-type"
                      name="select"
                      type="select"
                      value={toType}
                      onChange={handleToSelect}
                    >
                      <option value="smart list">Smart List</option>
                      <option value="email">Email</option>
                    </Input>
                  </Col>
                  <Col xl="4" className={`${showtoinput && 'd-none'}`}>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={4}>
                        To Email
                      </Label>
                      <Col sm={8}>
                        <Input
                          id="exampleEmail"
                          name="email"
                          placeholder="with a placeholder"
                          type="email"
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xl="4" className={`${!showtoinput && 'd-none'}`}>
                    <div className="compose-mail-form-field">
                      <Label for="email-to" className="form-label">
                        Smartlist:
                      </Label>
                      <div className="flex-grow-1">
                        <Select
                          isMulti
                          id="email-to"
                          isClearable={false}
                          theme={selectThemeColors}
                          options={selectOptions}
                          className="react-select select-borderless"
                          classNamePrefix="select"
                          components={{
                            Option: SelectComponent
                          }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="compose-mail-form-field">
                <Label for="subject" className="form-label">
                  Subject:
                </Label>
                <Input id="subject" placeholder="Subject" />
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
                  onEditorStateChange={(data) => setContent(data)}
                  editorState={content}
                />
              </div>
              <div className="compose-footer-wrapper">
                <div className="btn-wrapper d-flex align-items-center">
                  <UncontrolledButtonDropdown direction="up" className="me-1">
                    <Button color="primary" type="submit">
                      Send
                    </Button>
                    <DropdownToggle
                      className="dropdown-toggle-split"
                      color="primary"
                      caret
                    ></DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem href="/" tag="a" onClick={togglePopUp}>
                        Schedule Send
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  <div className="email-attachement">
                    <Label className="mb-0" for="attach-email-item">
                      <Paperclip className="cursor-pointer ms-50" size={18} />
                      <input type="file" name="attach-email-item" id="attach-email-item" hidden />
                    </Label>
                  </div>
                  <div>
                    <TbArrowMerge className="cursor-pointer ms-50" onClick={toggle} size={18} />
                  </div>
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
      </div>
    </>
  );
};

export default ComposePopup;
