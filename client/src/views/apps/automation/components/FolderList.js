import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Collapse,
  Form,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Folder, ChevronDown } from 'react-feather';
import { ADD_NEW_SUB_FOLDER_EMAIL } from '../store/email';

function FolderSideBar(props) {
  const {
    FolderList,
    subFolderActive,
    setSubFolderActive,
    setSubFolderActiveName,
    activeFolder,
    setActiveFolder,
    GetMailsOfCurrentFolder,
    setViewTemplate
  } = props;
  const { ADD_NEW_SUB_FOLDER_EMAIL } = props;
  const [mainFolderId, setMainFolderId] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const handleOpenFolder = (folder) => {
    setOpenFolder(!openFolder);
    setMainFolderId(folder?._id);
    setActiveFolder(folder);
  };

  const activeSubFolder = (id, name) => {
    setViewTemplate(null);
    setSubFolderActive(id);
    setSubFolderActiveName(name);
    GetMailsOfCurrentFolder('/email_nurturing', id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setPayload({ [name]: value });
  };
  const handleSaveSubFolder = (e) => {
    e.preventDefault();
    ADD_NEW_SUB_FOLDER_EMAIL('/email_nurturing', payload, mainFolderId);
    setOpen(false);
  };

  return (
    <ListGroup tag="div" className="list-group-labels">
      {FolderList?.data?.map((folder) => {
        return (
          <Fragment key={folder?._id}>
            <ListGroupItem
              tag={Link}
              action
              key={folder?._id}
              active={activeFolder?._id === folder?._id ? true : false}
              onClick={() => {
                handleOpenFolder(folder);
              }}
            >
              {folder?.folder?.length > 0 ? (
                <ChevronDown size={18} className="me-75" />
              ) : (
                <div className="ml-1"></div>
              )}
              <Folder size={18} className="me-75" />
              <span className="f-subname">{folder?.categoryName}</span>
            </ListGroupItem>
            <Collapse isOpen={openFolder && activeFolder?._id === folder?._id}>
              {folder?.folder?.map((nestedFolder) => {
                return (
                  <ListGroupItem
                    style={{
                      backgroundColor:
                        subFolderActive === nestedFolder?._id ? 'rgb(104 160 225 / 9%)' : null
                    }}
                    key={nestedFolder?._id}
                    onClick={() => {
                      activeSubFolder(nestedFolder?._id, nestedFolder?.folderName);
                    }}
                  >
                    <Folder size={18} className="me-75" />
                    <span className="f-subnam">{nestedFolder?.folderName}</span>
                  </ListGroupItem>
                );
              })}
              <Button onClick={handleClickOpen} size="small" className={`m-1`}>
                + Add SubFolder
              </Button>
              <Modal isOpen={open} backdrop={'static'}>
                <Form>
                  <ModalHeader>Add Sub Folder</ModalHeader>
                  <ModalBody>
                    <Input
                      onChange={handleChange}
                      className="border rounded pl-1"
                      placeholder={'Sub Folder name'}
                      required
                      name={'folderName'}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" type="submit" onClick={handleSaveSubFolder} autoFocus>
                      Add Sub Folder
                    </Button>
                    <Button color="secondary" onClick={!open}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              </Modal>
            </Collapse>
          </Fragment>
        );
      })}
    </ListGroup>
  );
}

const mapStateToProps = (state) => {
  return {
    userinformation: state.userinfo?.userinformation
  };
};

export default connect(mapStateToProps, { ADD_NEW_SUB_FOLDER_EMAIL })(FolderSideBar);
