import React, { memo, useState } from 'react';
import { Edit, Trash } from "react-feather";
import { MoreVertical } from 'react-feather/dist';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

function EditDeleteFolder(props) {
  const [edit, setedit] = useState(false);
  const { item, OpenAlert } = props;

  const EditState = () => {
    setedit(true);
  };
  return (
    <UncontrolledDropdown>
      <DropdownToggle nav className='p-0'>
        <MoreVertical size={16} />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={EditState}>
          <Edit size={16} style={{ color: "#5aa65c", marginRight: "1em" }} />
          Edit
        </DropdownItem>
        <DropdownItem onClick={() => {
          OpenAlert(props.FolderType, item?._id);
        }}>
          <Trash style={{ color: "#e05252", marginRight: "1em" }} size={16} />{" "}
          Delete
        </DropdownItem>
      </DropdownMenu>
      {edit ? props.editfolder : null}
    </UncontrolledDropdown>
  );
};

export default memo(EditDeleteFolder);