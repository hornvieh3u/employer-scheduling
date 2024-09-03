import React, {useState} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from 'reactstrap';

function DeleteModal({ toggle, isOpen, action }) {
    return (
        <Modal
            toggle={toggle}
            centered
            isOpen={isOpen}
        >
            <ModalHeader toggle={toggle}>Are you sure to Delete ?</ModalHeader>
            <ModalFooter>
                <Button size='sm' color='secondary' onClick={toggle}>
                    No
                </Button>
                <Button size='sm' color='primary' onClick={action}>
                    Yes
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteModal;