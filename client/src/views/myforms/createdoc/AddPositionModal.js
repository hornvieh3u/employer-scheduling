import React, { useState, useRef, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Table,
    Form
} from 'reactstrap'
import PositionTableRow from './PositionTableRow'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
    useCreateNewPosition,
    deleteEmployeePositionRQ
} from '../../../requests/contacts/employee-contacts'

const AddPositionModal = ({
    modal,
    setState,
    toggle,
    positionOptions,
    setPositionOptions,
    positions,
    positionsArray,
    refetch
}) => {
    // pass position data to db
    const { mutate } = useCreateNewPosition()

    // //validate position
    // const onlyPositions = () => {
    //     const newPositionsArray = [...positionsArray]
    //     positions?.map((position) => newPositionsArray.push(position.position))
    //     setPositionsArray(newPositionsArray)
    // }

    // useEffect(onlyPositions, [positions])

    //show position options
    const handleSubmit = (event) => {
        event.preventDefault()
        const position = event.target.position.value
        const lowerCasePositionArray = positionsArray?.map((position) => {
            return position.toLowerCase()
        })
        if (lowerCasePositionArray.includes(position.toLowerCase())) {
            toast.error('Position Already Exists')
        } else {
            if (position === '') {
                toast.error('Position Must Not Be Empty')
            } else {
                const employeePosition = { position: position.toLowerCase() }
                // console.log(event)
                mutate(employeePosition)
                event.target.reset()
                // toggle()

                // refetch
                setTimeout(() => {
                    refetch()
                }, 300)
            }
        }
    }

    // Delete client Position Modal state
    const [deleteModal, setDeleteModal] = useState({
        id: '',
        show: false
    })

    // delete  positon
    const deleteEmployeePosition = (id) => {
        deleteEmployeePositionRQ(id)

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
        <form>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Position</ModalHeader>
                <ModalBody>
                    <div className="mb-1">
                        <Form onSubmit={handleSubmit}>
                            <Label className="form-label" for="position">
                                New Position
                            </Label>
                            <div className="d-flex gap-2">
                                <Input
                                    style={{ width: '71%' }}
                                    id="position"
                                    name="position"
                                    placeholder="add new"
                                />
                                <Button type="submit" size="sm" color="primary">
                                    Add Position
                                </Button>
                            </div>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <h5
                        style={{
                            marginRight: 'auto',
                            marginTop: '7px',
                            marginBottom: '10px'
                        }}
                    >
                        Available Positions
                    </h5>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {positions?.map((p, i) => (
                                <PositionTableRow
                                    setDeleteModal={setDeleteModal}
                                    key={i + 1}
                                    i={i}
                                    positionId={p._id}
                                    position={p.position}
                                    refetch={refetch}
                                ></PositionTableRow>
                            ))}
                        </tbody>
                    </Table>

                    <Button className="mt-2" color="secondary" onClick={toggle}>
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
                        <h3>Confirm Delete?</h3>
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
                            deleteEmployeePosition(deleteModal?.id)
                        }}
                    >
                        {/* {deleteLoading ? 'Deleting...' : 'Yes'} */}
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </form>
    )
}

export default AddPositionModal
