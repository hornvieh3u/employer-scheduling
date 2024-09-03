// ** React Imports
import { useState, useEffect, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import { TbArrowMerge } from 'react-icons/tb';
import { ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
// ** Store & Actions
import { useDispatch } from 'react-redux';
import { listIdSet } from '../../settings/tabs/advancesettings/store';
// ** Custom Components
import Avatar from '@components/avatar';
import { Col, Row } from 'reactstrap';
// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { toast } from 'react-toastify';
import { Minus, X, Maximize2, Paperclip, MoreVertical, Trash } from 'react-feather';
// ** Reactstrap Imports
import {
  Form,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Label,
  Input,
  FormGroup
} from 'reactstrap';
import { EditorState, convertToRaw, ContentState, getCurrentBlock, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useComposeMarketingEmail } from '../../../requests/contacts/marketing-emails';
import { useUploadDocument } from '../../../requests/documents/create-doc';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const formGroupStyleOverrides = {
  display: 'flex',
  alignItems: 'center',
  //  margin bottom 0 and important to override default
  marginBottom: '0px',
  gap: '0.25rem'
};

// ** Merge Codes
const mergeCodes = [
  'fullName',
  'email',
  'phone',
  'photo',
  'gender',
  'status',
  'note',
  'tags',
  'companyPhone',
  'companyEmail',
  'type',
  'company',
  'position',
  'isFormer',
  'isDelete',
  'socialLinks',
  'ranks',
  'files',
  'others',
  'paymentMethods'
];

const ComposePopup = (props) => {
  // ** Props & Custom Hooks
  const { composeOpen, toggleCompose, metadata, contactsStore, smartlistStore } = props;
  const { mutate } = useComposeMarketingEmail();
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  // ** Mail content editor configuration
  const initialContent = `<p></p>`;
  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  // ** States
  const [fullScreen, setFullScreen] = useState(false);
  const [showFlatpicker, setShowFlatpicker] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(new Date());
  const [sendText, setSendText] = useState('Send');
  const [isMergecodesModalOpen, setIsMergecodesModalOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [toType, setToType] = useState('email');
  const [smartlist, setSmartlist] = useState();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState(editorState);
  const [attachments, setAttachments] = useState([]);

  // ** Smartlist Select Option Values
  const selectSmartlistOptions = contactsStore.clientContacts.list?.map((client) => {
    return {
      value: client.email,
      label: client.fullName
    };
  });

  // ** Smartlist Select Option Components
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

  // ** Handle schedule or send
  const handleSchedule = () => {
    showFlatpicker
      ? setShowFlatpicker(false) & setSendText('Send')
      : setShowFlatpicker(true) & setSendText('Scheduled Send');
  };

  // ** Handle select FROM
  const handleToSelectFrom = (e) => {
    setFrom(e.target.value);
  };

  // ** Handle select to-type
  const handleSelectToType = (e) => {
    if (e.target.value === 'email') {
      setToType('email');
    } else {
      setToType('smartlist');
    }
  };

  // ** Handle select smartlist
  const handleSelectSmartlist = (e) => {
    setSmartlist(e.target.value);
  };

  // ** Handle smartlist
  const handleSmartlist = (e) => {
    setTo(Array.isArray(e) ? e.map((x) => x.value).toString() : '');
  };

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault();
    toggleCompose();
  };

  // ** Toggles Merge codes Modal
  const toggleMergecodesModal = () => setIsMergecodesModalOpen(!isMergecodesModalOpen);

  // ** Toggles Full Screen
  const toggleFullScreen = (e) => {
    e.preventDefault();
    setFullScreen(!fullScreen);
  };

  // ** Handle merge code
  const handleMergeCode = (code) => {
    const htmlContent = draftToHtml(convertToRaw(content.getCurrentContent()));
    const newBlock = htmlToDraft(`${htmlContent}<span> {${code}} </span>`);
    const newContent = ContentState.createFromBlockArray(newBlock.contentBlocks);
    setContent(EditorState.push(content, newContent, 'insert-characters'));
  };

  // ** Handle open file browser to select Geojson
  const openFileBrowser = () => {
    if (!fileRef) return;

    // @ts-ignore
    fileRef.current.click();
  };

  // ** Handle attachment
  const handleAttachment = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'general');
      useUploadDocument(formData).then((res) => {
        if (res?.success) {
          setAttachments((prev) => [...prev, res.uploadedDocuments]);
        }
      });
    };
  };

  // ** Submit email to send
  const onSubmit = async (e, emailType) => {
    e.preventDefault();
    toggleCompose('fetchData');

    if (emailType !== 'draft') {
      if (toType === 'smartlist' && to.length == 0) {
        toast.error('Please select email address');
        return;
      }

      if (!to) {
        toast.error('Please enter an email address');
        return;
      }

      if (!from) {
        toast.error('Please enter from email address');
        return;
      }

      if (!subject) {
        toast.error('Please enter subject');
        return;
      }
    }

    const payload = {
      toType,
      to: to,
      from: from,
      subject: subject,
      timestamp: new Date(scheduledTime).getTime(),
      scheduled: showFlatpicker,
      content: draftToHtml(convertToRaw(content.getCurrentContent())),
      emailType,
      mailId: metadata?._id,
      attachments
    };
    mutate(payload);
  };

  useEffect(() => {
    if (contactsStore?.relationshipContacts?.list?.length > 0) {
      setFrom(contactsStore.relationshipContacts.list[0].email.toLowerCase());
    }
  }, [contactsStore.relationshipContacts.list]);

  useEffect(() => {
    dispatch(listIdSet(smartlist));
  }, [smartlist, dispatch]);

  useEffect(() => {
    if (metadata) {
      setTo(metadata.to);
      setFrom(metadata.from);
      setSubject(metadata.subject);
      setContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(metadata.message).contentBlocks)
        )
      );
      setAttachments(metadata.attachments || []);
    } else {
      setTo('');
      setFrom('');
      setSubject('');
      setContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(initialContent).contentBlocks)
        )
      );
    }
  }, [metadata]);

  return (
    <>
      <div className="relative">
        <div>
          <Modal isOpen={isMergecodesModalOpen} toggle={toggleMergecodesModal}>
            <ModalBody>
              <ListGroup as="ol" flush numbered>
                {mergeCodes.map((code) => {
                  return (
                    <ListGroupItem onClick={() => handleMergeCode(code)}>{code}</ListGroupItem>
                  );
                })}
              </ListGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleMergecodesModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <input
            ref={fileRef}
            type="file"
            style={{ display: 'none' }}
            name="attach-email-item"
            id="attach-email-item"
            onChange={handleAttachment}
          />
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
                      <button type="button" className="btn btn-primary rounded-0">
                        Basic
                      </button>
                      <button type="button" className="btn btn-outline-primary rounded-0" disabled>
                        Builder
                      </button>
                    </Col>
                    <Col xl="3">
                      <Flatpickr
                        required
                        id="startDate"
                        name="startDate"
                        className={`form-control m-1 ${!showFlatpicker && 'd-none'}`}
                        onChange={(date) => setScheduledTime(date[0])}
                        value={scheduledTime}
                        options={{
                          enableTime: allDay === false,
                          dateFormat: 'Y-m-d h:i K'
                        }}
                      />
                    </Col>
                    <Col
                      xl="3"
                      className="py-2 px-2"
                      style={{
                        width: 'fit-content'
                      }}
                    >
                      <FormGroup switch>
                        <Label check>Scheduled</Label>
                        <Input type="switch" checked={showFlatpicker} onChange={handleSchedule} />
                      </FormGroup>
                    </Col>
                  </div>
                </Row>
                <Row className="px-1 mb-1">
                  <Col xl="4">
                    <div style={formGroupStyleOverrides}>
                      <Label for="exampleEmail" sm={2}>
                        From:
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="exampleEmail"
                          name="email"
                          type="select"
                          placeholder="Select email"
                          onChange={handleToSelectFrom}
                          value={from}
                        >
                          {contactsStore.relationshipContacts.list?.map((employee) => {
                            return (
                              <option value={employee.email.toLowerCase()}>
                                {employee.email.toLowerCase()}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                    </div>
                  </Col>
                  <Col xl="2">
                    <Input
                      id="to-type"
                      name="select"
                      type="select"
                      onChange={handleSelectToType}
                      value={toType}
                    >
                      <option value="smartlist">Smartlist</option>
                      <option value="email">Email</option>
                    </Input>
                  </Col>
                  <Col xl="5" className={`${toType == 'smartlist' && 'd-none'}`}>
                    <div style={formGroupStyleOverrides}>
                      <Label for="exampleEmail" sm={3}>
                        To Email
                      </Label>
                      <Col sm={11}>
                        <Input
                          id="exampleEmail"
                          name="email"
                          placeholder="Recipient's email"
                          type="email"
                          onChange={(e) => setTo(e.target.value)}
                        />
                      </Col>
                    </div>
                  </Col>
                  <Col xl="5" className={`${toType == 'email' && 'd-none'}`}>
                    <div className="d-flex align-items-start">
                      <div style={{ ...formGroupStyleOverrides, minWidth: '130px' }}>
                        <Label for="smartlistEmail">To:&nbsp;&nbsp;</Label>
                        <Input
                          id="smartlistEmail"
                          name="selectSmartlist"
                          type="select"
                          placeholder="Select Smartlist"
                          onChange={handleSelectSmartlist}
                          value={smartlist}
                        >
                          {smartlistStore.smartLists?.map((folderData, index) => {
                            return (
                              <option key={index} value={folderData._id}>
                                {folderData.name}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                      <div className="flex-grow-1">
                        <Select
                          isMulti
                          id="email-to"
                          isClearable={false}
                          theme={selectThemeColors}
                          options={selectSmartlistOptions}
                          className="react-select select-borderless"
                          classNamePrefix="select"
                          components={{
                            Option: SelectComponent
                          }}
                          placeholder="Select Contact"
                          onChange={handleSmartlist}
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
                <Input
                  id="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
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
                {attachments.length > 0 && (
                  <div className="email-attachement-list mt-1 p-1">
                    {attachments.map((attachment, index) => (
                      <Row key={index}>
                        <div className="align-items-center d-flex justify-content-start">
                          <h5 style={{ margin: 0, paddingRight: 10 }}>{attachment.name}</h5>
                          <div className="email-attachement-actions">
                            <Trash
                              size={14}
                              onClick={() => {
                                setAttachments(
                                  attachments.filter((item) => item.name !== attachment.name)
                                );
                              }}
                            />
                          </div>
                        </div>
                      </Row>
                    ))}
                  </div>
                )}
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
                      <DropdownItem
                        href="/"
                        tag="button"
                        onClick={(e) => {
                          onSubmit(e, 'draft');
                        }}
                        name="save-draft"
                      >
                        Save Draft
                      </DropdownItem>
                      <DropdownItem href="/" tag="a" onClick={togglePopUp}>
                        Save Template
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  <div className="email-attachement">
                    <Paperclip
                      className="cursor-pointer ms-50"
                      size={18}
                      onClick={openFileBrowser}
                    />
                  </div>
                  <div>
                    <TbArrowMerge
                      className="cursor-pointer ms-50"
                      onClick={toggleMergecodesModal}
                      size={18}
                    />
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
