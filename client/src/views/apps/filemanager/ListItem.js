// ** Third Party Components
import { MoreVertical, Folder, Eye, Info, Trash, UserPlus, Edit, Copy } from 'react-feather';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Input
} from 'reactstrap';
import { addSelectedTask, deleteSelectedTask, nextPath } from './store';
import { humanFileSize } from '../../../utility/Utils';
import { mergeDocument } from '../../contacts/client/store/api';
// const DocxMerger = require('docx-merger');
import DocxMerger from 'docx-merger';

const ListItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const selectTasks = useSelector((state) => state.filemanager.selectTasks);
  const selectedRows = useSelector((state) => state.filemanager.selectedRows);

  const dispatch = useDispatch();
  const onSetIsChecked = (status) => {
    setIsChecked(status);
    if (status) {
      dispatch(addSelectedTask(props.item.id));
    } else if (selectTasks.findIndex((index) => index == props.item.id) != -1) {
      dispatch(deleteSelectedTask(selectTasks.findIndex((index) => index == props.item.id)));
    }
  };

  const handleListItemClick = async () => {
    if (props.item.type === 'directory') dispatch(nextPath(props.item.filename));
    else if (props.isMerge) {
      const response = await mergeDocument({ url: props.item.url, replaceFields: selectedRows });
      if (response.status === 200) {
        const payload = response.data;
        const docx = new DocxMerger(
          {},
          payload.map((doc) => doc.data)
        );
        docx.save('blob', (data) => {
          saveAs(data, 'yourfilename.docx');
        });
        // return finalPDF
      }
    }
  };

  return (
    <Card
      className={
        isChecked
          ? 'shadow-none border cursor-pointer mb-1 border-primary'
          : 'shadow-none border cursor-pointer mb-1'
      }
    >
      <CardBody className="pb-1 pt-1">
        <Row>
          <Col xl="1">
            <div className="form-check form-check-inline">
              <Input
                type="checkbox"
                id="basic-cb-unchecked"
                defaultChecked={isChecked}
                onChange={() => onSetIsChecked(!isChecked)}
              />
            </div>
          </Col>
          <Col xl="6" onClick={() => handleListItemClick()}>
            {props.item.type === 'directory' ? (
              <Folder size={18} className="" />
            ) : (
              <img
                src={require('@src/assets/images/icons/doc.png').default}
                height={18}
                width={18}
              ></img>
            )}
            <span className="text-truncate ms-1">{props.item.filename}</span>
          </Col>
          <Col xl="2" onClick={() => handleListItemClick()}>
            <small className="text-muted">{humanFileSize(props.item.size)}</small>
          </Col>
          <Col xl="2" onClick={() => handleListItemClick()}>
            <small className="text-muted">{props.item.lastModified}</small>
          </Col>
          <Col xl="1">
            <UncontrolledDropdown className="chart-dropdown">
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
                <DropdownItem className="w-100">
                  <Edit size={15} className="me-1" />
                  Rename
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Info size={15} className="me-1" />
                  Info
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="w-100">
                  <Trash size={15} className="me-1" />
                  Delete
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Info size={15} className="me-1" />
                  Report
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ListItem;
