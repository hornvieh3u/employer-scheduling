// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ** Icons Imports
import { ChevronLeft, ChevronRight, MoreVertical, Share, UserPlus } from 'react-feather';
// ** Reactstrap Component Imports
import {
  Button,
  Col,
  Collapse,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
// ** Blank Avatar Image
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png';
// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';

import WorkspaceTitle from '../apps/workspace';

const WorkspaceTitleBar = (props) => {
  const { workspace, handleWorkspaceCollapse, collapse } = props;
  const [shareModalFlag, setShareModalFlag] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return {
      ...state.workspace
    };
  });

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      dispatch(getSelectedWorkspaceData(res.payload[0]._id));
    });
  }, [dispatch]);

  // ** Renders Collabrators
  const renderCollabrators = () => {
    const item = workspace.collabrators;
    if (item === undefined) return null;
    return item.length ? (
      <div>{item.length ? <AvatarGroup data={item} /> : null}</div>
    ) : (
      <Avatar img={blankAvatar} imgHeight="32" imgWidth="32" />
    );
  };

  const shareWorkspace = () => {};

  return (
    <div className="workspace-title">
      {collapse ? (
        <Button className="btn-icon" color="flat-dark" onClick={handleWorkspaceCollapse}>
          <ChevronRight size={14} />
        </Button>
      ) : null}
      <WorkspaceTitle workspace={workspace} dispatch={dispatch} />
      <div className="d-flex align-items-center">
        {renderCollabrators()}
        <Button
          color="flat-dark"
          className="d-flex"
          //   style={{ marginLeft: '10px', marginRight: '10px', padding: '0' }}
          onClick={shareWorkspace}
        >
          <UserPlus size={16} />
          <span className="align-middle ms-25">Share</span>
        </Button>
        <UncontrolledDropdown>
          <DropdownToggle
            className="hide-arrow me-1"
            tag="a"
            href="/"
            onClick={(e) => e.preventDefault()}
          >
            <MoreVertical className="text-body" size={16} />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-asc')}>
              About this workspace
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'title-desc')}>
              Change background
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'assignee')}>
              Upgrade
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, 'due-date')}>
              Activity
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => handleSort(e, '')}>
              More
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};

export default WorkspaceTitleBar;
