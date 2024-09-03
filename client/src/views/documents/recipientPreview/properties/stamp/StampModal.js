import React, { useContext, useState } from 'react';
import { Plus } from 'react-feather';
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { DocumentContext } from '../../../../../utility/context/Document';
import AddStampModal from './addStamp/AddStampModal';

export default function StampModal({ toggle, open, item }) {
  // ** States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [stampFocusClass, setstampFocusClass] = useState('');
  // ** Contexts
  const { stamps, setStamp, setStamps, setSelectedItem,hashcode,setBoard } = useContext(DocumentContext);

  // ** Functions
  const toggleAdd = () => {
    toggle();
    setIsAddOpen(!isAddOpen);
  };

  const handleSetStamp = (i) => {
    let temps = [];
    for (const item of stamps) {
      let temp = item;
      if (temp.id === i.id) {
        temp.isSelected = true;
      } else {
        temp.isSelected = false;
      }
      temps.push(temp);
    }
    setStamps(temps);
    setstampFocusClass('bg-primary text-light');
  };
  const handleShowStamp = () => {
    const stamp = stamps.find((x) => x.isSelected === true);
    setStamp(stamp);
    setSelectedItem(item);
    setBoard((board) =>
    board.map((b) => {
      let x = b;
      if (x.recipient.hashCode===hashcode && x.type === 'stamp') {
       
        x.isDone = true;
      }
      
      
      return x;
    }));
    toggle();
  };
  return (
    <>
      <Modal isOpen={open} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>My stamps</ModalHeader>
        <ModalBody>
          <Row>
            {stamps &&
              stamps.map((i, idx) => {
                return (
                  <Col md="3" key={idx}>
                    <Card
                      onClick={() => handleSetStamp(i)}
                      className={i.isSelected ? stampFocusClass : null}
                    >
                      <CardBody>
                        <img src={i.path} width="100%" />
                        <p className="text-center">{i.departmentName}</p>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
            <Col md="3">
              <Card>
                <CardBody>
                  <Button color="link" onClick={toggleAdd}>
                    <Plus size={35} />
                    <h6 className="pt-2 text-primary">Add New</h6>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="d-flex justify-content-start">
            <Button color="primary" className=" me-2" onClick={handleShowStamp}>
              <span className="align-middle d-sm-inline-block d-none">Adopt</span>
            </Button>
            <Button color="primary" outline onClick={toggle}>
              <span className="align-middle d-sm-inline-block d-none">Close</span>
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <AddStampModal open={isAddOpen} toggle={toggleAdd} />
    </>
  );
}
