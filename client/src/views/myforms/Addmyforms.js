import React, { useRef, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Wizard from '@components/wizard';
import { FileText, Image } from 'react-feather';
import Selectone from './Selectone';
import Selectform from './Selectform';
import EmployeeTaskCreate from './component/ModalView';

const Addmyforms = () => {
  const [open, setopen] = useState();
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);

  const steps = [
    {
      id: 'select-one',
      title: 'Select a form type',
      subtitle: 'select one option',
      icon: <FileText size={18} />,
      content: <Selectone stepper={stepper} />
    },
    {
      id: 'select-form',
      title: 'Choos From',
      subtitle: 'Add form to library',
      icon: <Image size={18} />,
      content: <Selectform />
    }
  ];

  const onDiscard = () => {
    setopen(false);
  };
  const toggle = () => {
    setopen(!open);
  };
  return (
    <>
      <Button color="primary" className="compose-email" block onClick={toggle}>
        Add Task
      </Button>
      <Modal
        isOpen={open}
        toggle={() => setopen(!open)}
        fullscreen="lg"
        size="lg"
        centered="true"
        scrollable="false"
      >
        <ModalHeader toggle={() => setopen(!open)}>Add Employee Task</ModalHeader>
        <ModalBody style={{ padding: 0 }}>
          <EmployeeTaskCreate />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Addmyforms;
