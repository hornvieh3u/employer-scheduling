import React from 'react'
import { Plus } from 'react-feather'
import { FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'reactstrap'
import { Input } from "reactstrap"

const CreateEvent = () => {
    const [open, setOpen] = React.useState(false)
    const [data, setdata] = React.useState([
        {
            employename: "",
            hourlywegas: "",
            rolestheyperform: "",
            phone: "",
            email: ""

        }
    ])
    const handleAddRow = () => {
        let copy = [...data]
        const item = {
            employename: "",
            hourlywegas: "",
            rolestheyperform: "",
            phone: "",
            email: ""

        }
        copy.push(item)
        setdata(copy)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <div>
            <div className="m-1">
                <button
                    className="btn btn-primary"
                    onClick={handleClickOpen}
                >
                   <Plus/>
                </button>
            </div>
            <Modal isOpen={open}
                size='xl'
            >
                <ModalHeader toggle={handleClose}>
                    Add Employees
                </ModalHeader>
                <ModalBody>
                    <p className='m-1'>
                        Add team members to Mad for Chicken Bayside location, assigned to BOH
                    </p>
                    <Row >
                        {data?.map(() => {
                            return (
                                <>
                                    <Col md="3" lg="3" sm="12">
                                        <FormGroup>
                                            <Label>Employee name</Label>
                                            <Input />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3" lg="3" sm="12">
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3" lg="2" sm="12">
                                        <FormGroup>
                                            <Label>Phone</Label>
                                            <Input />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3" lg="2" sm="12">
                                        <FormGroup>
                                            <Label>Hourly Wage</Label>
                                            <Input />
                                        </FormGroup>
                                    </Col>
                                    <Col md="3" lg="2" sm="12">
                                        <FormGroup>
                                            <Label>Roles they perform </Label>
                                            <Input />
                                        </FormGroup>
                                    </Col></>
                            )
                        })}

                    </Row>
                    <div className='d-flex justify-content-between'>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddRow}
                        >
                            Add another employee
                        </button>
                        <div>
                            <FormGroup check>
                                <Input type="checkbox" />
                                <Label check>
                                    Invite employees via email or phone
                                </Label>
                            </FormGroup>
                            <p>Only invited employees can access the schedule. </p>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                    >
                        Add Employee
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CreateEvent