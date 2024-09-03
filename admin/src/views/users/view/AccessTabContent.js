// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Table,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
} from "reactstrap";

const typesArr = [
  {
    title: "location name 1",
    defaultChecked: ["email"],
  },
  {
    title: "location Name 2",
    defaultChecked: ["browser", "app"],
  },
  {
    title: "location Name 3",
    defaultChecked: ["email", "browser", "app"],
  },
  {
    title: "location Name 4",
    defaultChecked: ["browser"],
  },
];

const AccessTabContent = () => {
  // ** States
  const [addAccessModal, setAddAccessModal] = useState(false);
  const [addLocationModal, setAddLocationModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="py-1">
          <CardTitle
            tag="h4"
            className="d-flex justify-content-center align-items-center"
          >
            Primary Store
            <div className="ms-1 table-rating">
              <span style={{ fontSize: 13 }}>1</span>
            </div>
          </CardTitle>
          <div className="d-flex">
            <div className="d-flex align-items-center mb-sm-0 mb-1">
              <Button
                color="primary"
                onClick={() => setAddLocationModal(!addLocationModal)}
              >
                Add Location
              </Button>
              <Modal
                isOpen={addLocationModal}
                toggle={() => setAddLocationModal(!addLocationModal)}
                className="modal-dialog-centered"
                // size="lg"
              >
                <ModalHeader
                  toggle={() => setAddLocationModal(!addLocationModal)}
                >
                  Add Primary Location
                </ModalHeader>
                <ModalBody>
                  <Label className="form-label" for="billingEmail">
                    Primary Location Name
                  </Label>
                  <Input type="text" placeholder="Location Name ..." />
                </ModalBody>
                <ModalFooter>
                  <Button type="button" className="mt-1 me-1" color="primary">
                    Save
                  </Button>

                  <Button className="mt-1" color="secondary" outline>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          quia distinctio asperiores deleniti sit earum similique. Ab at
          accusamus provident, deleniti amet eveniet dolores nemo fugiat
          deserunt, tempore, minima quasi!
          {/* <DataTable
                        noHeader
                        sortServer
                        columns={storeColumns}
                        responsive={true}
                        onSort={handleSort}
                        data={dataToRender()}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        defaultSortField="invoiceId"
                    /> */}
        </div>
      </Card>
      <Card>
        <CardHeader className="py-1">
          <CardTitle
            tag="h4"
            className="d-flex justify-content-center align-items-center"
          >
            Other Location Access
            <div className="ms-1 table-rating">
              <span style={{ fontSize: 13 }}>23</span>
            </div>
          </CardTitle>
          <div className="d-flex">
            <Button
              color="primary"
              onClick={() => setAddAccessModal(!addAccessModal)}
            >
              Add Access
            </Button>
            <Modal
              isOpen={addAccessModal}
              toggle={() => setAddAccessModal(!addAccessModal)}
              className="modal-dialog-centered"
              size="lg"
            >
              <ModalHeader toggle={() => setAddAccessModal(!addAccessModal)}>
                Add Additional Access
              </ModalHeader>
              <ModalBody>
                <div className="d-flex align-items-center mb-2">
                  <Input
                    id="search-invoice"
                    type="text"
                    placeholder="Search Location ..."
                  />
                </div>
                <Table
                  className="text-nowrap text-center border-bottom"
                  responsive
                >
                  <thead>
                    <tr>
                      <th className="text-start">Name</th>
                      <th>Read</th>
                      <th>Notes</th>
                      <th>Full Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typesArr.map((type, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-start">{type.title}</td>
                          <td>
                            <div className="d-flex form-check justify-content-center">
                              <Input
                                type="checkbox"
                                defaultChecked={type.defaultChecked.includes(
                                  "email"
                                )}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex form-check justify-content-center">
                              <Input
                                type="checkbox"
                                defaultChecked={type.defaultChecked.includes(
                                  "browser"
                                )}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex form-check justify-content-center">
                              <Input
                                type="checkbox"
                                defaultChecked={type.defaultChecked.includes(
                                  "app"
                                )}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Pagination className="d-flex justify-content-end mt-1">
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      4
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      5
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </ModalBody>
              <ModalFooter>
                <Button type="button" className="mt-1 me-1" color="primary">
                  Save Changes
                </Button>

                <Button className="mt-1" color="secondary" outline>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni minima
          qui, quasi dolor quae magnam ab fugiat, quis earum corrupti
          perferendis debitis. Voluptas expedita nemo ipsum fugit fugiat nam
          distinctio?
          {/* <DataTable
                        noHeader
                        sortServer
                        columns={storeColumns}
                        responsive={true}
                        onSort={handleSort}
                        data={dataToRender()}
                        sortIcon={<ChevronDown />}
                        className="react-dataTable"
                        defaultSortField="invoiceId"
                    /> */}
        </div>

        {/* <Modal
                    isOpen={editModal}
                    toggle={() => setEditModal(!editModal)}
                    className="modal-dialog-centered"
                >
                    <ModalHeader toggle={() => setEditModal(!editModal)}>
                        update Store
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm="12" className="mb-1">
                                <Label
                                    className="form-label"
                                    for="input-default"
                                >
                                    Address
                                </Label>
                                <Input
                                    type="text"
                                    id="input-default"
                                    placeholder="Type full address"
                                    value={editData.address}
                                    name="address"
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label
                                    className="form-label"
                                    for="input-default"
                                >
                                    Phone
                                </Label>
                                <Input
                                    type="text"
                                    id="input-default"
                                    placeholder="330-806-1981"
                                    name="phone"
                                    value={editData.phone}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label className="form-label" for="inputFile">
                                    Lease Start Date
                                </Label>
                                <Flatpickr
                                    className="form-control"
                                    id="default-picker"
                                    onChange={(date) => {
                                        setEditData((p) => ({
                                            ...p,
                                            startDate: date[0]
                                        }))
                                    }}
                                    value={editData.startDate}
                                    options={{ dateFormat: 'Y-m-d' }}
                                />
                            </Col>
                            <Col sm="12" className="mb-1">
                                <Label className="form-label" for="inputFile">
                                    Lease End Date
                                </Label>
                                <Flatpickr
                                    className="form-control"
                                    id="default-picker"
                                    onChange={(date) => {
                                        setEditData((p) => ({
                                            ...p,
                                            endDate: date[0]
                                        }))
                                    }}
                                    value={editData.endDate}
                                    options={{ dateFormat: 'Y-m-d' }}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={handleEditOther}
                            type="button"
                            className="mt-1 me-1"
                            color="primary"
                            disabled={updateLoading}
                        >
                            {updateLoading ? 'Loading...' : 'Save'}
                        </Button>

                        <Button
                            className="mt-1"
                            color="secondary"
                            outline
                            onClick={() => setEditModal(false)}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal> */}

        {/* <Modal
                    isOpen={deleteModal}
                    toggle={() => setDeleteModal((p) => !p)}
                    className="modal-dialog-centered"
                    // onClosed={onModalClosed}
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
                                    className="mt-1 me-1"
                                    color="secondary"
                                    outline
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="mt-1 "
                                    color="primary"
                                    // disabled={isDeleteLoading}
                                >
                                    {isDeleteLoading
                                        ? 'Deleting...'
                                        : 'confirm'}
                                </Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal> */}
      </Card>
    </>
  );
};

export default AccessTabContent;
