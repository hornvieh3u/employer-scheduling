import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddProductModal = (props) => {
  // ** Props
  const { centeredModal, setCenteredModal } = props;

  return (
    <>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Add New Category</ModalHeader>
        <ModalBody>
          <div>
            <Label className="form-label" for="nameMulti">
              Category Name
            </Label>
            <Input type="text" name="name" id="nameMulti" placeholder="Product Name" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setCenteredModal(!centeredModal)}>
            Save
          </Button>
          <Button color="danger" outline onClick={() => setCenteredModal(!centeredModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddProductModal;
