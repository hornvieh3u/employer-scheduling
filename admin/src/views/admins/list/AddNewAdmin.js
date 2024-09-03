// ** React Imports
import { useState } from "react";

// ** Third Party Components
import { User, Briefcase, Mail, Phone, X, Lock } from "react-feather";
import Select from "react-select";

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

// ** Utils
import { selectThemeColors } from "@utils";

const AddNewAdmin = ({
  open,
  handleModal,
  admin,
  setAdmin,
  handleCreateAdmin,
}) => {
  // ** Custom close btn
  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleModal} />
  );

  const roleOptions = [
    { value: "", label: "Select type" },
    { value: "admin", label: "Admin" },
    { value: "staff", label: "Staff" },
  ];

  const onChange = (e) => {
    const { name, value } = e?.target;
    setAdmin((p) => ({ ...p, [name]: value }));
  };

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className="sidebar-sm"
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleModal}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">New Staff</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            Full Name
          </Label>
          <InputGroup>
            <InputGroupText>
              <User size={15} />
            </InputGroupText>
            <Input
              id="fullName"
              placeholder="Bruce Wayne"
              name="fullName"
              value={admin.fullName}
              onChange={onChange}
            />
          </InputGroup>
          admin
        </div>
        <div className="mb-1">
          <Label for="status-select">Role</Label>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={roleOptions}
            value={admin.adminType}
            onChange={(data) => {
              setAdmin((p) => ({ ...p, adminType: data }));
            }}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="email">
            Email
          </Label>
          <InputGroup>
            <InputGroupText>
              <Mail size={15} />
            </InputGroupText>
            <Input
              type="email"
              id="email"
              placeholder="brucewayne@email.com"
              name="email"
              value={admin.email}
              onChange={onChange}
            />
          </InputGroup>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="phone">
            Phone
          </Label>
          <InputGroup>
            <InputGroupText>
              <Phone size={15} />
            </InputGroupText>
            <Input
              type="number"
              id="phone"
              name="phone"
              value={admin.phone}
              onChange={onChange}
            />
          </InputGroup>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="password">
            Password
          </Label>
          <InputGroup>
            <InputGroupText>
              <Lock size={15} />
            </InputGroupText>
            <Input
              type="password"
              id="password"
              name="password"
              value={admin.password}
              onChange={onChange}
            />
          </InputGroup>
        </div>
        <Button className="me-1" color="primary" onClick={handleCreateAdmin}>
          Submit
        </Button>
        <Button color="secondary" onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default AddNewAdmin;
