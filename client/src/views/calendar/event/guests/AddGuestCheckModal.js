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
    Form
} from 'reactstrap'

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { getEventInfo } from '../store'
import useMessage from '../../../../lib/useMessage'
import GuestsModalTableRow from './GuestsModalTableRow';
const AddGuestCheckModal = ({ modal, setModal, toggle, guestsData, setGuestsData }) => {

    const { error, success } = useMessage();
    const API = customInterIceptors();
    const eventId = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const eventInfo = useSelector((state) => state.event.eventInfo);
    const event = useSelector((state) => state.event);

    const addGuests = async () => {
        if (guestsData.length == 0) {
            toast.error('Select Guests!');
        } else {
            var inputs = document.querySelectorAll('input[name="isSendEmail"]'), sendEmailChecked = [];
            inputs.forEach((item, index) => {
                sendEmailChecked.push(inputs[index].checked);
            })
            const response = await API.post(`event/add-guests`, {
                data: guestsData,
                _id: eventId.eventId,
                sendEmailChecked: sendEmailChecked
            }).catch(function (error) {
                if (error.response) {
                    return error.response;
                }
            });

            if (response.status == 404) {
                toast.error(response.data.msg);
                dispatch(setErrors(response.data));
            }

            if (response.status == 200) {
                toast.success('OK! Guests added successfully');
                dispatch(getEventInfo(eventId.eventId));
                history.push(`/event-details/${eventId.eventId}`);
            }
        }
    }

    return (
        <form>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Invitation</ModalHeader>
                <ModalBody>
                    <div className="mb-1">
                        <Form onSubmit={(e) => e.preventDefault()}>

                            <h6 className="form-label mt-2 mb-2" for="position">
                                You are going to add these members to guests of this event.
                            </h6>
                            <h6 className="form-label mt-2 mb-2" for="position">
                                If you want to send invitation, please check next to email.
                            </h6>
                            {
                                guestsData.map((guest, index) => {
                                    return (<GuestsModalTableRow
                                        guest={guest}
                                    />)
                                })
                            }

                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="mt-1" color="primary" onClick={addGuests}>
                        Add Guests
                    </Button>
                </ModalFooter>
            </Modal>

        </form>
    )
}

export default AddGuestCheckModal
