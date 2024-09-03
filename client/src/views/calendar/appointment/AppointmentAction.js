// ** React Imports
import React, { useState } from 'react'
import { Edit2, Trash2 } from 'react-feather'
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'


const AppointmentAction = () => {
    const [deleteModal, setDeleteModal] = useState(false)

    return (
        <div>
            <div className="d-flex">
                <div className="cursor-pointer"><Edit2 size={16} style={{ color: "#625f6e" }} /></div>
                <div className="cursor-pointer" onClick={() => setDeleteModal(true)}><Trash2 size={16} style={{ color: "#625f6e", marginLeft: "5px" }} /></div>
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
                    <h3 className="text-center mb-1">
                        Are you sure to Delete ?
                    </h3>
                    <Row>
                        <Col className="text-center mt-1" xs={12}>
                            <Button
                                className="mt-1 me-3"
                                outline
                                onClick={() => setDeleteModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                // disabled={deleteLoading}
                                className="mt-1"
                                color="primary"
                            // onClick={() => {
                            //     deleteClienPosition(deleteModal?.id)
                            // }}
                            >
                                Confirm
                            </Button>{' '}
                        </Col>
                    </Row>
                </ModalBody>

            </Modal>
        </div >

    )
}

export default AppointmentAction
