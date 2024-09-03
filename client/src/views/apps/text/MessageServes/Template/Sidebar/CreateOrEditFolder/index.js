import React, { memo, useState } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Input,
  Card,
  CardBody,
  Form,
  FormGroup} from 'reactstrap';

function AddFolder(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='pb-1'>
      <Button color="primary" block onClick={handleClickOpen}>
        + ADD FOLDER
      </Button>
      <Modal isOpen={open} toggle={handleClose} centered>
        <ModalHeader>
          {props.item ? "Edit Folder" : "Add New Folder"}
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="mt-1" onSubmit={handleClose}>
                <Row>
                  <Col sm="12">
                    <FormGroup className="form-label-group">
                      <Input
                        type="text"
                        // defaultValue={state.folderName}
                        // onChange={(e) =>
                        //   setState({
                        //     ...state,
                        //     [e.target.name]: e.target.value,
                        //   })
                        // }
                        id="folderName"
                        placeholder="Folder Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="d-flex justify-content-between">
                      <Button
                        color="primary"
                        type="submit"
                        onClick={handleClose}
                      >
                        Save
                      </Button>
                      <Button
                        outline
                        color="warning"
                        type="reset"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default memo(AddFolder);
