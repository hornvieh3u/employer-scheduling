import React, { memo, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Label,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
} from "reactstrap";

const CreateAndEditSubFolder = (props) => {
  const [open, setOpen] = useState(props.item ? true : false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="pb-1">
      {props.item ? null : (
        <Button
          color="primary" block
          onClick={handleClickOpen}
        >
          + Add Subfolder
        </Button>
      )}

      <Modal
        isOpen={open} toggle={handleClose} centered
      >
        <ModalHeader>
          {props.item ? "Edit Sub Folder" : "Add New Sub Folder"}
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
                        // name="subFolderName"
                        // defaultValue={state.subFolderName}
                        // onChange={(e) =>
                        //   setState({
                        //     ...state,
                        //     [e.target.name]: e.target.value,
                        //   })
                        // }
                        id="subFolderName"
                        placeholder="Sub Folder Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="d-flex justify-content-between">
                      <Button
                        color="primary"
                        type="submit"
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
};

export default memo(CreateAndEditSubFolder);
