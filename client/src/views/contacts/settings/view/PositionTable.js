import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import '@styles/react/apps/app-email.scss';
import { positionHeader } from './data';
import { Button, Card, CardHeader, CardTitle } from 'reactstrap';
import CreatePositionModal from '../modal/CreatePositionModal';
import DeleteModal from '../modal/DeleteModal';

import {
  getPositionsRequest,
  deletePositionRequest
} from '../store/actions';

function PositionTable() {
  const [positionModal, setPositionModal] = useState(false);
  const [editPositionId, setEditPositionId] = useState(null);
  const [showDelModal, setShowDelModal] = useState(false);
  const [deletePosId, setDeletePosId] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { data: positions } = useSelector(state => state.scheduleSetting.positions);

  const editPosition = posId => {
    setEditPositionId(posId);
    setPositionModal(!positionModal);
  }

  const deletePosition = posId => {
    setDeletePosId(posId);
    setShowDelModal(!showDelModal);
  }

  useEffect(() => {
    dispatch(
      getPositionsRequest({
        offset: currentPage,
        limit: rowsPerPage
      })
    )
  }, [dispatch])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-100 d-flex justify-content-end">
          <div>
            <Button color="primary" onClick={() => {
              setEditPositionId(null);
              setPositionModal(!positionModal);
            }}>
              Create Position
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <div className="react-dataTable">
        <DataTable
          className="react-dataTable"
          noHeader
          pagination
          columns={positionHeader(editPosition, deletePosition)}
          paginationPerPage={rowsPerPage}
          data={positions}
        />
      </div>
      <CreatePositionModal
        isOpen={positionModal}
        toggleModal={() => setPositionModal(!positionModal)}
        positionId={editPositionId}
      />
      <DeleteModal
        isOpen={showDelModal}
        toggle={() => setShowDelModal(!showDelModal)}
        action={() => {
          dispatch( deletePositionRequest( deletePosId ) );
          setShowDelModal(!showDelModal);
        }}
      />
    </Card>
  );
}

export default PositionTable;
