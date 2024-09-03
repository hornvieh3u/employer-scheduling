import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap';
import { groupHeader } from './data';
import CreateGroupModal from '../modal/CreateGroupModal';
import DeleteModal from '../modal/DeleteModal';
import {
  getGroupsRequest,
  deleteGroupRequest
} from '../store/actions';

import '@styles/react/apps/app-email.scss';

function GroupTable() {

  const [groupModal, setGroupModal] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [deletingGroupId, setDeletingGroupId] = useState(false);
  const [showGroupDelModal, setShowGroupDelModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { data: groups } = useSelector((state) => state.scheduleSetting.groups);

  const editGroup = groupId => {
    setEditingGroupId(groupId);
    setGroupModal(!groupModal)
  };

  const deleteGroup = groupId => {
    setDeletingGroupId( groupId );
    setShowGroupDelModal(!showGroupDelModal);
  };

  useEffect(() => {
    dispatch(
      getGroupsRequest({
        offset: currentPage,
        limit: rowsPerPage
      })
    );
  }, [
    dispatch,
    currentPage,
    rowsPerPage
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-100 d-flex justify-content-end">
          <Button
            color="primary"
            onClick={() => {
              setEditingGroupId(null);
              setGroupModal(!groupModal)
            }}
          >
            Create Group
          </Button>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="react-dataTable">
            <DataTable
              className="react-dataTable"
              noHeader
              pagination
              columns={groupHeader(editGroup, deleteGroup)}
              paginationPerPage={rowsPerPage}
              data={groups}
            />
        </div>
      </CardBody>
      <CreateGroupModal
        isOpen={groupModal}
        toggleModal={() => setGroupModal(!groupModal)}
        groupId={editingGroupId}
      />
      <DeleteModal
        isOpen={showGroupDelModal}
        toggle={() => setShowGroupDelModal(!showGroupDelModal)}
        action={() => {
          dispatch( deleteGroupRequest( deletingGroupId ) );
          setShowGroupDelModal(!showGroupDelModal);
        }}
      />
    </Card>
  );
}

export default GroupTable;
