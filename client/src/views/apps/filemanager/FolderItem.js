// ** Third Party Components
import { MoreVertical, Folder, Eye, Info, Trash, UserPlus, Edit, Copy } from 'react-feather';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirm } from 'react-confirm-box';
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Label,
  Input
} from 'reactstrap';
import {
  addSelectedTask,
  deleteFolder,
  deleteSelectedTask,
  getFileAndFolders,
  nextPath
} from './store';

const FolderItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIshover] = useState(false);
  const selectTasks = useSelector((state) => state.filemanager.selectTasks);

  const currentPath = useSelector((state) => state.filemanager.currentPath);

  const dispatch = useDispatch();
  const onSetIsChecked = (status) => {
    setIsChecked(status);
    if (status) {
      dispatch(addSelectedTask(props.item.id));
    } else if (selectTasks.findIndex((index) => index == props.item.id) != -1) {
      dispatch(deleteSelectedTask(selectTasks.findIndex((index) => index == props.item.id)));
    }
  };

  const handleNextPath = async () => {
    // await dispatch(getFileAndFolders(currentPath + props.item.filename + "/"))
    await dispatch(nextPath(props.item.filename));
  };

  const handleRenameFolder = () => {
    props.setRenamedFolder(props.item);
    props.setFolderName(props.item.filename);
    props.setIsRenameModalOpen(true);
  };

  const handleDeleteFolder = async () => {
    const result = await confirm('Are you sure?', {
      closeOnOverlayClick: true,
      classNames: 'custom_confirm_box'
    });
    if (result) {
      dispatch(deleteFolder(props.item._id));
      return;
    }
  };

  return (
    <Card
      onMouseEnter={() => setIshover(true)}
      onMouseLeave={() => setIshover(false)}
      className={
        !isChecked
          ? 'shadow-none border cursor-pointer'
          : 'shadow-none border cursor-pointer border-primary'
      }
    >
      <CardHeader className="d-flex justify-content-between align-items-start pt-1 pb-0 pe-0 bg-light h-70">
        <div
          className={
            isChecked || isHover
              ? 'form-check form-check-inline'
              : 'invisible form-check form-check-inline'
          }
        >
          <Input
            type="checkbox"
            id="basic-cb-unchecked"
            defaultChecked={isChecked}
            onChange={() => onSetIsChecked(!isChecked)}
          />
        </div>
        <div className="bg-light text-center pb-2 pt-2" onClick={() => handleNextPath()}>
          <Folder className="me-75" size={30} />
        </div>
        <UncontrolledDropdown className={isChecked || isHover ? 'chart-dropdown' : 'invisible'}>
          <DropdownToggle color="" className="bg-transparent btn-sm border-0 pt-0">
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
            <DropdownItem className="w-100" onClick={() => handleRenameFolder()}>
              <Edit size={15} className="me-1" />
              Rename
            </DropdownItem>
            <DropdownItem className="w-100">
              <Info size={15} className="me-1" />
              Info
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem className="w-100" onClick={() => handleDeleteFolder()}>
              <Trash size={15} className="me-1" />
              Delete
            </DropdownItem>
            <DropdownItem className="w-100">
              <Info size={15} className="me-1" />
              Report
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>

      <CardBody className="pt-1 pb-0" onClick={() => handleNextPath()}>
        <div className="d-flex justify-content-between mb-50">
          <span className="text-truncate ts-2">{props.item.filename}</span>
          <small className="text-muted">{props.item.size}</small>
        </div>
        <small className="text-muted">{props.item.description}</small>
      </CardBody>
    </Card>
  );
};
export default FolderItem;
