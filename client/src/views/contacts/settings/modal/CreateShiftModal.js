import React, {useState, useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Button,
    Label,
    Form,
    ModalFooter,
    Row,
    Col
} from 'reactstrap';

import {
    createShiftRequest,
    updateShiftRequest
} from "../store/actions";

import '@styles/react/apps/app-email.scss';

function CreateShiftModal({ isOpen, toggleModal, shiftId }) {

    const [shift, setShift] = useState({
        title: '',
        startTime: '09:00',
        endTime: '17:00',
        note: '',
        date: ''
    });

    const dispatch = useDispatch();
    const { data: shifts } = useSelector(state => state.scheduleSetting.shifts);
    const handleSubmit = () => {
        if( shiftId ) {
            dispatch(updateShiftRequest(shiftId, shift));
        } else {
            dispatch(createShiftRequest(shift));
        }

        toggleModal();
    }

    useEffect(() => {
        if( shiftId ) {
            shifts.forEach(shift => {
                if( shift._id == shiftId ) {
                    setShift({
                        title: shift.title,
                        startTime: shift.startTime,
                        endTime: shift.endTime,
                        note: shift.note,
                    });
                }
            });
        } else {
            setShift({
                title: '',
                startTime: '09:00',
                endTime: '17:00',
                note: '',
                date: ''
            });
        }
    }, [shiftId]);

    return (
        <Modal isOpen={isOpen} toggle={() => toggleModal()} centered="centered">
            <ModalHeader toggle={() => toggleModal()}>
                {!shiftId ? 'Create New Shift' : 'Update Shift'}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <div className="mb-1">
                        <Label for="shiftTitle">Shift Title <span className="text-danger">*</span></Label>
                        <Input type="text" alt="text" id="shiftTitle" placeholder="Shift title" value={shift.title} onChange={e => setShift({...shift, title: e.target.value})}/>
                    </div>
                    <div className="mb-1">
                        <Row>
                            {
                                !shiftId ?
                                    <Col md={4}>
                                        <Label for="shiftDate">Open Date <span className="text-danger">*</span></Label>
                                        <Input
                                            type="date"
                                            id="shiftDate"
                                            value={shift.date}
                                            onChange={e => setShift({...shift, date: e.target.value})}
                                            disabled={shiftId ? true : false}
                                        />
                                    </Col>
                                    :
                                    ''
                            }
                            <Col md={shiftId ? 6 : 4}>
                                <Label for="shiftStartTime">Start Time <span className="text-danger">*</span></Label>
                                <Input
                                    type="time"
                                    id="shiftStartTime"
                                    value={shift.startTime}
                                    onChange={e => setShift({...shift, startTime: e.target.value})}/>
                            </Col>
                            <Col md={shiftId ? 6 : 4}>
                                <Label for="shiftEndTime">End Time <span className="text-danger">*</span></Label>
                                <Input
                                    type="time"
                                    id="shiftEndTime"
                                    value={shift.endTime}
                                    onChange={e => setShift({...shift, endTime: e.target.value})}/>
                            </Col>
                        </Row>
                    </div>
                    <div className="mb-1">
                        <Label for="shiftNote">Note</Label>
                        <Input
                            type="textarea"
                            id="shiftNote"
                            placeholder="shift order"
                            value={shift.note}
                            onChange={e => setShift({...shift, note: e.target.value})}/>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    {!shiftId ? 'Create' : 'Update'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CreateShiftModal;
