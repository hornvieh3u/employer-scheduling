import React from 'react'
import { Link, useParams } from 'react-router-dom'

import FilesTable from './FilesTable'
import SelectedFilesTable from './SelectedFilesTable'

import { Folder } from 'react-feather'

import {
    Badge,
    Button,
    Col,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap'

const FoldersModal = (props) => {
    const { foldersModal, setFoldersModal, toggle, active } = props
    return (
        <div>
            <Modal
                isOpen={foldersModal}
                className="modal-lg"
                toggle={() => setFoldersModal(!foldersModal)}
            >
                <ModalHeader toggle={() => setFoldersModal(!foldersModal)}>
                    Select Documents From Folders
                </ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                active={active === '1'}
                                onClick={() => {
                                    toggle('1')
                                }}
                            >
                                My Folders
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === '2'}
                                onClick={() => {
                                    toggle('2')
                                }}
                            >
                                Selected (12)
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className="py-50" activeTab={active}>
                        <TabPane tabId="1">
                            <Row>
                                <Col md={4}>
                                    <ListGroup
                                        tag="div"
                                        className="list-group-labels"
                                    >
                                        <ListGroupItem
                                            tag={Link}
                                            // to="/apps/email/label/personal"
                                            action
                                        >
                                            <Folder
                                                size={18}
                                                className="me-1"
                                            />
                                            Invoices
                                            <Badge
                                                className="float-end"
                                                color="light-primary"
                                                pill
                                            >
                                                7878
                                            </Badge>
                                        </ListGroupItem>
                                        <ListGroupItem
                                            tag={Link}
                                            // to="/apps/email/label/company"
                                            action
                                        >
                                            <Folder
                                                size={18}
                                                className="me-1"
                                            />
                                            Contracts
                                            <Badge
                                                className="float-end"
                                                color="light-primary"
                                                pill
                                            >
                                                234
                                            </Badge>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                                <Col md={8}>
                                    <FilesTable />
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <SelectedFilesTable />
                        </TabPane>
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => setFoldersModal(!foldersModal)}
                    >
                        Aplly Selected
                    </Button>
                    <Button
                        color="flat-danger"
                        onClick={() => setFoldersModal(!foldersModal)}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default FoldersModal
