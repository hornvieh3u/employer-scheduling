import React from "react"
import { Modal, ModalBody, ModalHeader } from "reactstrap"

import NewProgressionWizard from "./NewProgressionWizard"

const AddProgression = (props) => {
    const { openAddProgression, setOpenAddProgression } = props

    return (
        <Modal
            isOpen={openAddProgression}
            toggle={() => setOpenAddProgression(false)}
            className="modal-dialog-centered"
            size="lg"
            style={{ maxWidth: '1200px', width: '100%' }}
        >
            <ModalHeader toggle={() => setOpenAddProgression(false)}>
                Add Progression
            </ModalHeader>
            <ModalBody>
                <NewProgressionWizard />
            </ModalBody>
        </Modal>
    )
}
export default AddProgression