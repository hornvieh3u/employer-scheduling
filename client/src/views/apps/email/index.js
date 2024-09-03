// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

// ** Email App Component Imports
import Mails from './Mails';
import Sidebar from './Sidebar';
import ComposePopUp from './ComposePopup';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { employeesContactsAction, clientContactsAction } from '../../contacts/store/actions';
import { getData } from '../../settings/tabs/advancesettings/store';
import {
  getMails,
  selectMail,
  updateMails,
  paginateMail,
  selectAllMail,
  updateMailLabel,
  resetSelectedMail,
  selectCurrentMail
} from './store';

import {
  GET_ALL_SECHEDULE_EMAIL,
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  UPDATE_EMAIL_CATEGORY,
  DELETE_MULTIPLE_TEMPLATE,
  GET_SENT_EMAILS,
  GET_ALL_SMART_LIST
} from './store/email';

import { connect } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-email.scss';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import AddTemplateModal from './components/AddTemplateModal';
import TemplateGraph from './components/TemplateGraph';
import Content from './Content';

const EmailApp = (props) => {
  // ** States
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [subFolderActiveName, setSubFolderActiveName] = useState(null);
  const [subFolderActive, setSubFolderActive] = useState(null);
  const [editOrAddOrListTemplate, setEditOrAddOrListTemplate] = useState('list');
  const [viewTemplate, setViewTemplate] = useState(null);
  const [mailsTODisplay, setMailsTODisplay] = useState([]);
  const [composePopUpMetaData, setComposePopUpMetaData] = useState(null);
  // ** Toggle Compose Function
  const toggleCompose = (purpose, data) => {
    if (purpose === 'edit') {
      setComposePopUpMetaData(data);
    } else if (purpose === 'fetchData') {
      dispatch(
        getMails({
          q: query || '',
          folder: params.folder || 'sent',
          label: params.label || ''
        })
      );
      setComposePopUpMetaData(null);
    }
    setComposeOpen(!composeOpen);
  };

  const { categoriesEmail, allScheduleMails, allSentEmails, allTypeOfScheduleEmails } = props;

  const MakeActionOnTemplate = () => {
    //setEditOrAddOrListTemplate("add")
    setOpen(!open);
  };
  const toggleModal = () => {
    setOpen(!open);
  };

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);
  const contactsStore = useSelector((state) => state.totalContacts);
  const smartlistStore = useSelector((state) => state.smartList);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  useEffect(() => {
    dispatch(
      getMails({
        q: query || '',
        folder: params.folder || 'inbox',
        label: params.label || ''
      })
    );
    dispatch(employeesContactsAction());
    dispatch(clientContactsAction());
    dispatch(getData());
  }, [query, params.folder, params.label, dispatch]);

  return (
    <Fragment>
      <Sidebar
        store={store}
        dispatch={dispatch}
        getMails={getMails}
        sidebarOpen={sidebarOpen}
        toggleCompose={toggleCompose}
        setSidebarOpen={setSidebarOpen}
        resetSelectedMail={resetSelectedMail}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
        subFolderActive={subFolderActive}
        setSubFolderActive={setSubFolderActive}
        setSubFolderActiveName={setSubFolderActiveName}
      />
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          {params.folder === 'template' ? (
            <div style={{ display: 'flex', flex: 1 }}>
              <div
                style={{
                  background: '#f6f8fa',
                  width: '100%',
                  overflow: 'auto'
                }}
              >
                <div className="d-flex flex-row justify-content-between px-2 pt-0">
                  <div className="row breadcrumbs-top p-0 ">
                    {activeFolder && (
                      <div className="col-12 pt-1">
                        <Breadcrumb tag="ol" className="p-0">
                          <BreadcrumbItem tag="li">{activeFolder?.categoryName}</BreadcrumbItem>
                          {subFolderActiveName && (
                            <BreadcrumbItem tag="li">{subFolderActiveName}</BreadcrumbItem>
                          )}
                        </Breadcrumb>
                      </div>
                    )}
                  </div>

                  {editOrAddOrListTemplate === 'list' && activeFolder !== null && (
                    <div className="pt-1">
                      <Button onClick={MakeActionOnTemplate}>{'Add Template'}</Button>
                      <Modal isOpen={open} toggle={toggle} centered={true} style={{ zIndex: 1 }}>
                        <ModalHeader toggle={toggle}>Add Template</ModalHeader>
                        <ModalBody>
                          <div className="">
                            <div>
                              <Row>
                                <Col sm="12" lg="12" md="12">
                                  <div className="mat-dialog-content add-section">
                                    <div className="action-list px-1 enable ng-star-inserted">
                                      <ul
                                        style={{
                                          listStyle: 'none',
                                          padding: '5px 0',
                                          margin: 0,
                                          display: 'flex',
                                          flexDirection: 'column'
                                        }}
                                      >
                                        <li
                                          style={{
                                            padding: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '5px 2px 10px',
                                            cursor: 'pointer',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '4px',
                                            background: 'hsla(0,0%,93.3%,.2)',
                                            '&:hover': {
                                              background: '#f0f0f0'
                                            }
                                          }}
                                        >
                                          <AddTemplateModal
                                            setViewTemplate={setViewTemplate}
                                            template={viewTemplate}
                                            type={'text'}
                                            FolderList={categoriesEmail}
                                            setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                            setMailsTODisplay={setMailsTODisplay}
                                            parentCallback={() => {
                                              setOpen(!open);
                                            }}
                                          />
                                        </li>
                                        <li
                                          style={{
                                            padding: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '5px 2px 10px',
                                            cursor: 'pointer',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '4px',
                                            background: 'hsla(0,0%,93.3%,.2)',
                                            '&:hover': {
                                              background: '#f0f0f0'
                                            }
                                          }}
                                        >
                                          <AddTemplateModal
                                            setViewTemplate={setViewTemplate}
                                            template={viewTemplate}
                                            type={'email'}
                                            FolderList={categoriesEmail}
                                            setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                                            setMailsTODisplay={setMailsTODisplay}
                                            parentCallback={() => {
                                              setOpen(!open);
                                            }}
                                          />
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                  )}
                </div>
                <Fragment>
                  <div style={{ overflow: 'hidden' }}>
                    {mailsTODisplay?.length > 0 ? (
                      <TemplateGraph setEditOrAddOrListTemplate={setEditOrAddOrListTemplate} />
                    ) : !activeFolder ? (
                      <div className="p-1 bg-white mt-0">
                        <Row container spacing={2} className="p-0 m-0">
                          <Col item sm={12} md={12} lg={12}>
                            <h4>TEMPLATE TUTORIAL</h4>
                            <p
                              className="p-1 pr-5"
                              style={{
                                background: '#eaf4fe'
                              }}
                            >
                              Template is a powerful tool designed to allow mymember users to
                              automate marketing campaigns. Campaigns are activated when system a
                              specific smartlist criteria is met. Set it and forget it! Watch the
                              videos below to use documents with ease!
                            </p>
                          </Col>
                          <Col item sm={12} md={4} lg={4}>
                            <Content
                              hedding={'ACTIVATE YOUR FIRST EMAIL'}
                              content={
                                (`Learn how to activate your first smartlist email. This email will`,
                                `"Send Immediately" upon the smartlist criteria being met.`)
                              }
                              link={'https://www.youtube.com/embed/bidOMaCs3vM'}
                            />
                          </Col>
                          <Col item sm={12} md={4} lg={4}>
                            <Content
                              hedding={'AUTOMATE ADDITIONAL EMAILS'}
                              content={
                                'Learn how to create additional emails to send after the first email is sent out. This set it and forget it feature will increase conversions and allow leads to be nurtured prior to them becoming a paid client.'
                              }
                              link={'https://www.youtube.com/embed/5RfLIC-3dzY'}
                            />
                          </Col>
                          <Col item sm={12} md={4} lg={4}>
                            <Content
                              hedding={'MANAGE YOUR CAMPAIGN'}
                              content={
                                'Learn how to edit, delete, and use our powerful drag and drop feature to change template sequences with ease.'
                              }
                              link={'https://www.youtube.com/embed/0NFRvVdmmE4'}
                            />
                          </Col>
                        </Row>
                      </div>
                    ) : activeFolder ? (
                      <TemplateGraph setEditOrAddOrListTemplate={setEditOrAddOrListTemplate} />
                    ) : (
                      <div className="d-flex justify-content-center flex-column w-100">
                        {/*<img src={'/images/no-doc-in-file.png'} alt='nodata'*/}
                        {/*     style={{*/}
                        {/*         height: '400px',*/}
                        {/*         objectFit: 'contain'*/}
                        {/*     }}*/}
                        {/*/>*/}
                        <div className="d-flex justify-content-center">
                          <h3>No item Found</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </Fragment>
              </div>
            </div>
          ) : (
            <Mails
              store={store}
              contactsStore={contactsStore}
              smartlistStore={smartlistStore}
              query={query}
              setQuery={setQuery}
              dispatch={dispatch}
              getMails={getMails}
              selectMail={selectMail}
              updateMails={updateMails}
              composeOpen={composeOpen}
              paginateMail={paginateMail}
              selectAllMail={selectAllMail}
              toggleCompose={toggleCompose}
              setSidebarOpen={setSidebarOpen}
              updateMailLabel={updateMailLabel}
              selectCurrentMail={selectCurrentMail}
              resetSelectedMail={resetSelectedMail}
              currentFolder={params.folder}
            />
          )}
        </div>
      </div>
      <ComposePopUp
        composeOpen={composeOpen}
        toggleCompose={toggleCompose}
        metadata={composePopUpMetaData}
        contactsStore={contactsStore}
        smartlistStore={smartlistStore}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesEmail: state.EmailMarketing.categoriesEmail,
    allScheduleMails: state.EmailMarketing.allScheduleMails,
    allTypeOfScheduleEmails: state.EmailMarketing.allScheduleEmails, // get all type of schedule emails
    allSentEmails: state.EmailMarketing.allSentEmails
  };
};

export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL,
  DELETE_SUB_FOLDER_EMAIL,
  DELETE_CATEGORY_EMAIL,
  GET_SCHEDULE_MAILS,
  DELETE_MULTIPLE_TEMPLATE,
  UPDATE_EMAIL_CATEGORY,
  GET_SENT_EMAILS,
  GET_ALL_SECHEDULE_EMAIL,
  GET_ALL_SMART_LIST
})(EmailApp);
