import React, {useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    Label,
    Form
} from 'reactstrap';
import Select from 'react-select';

import {
    createGroupRequest,
    updateGroupRequest,
} from '../store/actions';

// import '@styles/react/libs/react-select/_react-select.scss'
import { toast } from 'react-toastify';

function CreateGroupModal({ isOpen, toggleModal, groupId }) {

    const dispatch = useDispatch();
    const { data: groups } = useSelector(state => state.scheduleSetting.groups);
    const { data: positions } = useSelector(state => state.scheduleSetting.positions);

    const [groupName, setGroupName] = useState('');
    const [groupPositions, setGroupPositions] = useState([]);

    const [selectedPositions, setSelectedPositions] = useState([]);

    const handleSubmit = () => {
        if( groupName == '' ) {
            toast.error("Group name must not be empty!");
            return;
        }
        
        if( groupId ) {
            dispatch(updateGroupRequest(groupId, {
                name: groupName,
                positions: groupPositions
            }));
        } else {
            dispatch(createGroupRequest({
                name: groupName,
                positions: groupPositions
            }));
        }
            
        toggleModal();
    }

    useEffect(() => {
        if( groupId ) {
            groups.forEach(group => {
                if ( group._id == groupId ) {
                    setGroupName(group.name);
                    setGroupPositions(group.positions.map(pos => pos._id));
                    setSelectedPositions(group.positions.map(pos => ({ value: pos._id, label: pos.name })));
                }
            });
        } else {
            setGroupName('');
            setGroupPositions([]);
        }
    }, [groupId]);

    return (
        <Modal isOpen={isOpen} toggle={toggleModal} centered="centered">
            <ModalHeader toggle={toggleModal}>
                { !groupId ? 'Create New Group' : 'Update Group' }
            </ModalHeader>
            <ModalBody>
                <Form>
                    <div className="mb-1">
                        <Label for="groupName">Group Name <span className="text-danger">*</span></Label>
                        <Input type="text" alt="text" id="groupName" placeholder="Group Name" onChange={e => setGroupName(e.target.value)} value={groupName} />
                    </div>
                    <div className="mb-1">
                        <Label for="groupPositions">Positions</Label>
                        <Select
                            className="react-select"
                            classNamePrefix='select'
                            closeMenuOnSelect={false}
                            id="groupPositions"
                            isMulti
                            options={positions.map(position => ({ value: position._id, label: position.name }))}
                            onChange={selected => setGroupPositions(selected.map(pos => pos.value))}
                            defaultValue={selectedPositions}
                        />
                    </div>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => handleSubmit()}>
                    { !groupId ? 'Create' : 'Update' }
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CreateGroupModal;
