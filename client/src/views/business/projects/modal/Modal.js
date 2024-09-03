/*    eslint-disable */

// ** React Imports
import React, { useState } from 'react';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const ProjectModal = ({
  title,
  toggle,
  label,
  labelFor,
  fieldName,
  fieldId,
  value,
  onChange,
  modal,
  onClick,
  addBody,
  addInputBody,
  saveButtonText,
  saveButtonColor
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      {addBody ? (
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for={labelFor}>{label}</Label>
              <Input type="text" name={fieldName} id={fieldId} value={value} onChange={onChange} />
            </FormGroup>
          </Form>
        </ModalBody>
      ) : addInputBody ? (
        <ModalBody>
          <Form>
            <FormGroup>
              <Input
                type="select"
                className="item-details"
                id="selectStatus"
                name="selectStatus"
                placeholder="Select Status"
                onChange={onChange}
              >
                <option value="">Select a type</option>
                <option value="people">People</option>
                <option value="timeline">Timeline</option>
                <option value="status">Status</option>
                <option value="text">Text</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
      ) : null}
      <ModalFooter>
        <Button color={saveButtonColor} size="sm" onClick={onClick}>
          {saveButtonText}
        </Button>{' '}
        <Button size="sm" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProjectModal;
