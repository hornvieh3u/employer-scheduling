// ** React Imports
import { Link, useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Info, Plus } from 'react-feather';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, InputGroup, Input, Form } from 'reactstrap';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  GET_SCHEDULE_MAILS,
  UPDATE_EMAIL_CATEGORY,
  ADD_NEW_MAIN_FOLDER_EMAIL,
  GET_CATEGORIES_EMAIL
} from './store/email';
import FolderList from './components/FolderList';

const Sidebar = (props) => {
  // ** Props
  const { categoriesEmail } = props;
  const {
    store,
    sidebarOpen,
    toggleCompose,
    dispatch,
    getMails,
    resetSelectedMail,
    setSidebarOpen,
    subFolderActive,
    setSubFolderActive,
    setSubFolderActiveName,
    activeFolder,
    setActiveFolder
  } = props;
  const { GET_CATEGORIES_EMAIL, GET_SCHEDULE_MAILS, ADD_NEW_MAIN_FOLDER_EMAIL } = props;

  const [addFolderHide, setAddFolderHide] = useState(false);
  const [payload, setPayload] = useState(null);

  //Folder List
  const [editOrAddOrListTemplate, setEditOrAddOrListTemplate] = useState('add');
  const [viewTemplate, setViewTemplate] = useState(null);
  const [SweetAlertOpen, setSweetAlertOpen] = useState({
    actionId: null,
    folderType: '',
    open: false
  });

  const [folderUpdateDetails, setFolderUpdateDetails] = useState({
    folderId: null,
    folderName: '',
    isUpdateMain: false
  });

  // ** Vars
  const params = useParams();
  const handleNewFolderAdd = () => {
    setAddFolderHide(!addFolderHide);
  };
  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    dispatch(getMails({ ...store.params, folder }));
    dispatch(resetSelectedMail());
  };

  const handleLabel = (label) => {
    dispatch(getMails({ ...store.params, label }));
    dispatch(resetSelectedMail());
  };

  const handleComposeClick = () => {
    toggleCompose();
    setSidebarOpen(false);
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if ((params.folder && params.folder === value) || (params.label && params.label === value)) {
      return true;
    } else {
      return false;
    }
  };

  const DeleteFolder = (actionId, FolderType) => {
    setSweetAlertOpen({ actionId, FolderType, open: true });
  };
  const updateFolder = (actionId, folderName, value) => {
    setFolderUpdateDetails({
      ...folderUpdateDetails,
      folderId: actionId,
      folderName: value,
      isUpdateMain: true
    });
  };
  const handelUpdateFolder = (event, folderId = null) => {
    const value = event.target.value;
    if (folderId) {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderName: value,
        folderId: folderId
      });
    } else {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderName: value
      });
    }
  };
  const handleCloseForUpdate = (type) => {
    if (type === 'main') {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderId: null,
        folderName: '',
        isUpdateMain: false
      });
    } else {
      setFolderUpdateDetails({
        ...folderUpdateDetails,
        folderId: null,
        folderName: ''
      });
    }
  };
  const updateEmailFolder = (type) => {
    props.UPDATE_EMAIL_CATEGORY(
      '/email_nurturing',
      folderUpdateDetails.folderId,
      folderUpdateDetails.folderName,
      type
    );
    handleCloseForUpdate(type);
  };
  const GetMailsOfCurrentFolder = (UrlPath, folderId) => {
    GET_SCHEDULE_MAILS(UrlPath, folderId);
    setEditOrAddOrListTemplate('list');
  };

  useEffect(() => {
    GET_CATEGORIES_EMAIL('/email_nurturing'); // compose
  }, [GET_CATEGORIES_EMAIL]);

  const handleSaveFolder = (e) => {
    e.preventDefault();
    ADD_NEW_MAIN_FOLDER_EMAIL('/email_nurturing', payload);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setPayload({ [name]: value });
  };

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              {/*<Button className='compose-email' color='primary' block onClick={handleComposeClick}>*/}
              {/*    Compose*/}
              {/*</Button>*/}
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem
                  onClick={() => handleFolder('inbox')}
                  action
                  active={!Object.keys(params).length || handleActiveItem('inbox')}
                >
                  <Mail size={18} className="me-75" />
                  <span className="align-middle">Automation</span>
                </ListGroupItem>
                {/*<ListGroupItem*/}
                {/*    tag={Link}*/}
                {/*    to='/apps/email/sent'*/}
                {/*    onClick={() => handleFolder('sent')}*/}
                {/*    action*/}
                {/*    active={handleActiveItem('sent')}*/}
                {/*>*/}
                {/*    <Send size={18} className='me-75' />*/}
                {/*    <span className='align-middle'>Sent</span>*/}
                {/*</ListGroupItem>*/}
                {/*<ListGroupItem*/}
                {/*    tag={Link}*/}
                {/*    to='/apps/email/draft'*/}
                {/*    onClick={() => handleFolder('draft')}*/}
                {/*    action*/}
                {/*    active={handleActiveItem('draft')}*/}
                {/*>*/}
                {/*    <Info size={18} className='me-75' />*/}
                {/*    <span className='align-middle'>Scheduled</span>*/}
                {/*</ListGroupItem>*/}
              </ListGroup>
              <div className="mt-3 px-2 d-flex justify-content-between">
                <h6 className="section-label mb-1">Folders</h6>
                <Plus
                  className="cursor-pointer"
                  size={14}
                  onClick={() => setAddFolderHide(!addFolderHide)}
                />
              </div>
              {addFolderHide ? (
                <div className="m-2">
                  <Form>
                    <InputGroup>
                      <Input
                        onChange={handleChange}
                        placeholder={'Folder Name'}
                        required
                        name={'categoryName'}
                      />
                      <Button
                        type="submit"
                        color="primary"
                        outline
                        autoFocus
                        onClick={handleSaveFolder}
                      >
                        Add
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              ) : null}

              <FolderList
                activeFolder={activeFolder}
                setActiveFolder={setActiveFolder}
                setViewTemplate={setViewTemplate}
                subFolderActive={subFolderActive}
                setSubFolderActive={setSubFolderActive}
                setSubFolderActiveName={setSubFolderActiveName}
                DeleteFolder={DeleteFolder}
                folderName={folderUpdateDetails.folderName}
                updateFolder={updateFolder}
                handelUpdateFolder={handelUpdateFolder}
                handleCloseForUpdate={handleCloseForUpdate}
                updateEmailFolder={updateEmailFolder}
                GetMailsOfCurrentFolder={GetMailsOfCurrentFolder}
                FolderList={categoriesEmail}
              />
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    categoriesEmail: state.EmailMarketing.categoriesEmail
  };
};
export default connect(mapStateToProps, {
  GET_CATEGORIES_EMAIL,
  ADD_NEW_MAIN_FOLDER_EMAIL,
  GET_SCHEDULE_MAILS,
  UPDATE_EMAIL_CATEGORY
})(Sidebar);
