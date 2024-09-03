import React, { useState, useRef, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { customInterIceptors } from '../../../../lib/AxiosProvider';
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
    Row,
    Col
} from 'reactstrap'
import { FaUserAlt, FaUserFriends, FaUserTie, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getEventInfo } from '../store'
import useMessage from '../../../../lib/useMessage'
import { addContactAction as addEmployeeContactAction } from '../../../contacts/employee/store/actions';
import { addContactAction as addLeadContactAction } from '../../../contacts/leads/store/actions';
import { addContactAction as addRelationContactAction } from '../../../contacts/relationship/store/actions';
import { addContactAction as addVendorContactAction } from '../../../contacts/vendor/store/actions';
import { newClientContact as addClientContactAction } from '../../../contacts/client/store/actions';

// ** For Export 
import CSVReader from 'react-csv-reader';
import { CSVLink } from 'react-csv';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AddAllContactModal = ({ modal, setModal, toggle, selectedRows }) => {

    const { error, success } = useMessage();
    const API = customInterIceptors();
    const eventId = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const status = useSelector((state) => state);
    const [contactType, setContactType] = useState("");

    const contactClickHandler = (contact) => {
        let newMembers = [];
        if (contact == "employee") {
            selectedRows.forEach((item, index) => {
                dispatch(addEmployeeContactAction(item));
                if (status?.employeeContact.addEmployee.error) { error(`Adding ${item.email} failed!   ` + status?.employeeContact.addEmployee.error) } else { newMembers = [...newMembers, { ...item, category: "employee" }]; success(`Add ${item.email} to Employee Successfully`) };
            });
        } else if (contact == "lead") {
            selectedRows.forEach((item, index) => {
                dispatch(addLeadContactAction(item));
                if (status?.leadContact.addLead.error) { error(`Adding ${item.email} failed!   ` + status?.leadContact.addLead.error) } else { newMembers = [...newMembers, { ...item, category: "lead" }]; success(`Add ${item.email} to Lead Successfully`) };
            });
        } else if (contact == "relationship") {
            selectedRows.forEach((item, index) => {
                dispatch(addRelationContactAction(item));
                if (status?.relationshipContact.addLead.error) { error(`Adding ${item.email} failed!   ` + status?.relationshipContact.addLead.error) } else { newMembers = [...newMembers, { ...item, category: "relationship" }]; success(`Add ${item.email} to Relationship Successfully`) };
            });
        } else if (contact == "vendor") {
            selectedRows.forEach((item, index) => {
                dispatch(addVendorContactAction(item));
                if (status.vendorContact.addLead.error) { error(`Adding ${item.email} failed!   ` + status.vendorContact.addLead.error) } else { newMembers = [...newMembers, { ...item, category: "vendor" }]; success(`Add ${item.email} to Vendors Successfully`) };
            });
        } else if (contact == "client") {
            selectedRows.forEach((item, index) => {
                dispatch(addClientContactAction(item));
                if (status.clientContact.clientContact.error) { error(`Adding ${item.email} failed!   ` + status.clientContact.isClientContactErrors.error?.data.message) } else {
                    newMembers = [...newMembers, { ...item, category: "client" }]; success(`Add ${item.email} to Clients Successfully`)
                };
            });
        }

        const response = API.post(`event/add-guests`, {
            data: newMembers,
            _id: eventId.eventId,
            sendEmailChecked: false
        }).catch(function (error) {
            if (error.response) {
                return error.response;
            }
        });

        if (response.status == 404) {
            toast.error(response.data.msg);
            dispatch(setErrors(response.data));
        }
        setModal(false);
    }

    return (
        <form>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add these members to contact</ModalHeader>
                <ModalBody>
                    <div className="mb-3">
                        {
                            selectedRows.map((item, index) => {
                                return (
                                    <div className="d-flex align-items-center mt-1">
                                        <FaUserAlt size="20" />
                                        <h3 className="ms-1 mb-0 font-medium-1">{item.email}*</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <h3 className="text-primary font-small-4">*Choose Contacts*</h3>
                    <Row className="border-primary border-round rounded-3 pt-1 pb-1">
                        <Col md="12">
                            <Button color="primary w-100 mb-1" className="d-flex align-items-center justify-content-between" onClick={(e) => { setContactType("client"); contactClickHandler("client"); }} ><FaRegStar size="15" />Client<FaRegStar size="15" /></Button>
                        </Col>
                        <Col md="12">
                            <Button color="primary w-100 mb-1" className="d-flex align-items-center justify-content-between" onClick={(e) => { setContactType("lead"); contactClickHandler("lead"); }}><FaRegStar size="15" />Lead<FaRegStar size="15" /></Button>
                        </Col>
                        <Col md="12">
                            <Button color="primary w-100 mb-1" className="d-flex align-items-center justify-content-between" onClick={(e) => { setContactType("vendor"); contactClickHandler("vendor"); }}><FaRegStar size="15" />Vendor<FaRegStar size="15" /></Button>
                        </Col>
                        <Col md="12">
                            <Button color="primary w-100 mb-1" className="d-flex align-items-center justify-content-between" onClick={(e) => { setContactType("employee"); contactClickHandler("employee"); }}><FaRegStar size="15" />Employee<FaRegStar size="15" /></Button>
                        </Col>
                        <Col md="12">
                            <Button color="primary w-100" className="d-flex align-items-center justify-content-between" onClick={(e) => { setContactType("relationship"); contactClickHandler("relationship"); }}><FaRegStar size="15" />Relationship<FaRegStar size="15" /></Button>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </form>
    )
}

export default AddAllContactModal
