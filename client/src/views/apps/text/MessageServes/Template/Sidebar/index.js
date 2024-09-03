import React, { Fragment, memo, useState } from 'react';
import { Button, Collapse, List, ListGroupItem, Nav, NavItem } from 'reactstrap';
import { BsFolder, BsFolder2Open } from 'react-icons/bs';
import { MdOutlineExpandMore, MdOutlineLock } from 'react-icons/md';
import { MoreVertical } from 'react-feather/dist';

import './style.scss'
import AddFolder from './CreateOrEditFolder/index'
import EditDeleteFolder from "./EditAndDeleteFolder";
import CreateAndEditSubFolder from './SubFolders/index'

function TextTemplateSidebar(props) {
  const { data } = props;
  const [activeMainFolder, setActiveMainFolder] = useState(null);
  const [activeSubMainFolder, setActiveSubMainFolder] = useState(null);
  const [openFolder, setOpenFolder] = useState(null);
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false);
  const [type, setType] = useState("");

  const handleMainFolder = (folder) => {
    setOpenFolder(!openFolder);
    setActiveMainFolder(folder);
    // props.MAIN_FOLDER_DATA(folder)
    setActiveSubMainFolder(null);
  };
  const handleSubFolder = (mainFolder, subFolder) => {
    setActiveSubMainFolder(subFolder);
    setActiveMainFolder(mainFolder);
    // props.SET_FOLDER_ID(mainFolder?._id, subFolder?._id);
    // props.LIST_TEMPLATES(subFolder?._id);
    // props.SUB_FOLDER_DATA(subFolder);
    // props.MAIN_FOLDER_DATA(mainFolder)
  };

  const handleDeleteFolder = () => {
    if (type === "folder") {
      props.REMOVE_FOLDER(null, activeMainFolder);
    } else {
      props.REMOVE_SUB_FOLDER(null, activeSubMainFolder);
    }
    setSweetAlertOpen(false);
  };

  const handleDeleteId = (type, folderid) => {
    setSweetAlertOpen(true);
    setType(type);
  };
  return (
    <Fragment>
      <Nav className="listWrapper px-1" vertical>
          <AddFolder />
        {data.map((item) => {
          return (
            <NavItem key={item?._id}>
              <div
                className={
                  `{activeSubMainFolder === null &&
                  activeMainFolder?._id === item?._id
                    ? "activeMainFolder"
                    : "inActiveFolder"} d-flex align-items-center justify-content-between pb-1`
                }
                onClick={() => {
                  setActiveMainFolder(item);
                }}
              >
                <div
                  className="d-flex gap-1"
                  fullWidth
                  onClick={() => {
                    handleMainFolder(item);
                  }}
                >
                  <BsFolder2Open size={16} />
                  <span className="f-subname text-capitalize">
                    {item?.folderName}
                  </span>
                </div>
                <div className='d-flex gap-1 align-items-center'>
                {item?.subFolder?.length > 0 ? (
                  <MdOutlineExpandMore size={16} />
                ) : (
                  <div className="ml-1"></div>
                )}
                {item?.adminId === undefined ? (
                  <EditDeleteFolder
                    editfolder={<AddFolder item={item} />}
                    OpenAlert={handleDeleteId}
                    item={item}
                    FolderType="folder"
                  />
                ) : (
                  <MdOutlineLock
                    size={16}
                    style={{ color: "#757575" }}
                  />
                )}
                </div>
              </div>
              <Collapse
                isOpen={openFolder && item?._id === activeMainFolder?._id}
              >
                <Nav vertical className='ml-1'>
                  {item?.subFolder?.map((subFolder) => {
                    return (
                      <div
                        onClick={() => {
                          handleSubFolder(item, subFolder);
                        }}
                        key={subFolder?._id}
                        className={
                          `{activeSubMainFolder?._id === subFolder?._id
                            ? "activeMainFolder"
                            : "inActiveFolder"} d-flex justify-content-between align-items-center pb-1`
                        }
                      >
                        <div className='d-flex'>
                          <div className="d-flex gap-1 f-subname">
                            <BsFolder size={16} />
                            <span className="f-subnam text-capitalize">
                              {subFolder?.subFolderName}
                            </span>
                          </div>
                        </div>
                        <div className='d-flex align-items-center gap-1'>
                        {item?.adminId === undefined ? (
                          <EditDeleteFolder
                            editfolder={
                              <CreateAndEditSubFolder
                                item={subFolder}
                                subFolder={subFolder}
                              />
                            }
                            OpenAlert={handleDeleteId}
                            item={subFolder}
                            FolderType="subfolder"
                          />
                        ) : (
                          <MdOutlineLock
                            size={16}
                            style={{ color: "#757575" }}
                          />
                        )}
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <CreateAndEditSubFolder mainFolder={item} />
                  </div>
                </Nav>
              </Collapse>
            </NavItem>
          );
        })}
        {/* <ConfirmationModal
          primaryColor="#0483fd"
          secondaryColor="#fff"
          imagePath="/images/delete.png"
          open={sweetAlertOpen}
          title="Delete file ?"
          onConfirm={handleDeleteFolder}
          onCancel={() => {
            setSweetAlertOpen(false);
          }}
          onCancelButtonTitle={"Cancel"}
          contiunuebuttonTitle={"Delete"}
          description=" Are you sure you want to delete?"
        /> */}
      </Nav>
    </Fragment>
  );
}

export default memo(TextTemplateSidebar);
