import React, { memo, useState } from 'react';
import { Edit } from "react-feather";
import { connect } from "react-redux";
import { CardBody, FormGroup, Row, Col, Input, Form, Label, Tooltip, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
// import {
//   UPLOAD_TEMPLATE,
//   UPDATE_TEPLATE,
// } from "../../../../../../../../../redux/actions/marketing/text";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const subfolderdata = {
  "_id": "625af3954981c75b08c6c6de",
  "subFolderName": "checking",
  "userId": "606aea95a145ea2d26e0f1ab",
  "folderId": "625af1764981c75b08c6c6bc",
  "__v": 0
}

const listoftemplates = [
  {
    "_id": "625af3ff4981c75b08c6c6e4",
    "template_name": "testing temp",
    "text": "hdjshdushdshdjshdjsd",
    "subFolderId": "625af3954981c75b08c6c6de",
    "rootFolderId": "625af1764981c75b08c6c6bc",
    "userId": "606aea95a145ea2d26e0f1ab",
    "__v": 0
  },
  {
    "_id": "625dbe58c1794d1de0ffa1e4",
    "template_name": "test",
    "text": "hey bro!",
    "subFolderId": "625af3954981c75b08c6c6de",
    "rootFolderId": "625af1764981c75b08c6c6bc",
    "userId": "606aea95a145ea2d26e0f1ab",
    "__v": 0
  }
]

function EditTemplateModal(props) {
  const { item } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const [templateText, setTemplateText] = useState({ ...props.item });
  // const handlesubmit = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     template_name: templateText.template_name,
  //     text: templateText.text,
  //   };
  //   if (props.item) {
  //     props.UPDATE_TEPLATE(payload, listoftemplates._id, props.subFolderId);
  //   } else {
  //     props.UPLOAD_TEMPLATE(payload, props.rootFolderId, props.subFolderId);
  //   }
  //   setOpen(false);
  // };

  // const changeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setTemplateText({
  //     ...templateText,
  //     [name]: value,
  //   });
  // };

  if (!subfolderdata) {
    return null
  }

  return (
    <div>
      <Button
        color='primary'
        size="small"
        fontSize="16px"
        className="me-1 rounded"
        onClick={handleClickOpen}
      >
        Add Template
      </Button>
      <Modal
        isOpen={open}
        size='lg'
        toggle={() => handleClose()}
        centered
      >
        <ModalHeader>SMS Template</ModalHeader>
        <ModalBody>
          <CardBody>
            <Form className="mt-10" onSubmit={handleClose}>
              <Row>
                <Col sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      maxLength={30}
                      placeholder="Template name"
                      style={{ marginBottom: 8 }}
                      name={"template_name"}
                      className="full_height_Width"
                      defaultValue={listoftemplates.template_name}
                      // onChange={changeHandler}
                    />
                    <Input
                      id="smsText"
                      type="textarea"
                      rows={3}
                      defaultValue={listoftemplates.text}
                      placeholder="Type your message here..."
                      className="full_height_Width"
                      name={"text"}
                      // onChange={changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" className='d-flex justify-content-end'>
                  <FormGroup className="d-flex gap-2">
                    <Button
                      variant="outlined"
                      color='warning'
                      type="cancel"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={handleClose}
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default memo(EditTemplateModal);

