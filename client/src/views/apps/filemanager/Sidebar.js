// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Folder,
  UploadCloud,
  Star,
  Clock,
  Trash,
  FileText,
  Image,
  Video,
  Music,
  Layers,
  Server,
  X,
  Check
} from 'react-feather';

import Tree from './Tree';
// ** Reactstrap Imports
import {
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  Input
} from 'reactstrap';
import { useRef, useState } from 'react';
import { getUserData } from '../../../utility/Utils';
import { addNewFolder, uploadFile } from './store';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const TodoSidebar = (props) => {
  // ** Props
  const { handleTaskSidebar, setMainSidebar, mainSidebar, dispatch, getTasks, params } = props;

  // ** State
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');

  // ** Refs
  const fileUploadRef = useRef();
  const currentPath = useSelector((state) => state.filemanager.currentPath);

  // ** Functions To Handle List Item Filter
  const treeData = [
    {
      key: '0',
      label: 'My Driver',
      children: [
        {
          key: '0-0',
          label: 'photos',
          children: [
            {
              key: '0-1-1',
              label: 'image1.jpg'
            },
            {
              key: '0-1-2',
              label: 'image2.jpg'
            }
          ]
        }
      ]
    }
  ];
  const handleFilter = (filter) => {
    // dispatch(getTasks({ ...params, filter }))
  };

  const handleTag = (tag) => {
    // dispatch(getTasks({ ...params, tag }))
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if ((params.filter && params.filter === value) || (params.tag && params.tag === value)) {
      return true;
    } else {
      return false;
    }
  };

  // ** Functions To Handle Add Task Click
  const handleAddClick = () => {
    handleTaskSidebar();
    setMainSidebar();
  };

  const handleFileUpload = () => {
    fileUploadRef?.current?.click();
  };

  const handleChangeFile = async ({ file, id }) => {
    const form = new FormData();
    form.append('file', file);
    form.append('userId', getUserData().id);
    form.append('path', currentPath);
    const response = await dispatch(uploadFile(form));
    if (response) {
      toast.success('File uploaded successfully');
    }
  };

  const handleAddNewFolder = () => {
    dispatch(
      addNewFolder({
        path: currentPath,
        name: folderName
      })
    );
    setIsAddFolderModalOpen(false);
  };

  return (
    <div
      className={classnames('sidebar-left', {
        show: mainSidebar === true
      })}
    >
      <input
        type="file"
        onChange={(e) => {
          handleChangeFile({ file: e.target.files[0], id: 1 });
        }}
        hidden
        ref={fileUploadRef}
      />
      <div className="sidebar">
        <div className="sidebar-content todo-sidebar">
          <div className="todo-app-menu">
            <div className="add-task">
              <UncontrolledButtonDropdown className="w-100">
                <DropdownToggle color="primary" className="w-100 rounded">
                  Add New
                </DropdownToggle>
                <DropdownMenu className="w-100">
                  <DropdownItem className="w-100" onClick={() => setIsAddFolderModalOpen(true)}>
                    <Folder size={15} className="ms-1 me-1" />
                    New Folder
                  </DropdownItem>
                  <DropdownItem className="w-100" onClick={() => handleFileUpload()}>
                    <UploadCloud size={15} className="ms-1 me-1" />
                    FileUpload
                  </DropdownItem>
                  <DropdownItem className="w-100">
                    <UploadCloud size={15} className="ms-1 me-1" />
                    FolderUpload
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-filters">
                {/* <ListGroupItem
                // action
                // tag={Link}
                // to={'/filemanager'}
                // active={params.filter === '' && params.tag === ''}
                // onClick={() => handleFilter('')}
                >
                  <Tree treeData={treeData} />
                </ListGroupItem> */}
                <ListGroupItem
                  tag={Link}
                  to={'/filemanager/important'}
                  active={handleActiveItem('important')}
                  // onClick={() => handleFilter('important')}
                  action
                >
                  <Star className="me-75" size={18} />
                  <span className="align-middle">Important</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={'/filemanager/recents'}
                  active={handleActiveItem('recents')}
                  // onClick={() => handleFilter('recents')}
                  action
                >
                  <Clock className="me-75" size={18} />
                  <span className="align-middle">Recents</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={'/filemanager/deleted'}
                  active={handleActiveItem('deleted')}
                  // onClick={() => handleFilter('deleted')}
                  action
                >
                  <Trash className="me-75" size={18} />
                  <span className="align-middle">Deleted</span>
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3 px-2 d-flex justify-content-between">
                <h5 className="section-label mb-1">LABELS</h5>
              </div>
              <ListGroup className="list-group-labels">
                <ListGroupItem
                  active={handleActiveItem('team')}
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/filemanager/team"
                  // onClick={() => handleTag('team')}
                  action
                >
                  <FileText className="me-75" size={18} />
                  <span className="align-middle">Documents</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('low')}
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/filemanager/low"
                  // onClick={() => handleTag('low')}
                  action
                >
                  <Image className="me-75" size={18} />
                  <span className="align-middle">Images</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('medium')}
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/filemanager/medium"
                  // onClick={() => handleTag('medium')}
                  action
                >
                  <Video className="me-75" size={18} />
                  <span className="align-middle">Videos</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('high')}
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/filemanager/high"
                  // onClick={() => handleTag('high')}
                  action
                >
                  <Music className="me-75" size={18} />
                  <span className="align-middle">Audios</span>
                </ListGroupItem>
                <ListGroupItem
                  active={handleActiveItem('update')}
                  className="d-flex align-items-center"
                  tag={Link}
                  to="/filemanager/update"
                  // onClick={() => handleTag('update')}
                  action
                >
                  <Layers className="me-75" size={18} />
                  <span className="align-middle">Archives</span>
                </ListGroupItem>
              </ListGroup>
              <div className="mt-3 px-2 d-flex justify-content-between">
                <h5 className="section-label mb-1">STORAGE STATUS</h5>
              </div>
              <ListGroup className="list-group-labels mb-5">
                <ListGroupItem
                  // active={handleActiveItem('team')}
                  className="d-flex align-items-center"
                  // tag={Link}
                  // to='/filemanager/tag/team'
                  // onClick={() => handleTag('team')}
                  // action
                >
                  <Server className="me-75" size={28} />
                  <span className="align-middle">
                    <div>
                      <span>68GB used of 100GB</span>
                      <Progress className="progress-bar-primary" value={75} />
                    </div>
                  </span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
      <Modal isOpen={isAddFolderModalOpen} className="modal-dialog-centered">
        <ModalHeader toggle={() => setIsAddFolderModalOpen(!isAddFolderModalOpen)}>
          Add New Folder
        </ModalHeader>
        <ModalBody>
          <Input onChange={(e) => setFolderName(e.target.value)} />
          <div className="d-flex justify-content-between mt-2">
            <Button
              color="primary"
              className="btn-prev"
              onClick={() => setIsAddFolderModalOpen(false)}
            >
              <X size={14} className="align-middle me-sm-25 me-0"></X>
              <span className="align-middle d-sm-inline-block d-none">Cancel</span>
            </Button>
            <Button color="primary" className="btn-next" onClick={() => handleAddNewFolder()}>
              <span className="align-middle d-sm-inline-block d-none">Ok</span>
              <Check size={14} className="align-middle ms-sm-25 ms-0"></Check>
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TodoSidebar;
