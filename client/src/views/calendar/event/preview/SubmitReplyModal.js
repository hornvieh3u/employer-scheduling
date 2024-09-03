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

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addUpdateGuests } from '../store'
import useMessage from '../../../../lib/useMessage'
const SubmitReplyModal = ({ modal, setModal, toggle, _id, guestInfo }) => {

    const { error, success } = useMessage();
    const dispatch = useDispatch();
    const [guestState, setGuestState] = useState({
        name: guestInfo?.guestName ? guestInfo.guestName : '',
        email: guestInfo?.guestEmail ? guestInfo.guestEmail : '',
        phone: '',
        status: 'yes',
    })

    const blockInvalidChar = (e) => ['+', '-'].includes(e.key) && e.preventDefault();

    // Get Radio Button Value
    const handleChange = (e) => {
        setGuestState((p) => ({ ...p, status: document.querySelector('input[name="status"]:checked').value }));
    }
    // Handle submit
    const handleSubmit = (event) => {

        event.preventDefault();
        let isNewEmployee = true;
        const { name, email, phone, status } = guestState;
        if (name === '') {
            error('full name must not be empty !');
            return;
        }
        if (email === '' || (email !== undefined && email !== '' && email.length < 11) || (email !== '' && email !== undefined && email.indexOf('@') == -1)) {
            error('enter a valid email');
            return;
        }
        if (phone === '' || (phone != '' && phone != undefined && phone.length < 8) || !isNaN) {
            error('enter a valid phone number');
            return;
        }
        if ((guestInfo.guestName !== undefined) || (guestInfo.guestInfo !== undefined)) isNewEmployee = false;
        dispatch(addUpdateGuests({ _id: _id, guestData: guestState, isNewEmployee: isNewEmployee }));
        success('Your reply successfully sent!');
        setGuestState({
            name: '',
            email: '',
            phone: '',
            status: 'yes'
        });
        setModal(false);
    }

    return (
        <form>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Please Reply</ModalHeader>
                <ModalBody>
                    <div className="mb-1">
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <Label className="form-label" for="position">
                                Name*
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={guestInfo.guestName ? guestInfo.guestName : ''}
                                disabled={guestInfo.guestName ? true : false}
                                placeholder="John Doe"
                                onChange={(e) => {
                                    setGuestState((p) => ({
                                        ...p,
                                        name: e.target.value
                                    }))
                                }} />
                            <Label className="form-label mt-2" for="position">
                                Email*
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                defaultValue={guestInfo.guestEmail ? guestInfo.guestEmail : ''}
                                disabled={guestInfo.guestEmail ? true : false}
                                placeholder="john@gmail.com"
                                onChange={(e) => {
                                    setGuestState((p) => ({
                                        ...p,
                                        email: e.target.value
                                    }))
                                }} />
                            <Label className="form-label mt-2" for="position">
                                Phone number*
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="1234567890"
                                onKeyDown={blockInvalidChar}
                                onChange={(e) => {
                                    setGuestState((p) => ({
                                        ...p,
                                        phone: e.target.value
                                    }))
                                }} />
                            <Label className="form-label mt-2" for="position">
                                Reply type*
                            </Label>
                            <div className="d-flex">
                                <input type="radio" id="yes" name="status" value="yes" onChange={handleChange} defaultChecked />
                                <label htmlFor="yes" className="ps-50 pe-1">Yes</label>
                                <input type="radio" id="no" name="status" value="no" onChange={handleChange} />
                                <label htmlFor="no" className="ps-50 pe-1">No</label>
                                <input type="radio" id="maybe" name="status" value="maybe" onChange={handleChange} />
                                <label htmlFor="maybe" className="ps-50 pe-1">Maybe</label>
                            </div>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="mt-1" color="primary" onClick={(e) => handleSubmit(e)}>
                        Submit
                    </Button>
                </ModalFooter>
            </Modal>

        </form>
    )
}

export default SubmitReplyModal
