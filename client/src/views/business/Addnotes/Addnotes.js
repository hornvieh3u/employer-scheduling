import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { Eye, MoreVertical } from 'react-feather'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { MdAddIcCall } from 'react-icons/md';
import {
  Col, Form, FormGroup, Input, Label, Modal,
  ModalBody, ModalHeader, Row, UncontrolledDropdown,
  DropdownItem,
  Card,
  ModalFooter,
  Button
} from 'reactstrap'


const tabledata = []

const Addnotes = (props) => {
  const [open, setopen] = useState(false)
  const [open2, setopen2] = useState(false)
  const { className } = props
  return (
    <div>
      <div onClick={() => { setopen(true) }}>
        <Eye className="ficon" />
      </div>
      <Modal
        fullscreen='lg'
        size="lg"
        centered="true"
        scrollable="false"
        isOpen={open}
        toggle={() => { setopen(!open) }}
        style={{ maxWidth: "80rem " }}
        className={className}
      >
        <ModalHeader toggle={() => { setopen(!open) }}>Notes for Users</ModalHeader>
        <ModalBody>
          <Row>
            <Col xl="5" sm='12'>
              <Row>
                <Col xl="6">
                  <Card
                    style={{
                      width: '100',
                      boxShadow: "none"
                    }}
                  >
                    <img class="rounded"
                      alt="Sample"
                      src="https://picsum.photos/300/200"

                    />

                    <Button className='mt-2 color-primary' color="primary">
                      Add Appointment
                    </Button>
                  </Card>
                </Col>
                <Col xl='6' className="">
                  <div className='mb-1'>
                    <MdAddIcCall size={20} className="" />
                    <Label className='px-1'>516-543-9671 </Label>

                  </div>
                  <div className='mb-1'>
                    <AiOutlineMail size={20} />
                    <Label className='px-1'> N/A</Label>
                  </div>
                  <div>
                    <GoLocation size={20} className="mb-4" />
                    <Label className='px-1'>  1040 46th Road. <br />
                      long island city,<br />
                      NewYork-11101
                    </Label>

                  </div>
                  <p className='mx-2'>Primary Note : N/A</p>
                </Col>
                <Col xl="12">
                  <Form row>
                    <Row>
                      <span><b>New Note</b></span>
                      <Col md={6}>
                        <FormGroup >
                          <Label
                            for="exampleSelect"
                            sm={2}
                          >
                          </Label>
                          <Col sm={12}>
                            <Label for="exampleText">
                              <b>Follow Up Type</b>
                            </Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              placeholder='Select Notes'
                            >
                              <option selected> Select Notes</option>
                              <option>
                                1
                              </option>
                              <option>
                                2
                              </option>
                              <option>
                                3
                              </option>
                              <option>
                                4
                              </option>
                              <option>
                                5
                              </option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup >
                          <Label
                            for="exampleSelect"
                            sm={2}
                          >

                          </Label>
                          <Col sm={10}>
                            <Label for="exampleText">
                              <b>Response*</b>
                            </Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                            >
                              <option selected>Left Message</option>
                              <option>
                                1
                              </option>
                              <option>
                                2
                              </option>
                              <option>
                                3
                              </option>
                              <option>
                                4
                              </option>
                              <option>
                                5
                              </option>
                            </Input>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col xl="11">
                        <FormGroup>
                          <Label for="exampleText">
                            <b>Notes*</b>
                          </Label>
                          <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                          />
                        </FormGroup>

                      </Col>
                      <Col xl="11">
                        <div className='d-flex mt-0 justify-content-end'>
                          <button type="button" class="btn btn-primary">Save Notes</button>
                        </div>
                      </Col>

                    </Row>
                  </Form>
                </Col>
              </Row>

            </Col>
            <Col xl="7">
              <DataTable
                columns={columnsdata}
                data={tabledata}
                pagination

              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>

      <Modal
        fullscreen='md'
        size="sm"
        centered="true"
        scrollable="false"
        isOpen={open2} toggle={() => { setopen2(!open2) }} >
        <ModalHeader toggle={() => { setopen2(!open2) }}>Edit Note</ModalHeader>
        <ModalBody>

          <Col lg="12">
            <Form row>
              <Row>
                <Col md={6}>
                  <FormGroup >
                    <Label
                      for="exampleSelect"
                      sm={2}
                    >
                    </Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Follow Up Type</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        placeholder='Select Notes'
                      >
                        <option selected> Select Notes</option>
                        <option>
                          1
                        </option>
                        <option>
                          2
                        </option>
                        <option>
                          3
                        </option>
                        <option>
                          4
                        </option>
                        <option>
                          5
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup >
                    <Label
                      for="exampleSelect"
                      sm={2}
                    >

                    </Label>
                    <Col sm={12}>
                      <Label for="exampleText">
                        <b>Response*</b>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                      >
                        <option selected>Left Message</option>
                        <option>
                          1
                        </option>
                        <option>
                          2
                        </option>
                        <option>
                          3
                        </option>
                        <option>
                          4
                        </option>
                        <option>
                          5
                        </option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col xl="12">
                  <FormGroup>
                    <Label for="exampleText">
                      <b>Notes*</b>
                    </Label>
                    <Input
                      id="exampleText"
                      name="text"
                      type="textarea"
                    />
                  </FormGroup>

                </Col>
                <Col xl="12">
                  <div className='d-flex mt-0 justify-content-end'>
                    <button type="button" class="btn btn-primary" onClick={() => { setopen2(!open2) }}>Save Notes</button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Addnotes


const columnsdata = [
  {
    name: 'Date',
    selector: row => row.date,
  },
  {
    name: 'Note Type',
    selector: row => row.name,
  },
  {
    name: 'Follow up',
    selector: row => row.category,
  },
  {
    name: 'Note',
    selector: row => row.subcategory,
  },
  {
    name: 'Action',
    selector: row => row.mode,
    cell: (row) => <UncontrolledDropdown>
      <DropdownToggle tag="div" className="btn btn-sm">
        <MoreVertical
          size={14}
          className="cursor-pointer"
        />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          tag="span"
          // href="/"
          className="w-100"
          // onClick={(e) => {
          //     // e.preventDefault()
          //     // onDelete(row._id)
          //     setDeleteModal({
          //         id: row._id,
          //         show: true
          //     })
          // }}
          onClick={(e) => {
            e.preventDefault()
            // toggle2()
            // store.dispatch(deleteClientContact(row._id))
          }}
        >
          <FiEdit size={14} className="me-50" />
          <span className="align-middle">Edit</span>
        </DropdownItem>
        <DropdownItem
          tag="span"
          // href="/"
          className="w-100"
          onClick={(e) => {
            // e.preventDefault()
            // onDelete(row._id)
            // setDeleteModal({
            //     // id: row._id,
            //     show: true
            // })
          }}
        >
          <AiOutlineDelete size={14} className="me-50" />
          <span className="align-middle">Remove</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  },
]
