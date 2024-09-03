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
import PositionTableRow from './PositionTableRow'
import { useCreateNewVendorPosition, deleteVendorPositionRQ } from '../../../../requests/contacts/vendor-contacts'
import { toast } from 'react-toastify'

const AddPositionModal = ({
    modal,
    toggle,
    positions,
    newPositions,
    refetch
}) => {

    // pass new vendor positon data to the db
    const { mutate } = useCreateNewVendorPosition()

    // create new vendor position submit handler
    const handleSubmit = (e) => {
        e.preventDefault()

        const position = e.target.position.value
        const vendorPosition = { position: position }

        const isPositionExist = newPositions.find((p) => p.position.toLowerCase() === position.toLowerCase())

        if (isPositionExist) {
            e.target.reset()
            return toast.error("This position already exists")
        }

        else {
            mutate(vendorPosition)

            // refetch vendor position data
            setTimeout(() => {
                refetch()
            }, 300)
            e.target.reset()
        }
    }


    // Delete Vendor Position Modal state
    const [deleteModal, setDeleteModal] = useState({
        id: '',
        show: false
    })

    // delete vendor positon
    const deleteVendorPosition = (id) => {

        if (!id) {
            // modal toggle
            setDeleteModal({
                id: '',
                show: false
            })

            return toast.warning("It's a default position. You can't delete this")
        }

        deleteVendorPositionRQ(id)

        // modal toggle
        setDeleteModal({
            id: '',
            show: false
        })

        // refetch data
        setTimeout(() => {
            refetch()
        }, 300)
    }


    return (
        <>
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
                                        id={p._id}
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
                            deleteVendorPosition(deleteModal?.id)
                        }}
                    >
                        {/* {deleteLoading ? 'Deleting...' : 'Yes'} */}
                        Yes
                    </Button>{' '}
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AddPositionModal