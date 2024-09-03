import React, { useState } from 'react';
import { ArrowRight } from 'react-feather';
import { AiOutlineCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { RiGroupLine } from 'react-icons/ri';
import {
  Button,
  Grid,
  Row,
  Col,
  IconButton,
  Input,
  CardImg,
  Card,
  InputGroup,
  InputGroupText,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function GroupNumber(props) {
  const { groupNumber } = props;
  const [modal, setModal] = useState(false);
  const [modalOne, setModalOne] = useState(false);
  const toggleOne = () => setModalOne(!modalOne);
  
  const closeBtn = (
    <Button
      onClick={toggleOne}    color = 'link' >
     <AiOutlineCloseCircle  size = '30'/>
    </Button>
  );

  const toggle = () => setModal(!modal);
  return (
    <div className="d-flex">
      <div className="p-2 flex-grow-1">
        {' '}
        <h3>{groupNumber}</h3>
      </div>
      {/* <div> */}
      <div style={{ marginRight: '14px' }} className="p-2">
        <Button
          // className="mr-50"
          // style={{
          //   color: '#6b6b6b',
          //   borderRadius: '4px',
          //   border: '1px solid #b8c2cc'
          // }}
          // color="success"
          outline
          // onClick={props?.handleClose}
        >
          Email Report
        </Button>
      </div>
      <div className="p-2">
        <Button
          // onClick={() => {
          //     handleSubmit();
          // }}
          onClick={toggle}
          className="ml-2"
          // style={{
          //   color: '#fff',
          //   background: '#0184FF',
          //   borderRadius: '4px'
          // }}
          color="primary"
        >
          Send Review Request
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}  
         close={closeBtn}
         >
          <div className='d-flex'>
          {/* <RiGroupLine size = '20'  /> */}
          <h3 className=''>Client Check In</h3>

          </div>
          
          {/* <p  className='text-muted'>Send a review request to the contact</p> */}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleAction">Customer Name</Label>
            <Input
              id="exampleAction"
              name="action"
              placeholder="Customer Name"
              type="text"
              autocomplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleAction">Customer email or phone</Label>
            <Col sm={12}>
              <Input id="exampleSelect" name="select" type="select">
                <option>Email</option>
                <option className='p-1'>Phone</option>
              </Input>
            </Col>
            {/* <Input id="exampleAction" name="action" placeholder="Send Review Request" type="text"  autocomplete="off" /> */}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            <span className="align-middle d-sm-inline-block d-none mr-1">Send</span>
            <AiOutlineSend size={14} className="align-middle ms-sm-25 ms-0"></AiOutlineSend>
            {/* Send
          <AiOutlineSend  size = '20'/> */}
          </Button>
        </ModalFooter>
      </Modal>
      {/* </div> */}
    </div>
  );
}

export default GroupNumber;
