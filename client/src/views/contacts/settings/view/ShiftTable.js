import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import '@styles/react/apps/app-email.scss';
import { shiftHeader } from './data';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { getShiftsRequest, deleteShiftRequest } from '../store/actions';
import CreateShiftModal from '../modal/CreateShiftModal';
import DeleteModal from '../modal/DeleteModal';

function ShiftTable() {

  const [shiftModal, setShiftModal] = useState(false);
  const [deleteShiftId, setDeleteShiftId] = useState('');
  const [editShiftId, setEditShiftId] = useState(null);
  const [showDelShiftModal, setShowDelShiftModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { data: shifts } = useSelector(state => state.scheduleSetting.shifts);

  const editShift = shiftId => {
    setEditShiftId(shiftId);
    setShiftModal(!shiftModal);
  }

  const deleteShift = shiftId => {
    setShowDelShiftModal(!showDelShiftModal);
    setDeleteShiftId(shiftId);
  }

  useEffect(() => {
    dispatch(
      getShiftsRequest({
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
              setEditShiftId(null)
              setShiftModal(!shiftModal);
            }}>Create Shift</Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="react-dataTable">
          <DataTable
            className="react-dataTable"
            noHeader
            pagination
            columns={shiftHeader(editShift, deleteShift)}
            paginationPerPage={rowsPerPage}
            data={shifts}
          />
        </div>
      </CardBody>
      <CreateShiftModal
        isOpen={shiftModal}
        toggleModal={() => setShiftModal(!shiftModal)}
        shiftId={editShiftId}
      />
      <DeleteModal
        isOpen={showDelShiftModal}
        toggle={() => setShowDelShiftModal(!showDelShiftModals)}
        action={() => {
          dispatch( deleteShiftRequest( deleteShiftId ) );
          setShowDelShiftModal(!showDelShiftModal);
        }}
      />
    </Card>
  );
}

export default ShiftTable;
