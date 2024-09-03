import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Table,
    Form,
} from 'reactstrap'

// import position table row
import PositionTableRow from './PositionTableRow'

// create new position request api function import
import { useCreateNewPosition, deleteClientPositionRQ } from '../../../../requests/contacts/client-contacts'

import { toast } from 'react-toastify'

const AddPositionModal = ({
    modal,
    setState,
    toggle,
    newPositions,
    positions,
    refetch
}) => {


    // =========================

    // Create New Position


    // pass client position data to db
    const { mutate } = useCreateNewPosition()


    // new client position data submit handler
    const handleSubmit = (event) => {
        event.preventDefault()

        const position = event.target.position.value
        const clientPosition = { position: position }

        const isPositionExist = newPositions.find((p) => p.position.toLowerCase() === position.toLowerCase())

        if (isPositionExist) {
            event.target.reset()
            return toast.error("This position already exists")
        }

        else {
            // pass data
            mutate(clientPosition)

            // refetch data
            setTimeout(() => {
                refetch()
            }, 300)

            event.target.reset()
        }
    }


    // ========================

    // Delete Position


    // Delete client Position Modal state
    const [deleteModal, setDeleteModal] = useState({
        id: '',
        show: false
    })

    // delete client positon handler
    const deleteClienPosition = (id) => {

        // We want no deletion of default positions

        if (!id) {
            // Hide Modal
            setDeleteModal({
                id: '',
                show: false
            })
            return toast.warning("It's a default position. You can't delete this")
        }

        // delete request
        deleteClientPositionRQ(id)

        // Hide Modal
        setDeleteModal({
            id: '',
            show: false
        })

        // refetch data
        setTimeout(() => {
            refetch()
        }, 100)
    }


    return (
        <form>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Position</ModalHeader>
                <ModalBody>
                    <div className="mb-1">
                        <Form onSubmit={handleSubmit}>
                            <Label className="form-label" for="position">
                                New Position
                            </Label>
                            <div className='d-flex gap-2'>
                                <Input
                                    style={{ width: "71%" }}
                                    id="position"
                                    name="position"
                                    placeholder="add new"
                                />
                                <Button
                                    type='submit'
                                    size='sm'
                                    color="primary"
                                >
                                    Add Position
                                </Button>
                            </div>
                        </Form>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <h5
                        style={{
                            marginRight: "auto",
                            marginTop: "7px", marginBottom: "10px"
                        }}>
                        Available Positions
                    </h5>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th style={{ width: "20%" }}>
                                    SL
                                </th>
                                <th style={{ width: "62%" }}>
                                    Position
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                newPositions?.map((p, i) =>
                                    <PositionTableRow
                                        refetch={refetch}
                                        setDeleteModal={setDeleteModal}
                                        key={i + 1}
                                        i={i}
                                        positionId={p._id}
                                        position={p.position}>
                                    </PositionTableRow>)
                            }
                        </tbody>
                    </Table>

                    <Button className='mt-2' color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>


            {/* Delete Modal */}

            <Modal
                toggle={() => {
                    setDeleteModal({
                        id: '',
                        show: false
                    })
                }}
                centered
                isOpen={deleteModal.show}
            >
                <ModalBody>
                    <div>
                        <h3>Are you sure to Delete ?</h3>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        size="sm"
                        onClick={() => {
                            setDeleteModal({
                                id: '',
                                show: false
                            })
                        }}
                    >
                        No
                    </Button>
                    <Button
                        // disabled={deleteLoading}
                        size="sm"
                        color="primary"
                        onClick={() => {
                            deleteClienPosition(deleteModal?.id)
                        }}
                    >
                        {/* {deleteLoading ? 'Deleting...' : 'Yes'} */}
                        Yes
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </form>
    )
}

export default AddPositionModal