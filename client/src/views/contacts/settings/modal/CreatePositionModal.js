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
    Col,
    Badge,
} from 'reactstrap';

import { Dribbble, Check } from 'react-feather';

import {
    createPositionRequest,
    updatePositionRequest,
} from "../store/actions";

import '@styles/react/apps/app-email.scss';

const colorData = [
    { hex: '#7367f0', color: 'primary' },
    { hex: '#82868b', color: 'secondary' },
    { hex: '#28c76f', color: 'success' },
    { hex: '#ea5455', color: 'danger' },
    { hex: '#ff9f43', color: 'warning' },
    { hex: '#00cfe8', color: 'info' },
    // { hex: '#a0a0d0', color: 'light-primary' },
    // { hex: '#a0a0a0', color: 'light-secondary' },
    // { hex: '#90d0b0', color: 'light-success' },
    // { hex: '#d08080', color: 'light-danger' },
    // { hex: '#ffc0a0', color: 'light-warning' },
    // { hex: '#40e0ff', color: 'light-info' }
];

function CreateGroupModal({isOpen, toggleModal, positionId}) {
    const [positionName, setPositionName] = useState('');
    const [positionColor, setPositionColor] = useState('');
    const [positionOrder, setPositionOrder] = useState(0);

    const dispatch = useDispatch();
    const { data: positions } = useSelector(state => state.scheduleSetting.positions);
    const handleSubmit = () => {
        if( positionId ) {
            dispatch(updatePositionRequest(positionId, {
                name: positionName,
                color: positionColor,
                order: positionOrder
            }))
        } else {
            dispatch(createPositionRequest({
                name: positionName,
                color: positionColor,
                order: positionOrder
            }))
        }

        toggleModal();
    }

    useEffect(() => {
        if( positionId ) {
            positions.forEach(position => {
                if( position._id == positionId ) {
                    setPositionName(position.name);
                    setPositionColor(position.color);
                    setPositionOrder(position.order);
                }
            });
        } else {
            setPositionName('');
            setPositionColor('');
            setPositionOrder(0);
        }
    }, [positionId])

    return (
        <Modal isOpen={isOpen} toggle={toggleModal} centered="centered">
            <ModalHeader toggle={toggleModal}>
                { !positionId ? 'Create New Position' : 'Update Position' }
            </ModalHeader>
            <ModalBody>
                <Form>
                    <div className="mb-1">
                        <Label for="positionName">Position Name <span className="text-danger">*</span></Label>
                        <Input type="text" alt="text" id="positionName" placeholder="Position Name" value={positionName} onChange={e => setPositionName(e.target.value)}/>
                    </div>
                    <div className="mb-1">
                        <Label for="positionColor">Color <span className="text-danger">*</span></Label>
                        <Row>
                            {colorData.map((item, index) => {
                                return (
                                    <Col xs="2" className="d-flex justify-content-center">
                                        <h3>
                                            <Badge
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setPositionColor(item.hex)}
                                                color={item.color}
                                                pill
                                            >
                                                {positionColor === item.hex ? (
                                                    <Check
                                                    size={14}
                                                    style={{
                                                        point: 'handler',
                                                        float: 'center',
                                                        margin: '2px 1px 0px 1px'
                                                    }}
                                                    />
                                                ) : (
                                                    <Dribbble
                                                    size={14}
                                                    style={{
                                                        point: 'handler',
                                                        float: 'center',
                                                        margin: '2px 1px 0px 1px'
                                                    }}
                                                    />
                                                )}
                                            </Badge>
                                        </h3>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                    <div className="mb-1">
                        <Label for="positionOrder">Order <span className="text-danger">*</span></Label>
                        <Input
                            type="number"
                            id="positionOrder"
                            placeholder="position order"
                            value={positionOrder}
                            onChange={e => setPositionOrder(e.target.value)}/>
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    { !positionId ? 'Create' : 'Update' }
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CreateGroupModal;
