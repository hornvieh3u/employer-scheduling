// ** React Imports
import React, { useState } from 'react';
import { Trash2 } from 'react-feather';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { deleteAttendance, getAttendance } from './store';
import { useDispatch } from 'react-redux';

const StudentAttendanceAction = (props) => {
  const dispatch = useDispatch();
  const { classRow } = props;
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div>
      <div className="d-flex">
        <div className="cursor-pointer" onClick={() => setDeleteModal(true)}>
          <Trash2 size={16} style={{ color: '#625f6e', marginLeft: '5px' }} />
        </div>
      </div>
      <Modal
        toggle={() => setDeleteModal(false)}
        className="modal-dialog-centered"
        isOpen={deleteModal}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setDeleteModal((p) => !p)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h3 className="text-center mb-1">Are you sure to Delete ?</h3>
          <Row>
            <Col className="text-center mt-1" xs={12}>
              <Button className="mt-1 me-3" outline onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                //  disabled={deleteLoading}
                className="mt-1"
                color="primary"
                onClick={() => {
                  dispatch(deleteAttendance(classRow?._id));
                  if (classRow?.classId !== undefined && classRow?.classId !== '') {
                    dispatch(getAttendance(classRow?.classId));
                  }
                  setDeleteModal(false);
                }}
              >
                Confirm
              </Button>{' '}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StudentAttendanceAction;
