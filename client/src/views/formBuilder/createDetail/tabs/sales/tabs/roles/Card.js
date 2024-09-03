import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { Edit, Copy, Trash, Download, MoreVertical } from 'react-feather';
import { Link } from 'react-router-dom';
//**timeline component
import AvatarGroup from '@components/avatar-group';
// icons import 
import { FiUsers } from 'react-icons/fi';

function Card(props) {
  const { title, rank, icon } = props;

  return (
    <div className="card-body my-1">
      <div className="d-flex justify-content-between">
        {title}
          {icon}
      </div>
      <div className="d-flex justify-content-between">
        {rank}
        <div className="d-flex justify-content-center">
        </div>
      </div>
    </div>
  );
}

export default Card;
