// ** React Imports
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Menu,
  Search,
  MoreVertical,
  List,
  Columns,
  Folder,
  ArrowDownCircle,
  Eye,
  Info,
  Trash,
  UserPlus,
  Edit,
  Copy,
  ArrowLeft,
  X,
  Check,
  FolderPlus,
  UploadCloud
} from 'react-feather';
import Sales from './Sales';
import FileItem from './FileItem';
import FolderItem from './FolderItem';
import ListItem from './ListItem';
import AddItem from './AddItem';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Input,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  addNewFolder,
  deleteFolder,
  getFileAndFolders,
  prevPath,
  renameFolder,
  uploadFile
} from './store';
import { getUserData } from '../../../utility/Utils';
import { toast } from 'react-toastify';

const Tasks = (props) => {
  // ** Props
  const {
    query,
    tasks,
    params,
    setSort,
    dispatch,
    getTasks,
    setQuery,
    updateTask,
    selectTask,
    reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar,
    drivers
  } = props;

  const [goalView, setGoalView] = useState('1');
  const [isRenameFolderOpen, setIsRenameModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [renamedFolder, setRenamedFolder] = useState();
  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    dispatch(selectTask(obj));
    handleTaskSidebar();
  };

  const data = useSelector((state) => state.todo.selectTasks);

  const files = useSelector((state) => state.filemanager.files);
  const folders = useSelector((state) => state.filemanager.folders);
  const currentPath = useSelector((state) => state.filemanager.currentPath);
  // ** Returns avatar color based on task tag
  const resolveAvatarVariant = (tags) => {
    if (tags.includes('high')) return 'light-primary';
    if (tags.includes('medium')) return 'light-warning';
    if (tags.includes('low')) return 'light-success';
    if (tags.includes('update')) return 'light-danger';
    if (tags.includes('team')) return 'light-info';
    return 'light-primary';
  };

  // ** Renders task tags
  const renderTags = (arr) => {
    const badgeColor = {
      team: 'light-primary',
      low: 'light-success',
      medium: 'light-warning',
      high: 'light-danger',
      update: 'light-info'
    };

    return arr.map((item) => (
      <Badge className="text-capitalize" key={item} color={badgeColor[item]} pill>
        {item}
      </Badge>
    ));
  };

  useEffect(() => {
    dispatch(getFileAndFolders(currentPath));
  }, [currentPath]);

  // ** Handler Functions

  const handleBack = () => {
    if (currentPath == '/') return;
    dispatch(prevPath());
  };

  const renderDrivers = () => {
    return (
      <Row className="match-height bg-white p-2">
        <Col lg="12" className="mb-1">
          Drivers
        </Col>
        {drivers.map((item) => {
          return (
            <Col lg="3" sm="12">
              <Sales item={item} />
            </Col>
          );
        })}
      </Row>
    );
  };
  const renderFolders = () => {
    const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const dispatch = useDispatch();
    const currentPath = useSelector((state) => state.filemanager.currentPath);

    const handleAddNewFolder = () => {
      dispatch(
        addNewFolder({
          path: currentPath,
          name: newFolderName
        })
      );
      setIsAddFolderModalOpen(false);
    };

    return (
      <Row className="match-height bg-white p-2">
        <Col lg="12" className="mb-1">
          Folders
        </Col>
        {folders.map((item) => {
          return (
            <Col md="6" lg="4" xl="3" sm="12">
              <FolderItem
                item={item}
                setIsRenameModalOpen={setIsRenameModalOpen}
                setRenamedFolder={setRenamedFolder}
                setFolderName={setFolderName}
              />
            </Col>
          );
        })}
        <Col md="6" lg="4" xl="3" sm="12">
          <Card
            className="h-70 shadow-none text-center border cursor-pointer d-flex justify-content-center align-items-center"
            onClick={() => setIsAddFolderModalOpen(true)}
          >
            <FolderPlus className="me-75 mt-3" size={30} />
            <Label className="mb-3">Add New Folder</Label>
          </Card>
        </Col>
        <Modal isOpen={isAddFolderModalOpen} className="modal-dialog-centered">
          <ModalHeader toggle={() => setIsAddFolderModalOpen(!isAddFolderModalOpen)}>
            Add New Folder
          </ModalHeader>
          <ModalBody>
            <Input onChange={(e) => setNewFolderName(e.target.value)} />
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
      </Row>
    );
  };

  const renderFiles = () => {
    const fileUploadRef = useRef();
    const dispatch = useDispatch();
    const currentPath = useSelector((state) => state.filemanager.currentPath);

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

    const handleFileUpload = () => {
      fileUploadRef?.current?.click();
    };

    return (
      <Row className="match-height bg-white p-2">
        <input
          type="file"
          onChange={(e) => {
            handleChangeFile({ file: e.target.files[0], id: 1 });
          }}
          hidden
          ref={fileUploadRef}
        />
        <Col lg="12" className="mb-1">
          Files
        </Col>
        {files.map((item) => {
          return (
            <Col md="6" lg="4" xl="3" sm="12">
              <FileItem item={item} />
            </Col>
          );
        })}
        <Col md="6" lg="4" xl="3" sm="12">
          <Card
            className="h-70 shadow-none text-center border cursor-pointer d-flex justify-content-center align-items-center"
            onClick={() => handleFileUpload()}
          >
            <UploadCloud className="me-75 mt-3" size={30} />
            <Label className="mb-3">Upload File</Label>
          </Card>
        </Col>
      </Row>
    );
  };
  const renderTasks = () => {
    return (
      <PerfectScrollbar
        className="list-group todo-task-list-wrapper"
        options={{ wheelPropagation: false }}
        // containerRef={ref => {
        //   if (ref) {
        //     ref._getBoundingClientRect = ref.getBoundingClientRect

        //     ref.getBoundingClientRect = () => {
        //       const original = ref._getBoundingClientRect()

        //       return { ...original, height: Math.floor(original.height) }
        //     }
        //   }
        // }}
      >
        <div className="d-flex align-items-center mt-2 ml-2">
          <div className="cursor-pointer mx-2" onClick={() => handleBack()}>
            {currentPath !== '/' ? <ArrowLeft size={20} /> : null}
          </div>
          <h5 className="ms-1 mb-0">MyDrive{currentPath.slice(0, -1)}</h5>
        </div>
        {/* {renderDrivers()} */}
        {goalView == 1 && renderFolders()}
        {goalView == 1 && renderFiles()}
        {goalView == 2 && <AddItem />}
        {goalView == 2 && (folders.length || files.length) ? (
          <ul className="todo-task-list bg-white p-2">
            {folders.concat(files).map((item) => {
              return <ListItem item={item} />;
            })}
          </ul>
        ) : (
          <div className="no-results show"></div>
        )}
      </PerfectScrollbar>
    );
  };

  // ** Function to getTasks based on search query
  const handleFilter = (e) => {
    setQuery(e.target.value);
    dispatch(getTasks(params));
  };

  // ** Function to getTasks based on sort
  const handleSort = (e, val) => {
    e.preventDefault();
    setSort(val);
    dispatch(getTasks({ ...params }));
  };

  const handleRenameFolder = () => {
    dispatch(renameFolder({ folderName: folderName, fileId: renamedFolder._id }));
    setIsRenameModalOpen(false);
  };

  return (
    <div className="todo-app-list">
      <div className="app-fixed-search d-flex align-items-center justify-content-between">
        <div className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1">
          <Menu size={21} />
        </div>
        <div className="d-flex align-content-center justify-content-between">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input placeholder="Search File..." />
          </InputGroup>
        </div>
        <div className="d-flex align-items-center">
          <div
            className={
              // data && data.length > 0
              'd-flex align-items-center justify-content-between w-30'
              // : 'invisible'
            }
          >
            <ArrowDownCircle size={15} className="me-50" />
            <Trash size={15} className="me-50" />
            <Info size={15} className="me-0" />
            <UncontrolledDropdown className="chart-dropdown ps-25 mt-50 pe-25">
              <DropdownToggle
                color=""
                className="bg-transparent ps-0 pe-0 ms-0 btn-sm border-0 pt-0"
              >
                <MoreVertical size={15} className="cursor-pointer pe-0" />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem className="w-100">
                  <Eye size={15} className="me-1" />
                  Preview
                </DropdownItem>
                <DropdownItem className="w-100">
                  <UserPlus size={15} className="me-1" />
                  Share
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy size={15} className="me-1" />
                  Make a copy
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="w-100">
                  <Edit size={15} className="me-1" />
                  Rename
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Info size={15} className="me-1" />
                  Info
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  <Trash size={15} className="me-1" />
                  Delete
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Info size={15} className="me-1" />
                  Report
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>

          <div class="btn-group view-toggle ms-50" role="group">
            <label
              class={
                goalView == 1
                  ? 'btn btn-outline-primary p-50 btn-sm active'
                  : 'btn btn-outline-primary p-50 btn-sm'
              }
              onClick={() => setGoalView(1)}
              for="gridView"
            >
              <Columns size={14} />
            </label>
            <label
              class={
                goalView == 2
                  ? 'btn btn-outline-primary p-50 btn-sm active'
                  : 'btn btn-outline-primary p-50 btn-sm'
              }
              onClick={() => setGoalView(2)}
              for="listView"
            >
              <List size={14} />
            </label>
          </div>
        </div>
        <Modal isOpen={isRenameFolderOpen} className="modal-dialog-centered">
          <ModalHeader toggle={() => setIsRenameModalOpen(!isRenameFolderOpen)}>
            Rename Folder
          </ModalHeader>
          <ModalBody>
            <Input value={folderName} onChange={(e) => setFolderName(e.target.value)} />
            <div className="d-flex justify-content-between mt-2">
              <Button
                color="primary"
                className="btn-prev"
                onClick={() => setIsAddFolderModalOpen(false)}
              >
                <X size={14} className="align-middle me-sm-25 me-0"></X>
                <span className="align-middle d-sm-inline-block d-none">Cancel</span>
              </Button>
              <Button color="primary" className="btn-next" onClick={() => handleRenameFolder()}>
                <span className="align-middle d-sm-inline-block d-none">Ok</span>
                <Check size={14} className="align-middle ms-sm-25 ms-0"></Check>
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
      {renderTasks()}
    </div>
  );
};

export default Tasks;
