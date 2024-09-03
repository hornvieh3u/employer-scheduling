// ** Components
import MembershipForm from './MembershipForm';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddCourseModal = (props) => {
  // ** Props
  const { centeredModal, setCenteredModal } = props;

  return (
    <>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Add New Course</ModalHeader>
        <ModalBody>
          <MembershipForm />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={() => setCenteredModal(!centeredModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddCourseModal;
