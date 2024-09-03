/* eslint-disable no-unused-vars */
import { ArrowLeft, ArrowRight, PlusCircle, Sun, User } from 'react-feather';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import AddEmpolye from './AddEmpolye';
import Wizard from '@components/wizard';
//icons
import { HiOutlineUsers } from 'react-icons/hi';
import {
  Row,
  Col,
  Badge,
  CardBody,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  InputGroup,
  Input,
  InputGroupText,
  Button
} from 'reactstrap';
import {
  Label,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  FormText,
  Modal
} from 'reactstrap';
import React, { useRef, useState } from 'react';
// import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import DayBottomToolBar from './DayBottomToolBar';
import { FcGoogle, FcSearch } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { IoFlagOutline } from 'react-icons/io5';
import { BsFlag } from 'react-icons/bs';
import { GrUserSettings } from 'react-icons/gr';
import { AiOutlineCloseCircle, AiOutlineHome } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

const days = [
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '12am',
  '1am'
];

function DayCalendar(props) {
  const {setIsVisible,isVisible} = props
  const [modal, setModal] = useState(false);
  const [modalOne, setModalOne] = useState(false);
  const history = useHistory();

  const toggle = () => setModal(!modal);
  const toggleOne   = () => setModalOne(!modalOne);
  const closeBtn = (
    <Button  onClick={toggle}    color = 'link' >
     <AiOutlineCloseCircle  size = '30'/>
    </Button>
  );
  const closeBtnOne = (
    <Button  onClick={toggleOne}    color = 'link' >
     <AiOutlineCloseCircle  size = '30'/>
    </Button>
  );



  const handleClick = () => {
    history.goBack();
  };
  return (
    <>
      <div className="w-100 shadow p-3 mb-5 bg-white rounded  ">
        <div className="p-2" style={{ textAlign: 'center' }}>
          <h1>Connect Suryaen's Pages</h1>
        </div>

        <div className="d-flex justify-content-center ">
          <div className=" d-flex">
            <Card
              style={{
                width: '18rem',
                height: '18rem'
              }}
              className="p-2  m-2 "
            >
              {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
              <div className="d-flex justify-content-center align-items-center h-100 w-100"
              
              onClick={toggle}
              >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <FaFacebook size={40} color="blue" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Facebook</CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Page or Group
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
            <Card
              style={{
                width: '18rem',
                height: '18rem'
              }}
              className="p-2  m-2 "
              onClick={toggleOne}
            >
              {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
              <div
                className="d-flex justify-content-center align-items-center h-100 w-100"
                >
                <div>
                  <div className="d-flex justify-content-center mb-1">
                    <FcGoogle size={40} color="blue" />
                  </div>
                  <div className="d-flex justify-content-center mb-1">
                    <CardTitle tag="h5">Google </CardTitle>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <CardSubtitle className="mb-1 text-muted" tag="h6">
                      Buisiness Location
                    </CardSubtitle>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="d-flex justify-content-between  mt-3 p-4">
          <Button color="primary" className="btn-prev"   onClick={()=>setIsVisible(!isVisible)}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next"   onClick={handleClick}>
            <span className="align-middle d-sm-inline-block d-none">Finish</span>
            {/* <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight> */}
          </Button>
        </div>
        <Modal
          isOpen={modal}
          toggle={toggle}
          fullscreen="xl"
          size="lg"
          centered="true"
          scrollable="false"
        >
          <ModalHeader toggle={toggle}  close={closeBtn}> 
            <div className="d-flex">
              <div  className='p-2'>
                {' '}
                <FaFacebook size={45} color="blue" />
              </div>
              <div  className='p-1'>
                <h3>Connect pages</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. */}
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <BsFlag size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Facebook</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Pages
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
                  <div
                    className="d-flex justify-content-center align-items-center h-100 w-100"
                    onClick={toggle}
                  >
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <HiOutlineUsers size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Facebook</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                          Groups
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={modalOne}
          toggle={toggleOne}
          fullscreen="xl"
          size="md"
          centered="true"
          scrollable="false"
        
        >
          <ModalHeader toggle={toggleOne}   close={closeBtnOne}> 
            <div className="d-flex">
              <div  className='p-2'>
                {' '}
                < FcGoogle size={45} color="blue" />
              </div>
              <div  className='p-1'>
                <h3>Connect Google</h3>
                <p>Select what type of pages you want to connect</p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. */}
            <div className="d-flex justify-content-center ">
              <div className=" d-flex">
                <Card
                  style={{
                    width: '18rem',
                    height: '18rem'
                  }}
                  className="p-2  m-2 "
                >
                  {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
                  <div className="d-flex justify-content-center align-items-center h-100 w-100">
                    <div>
                      <div className="d-flex justify-content-center mb-1">
                        <AiOutlineHome size={40} color="#6464dd" />
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <CardTitle tag="h5">Add Google</CardTitle>
                      </div>
                      <div className="d-flex justify-content-center ">
                        <CardSubtitle className="mb-1 text-muted" tag="h6">
                         Buisiness Profile
                        </CardSubtitle>
                      </div>
                    </div>
                  </div>
                </Card>
             
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleOne}>
              Connect Paages
            </Button>{' '}
            {/* <Button color="secondary" onClick={toggle}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
export default DayCalendar;

const data = [
  {
    id: 1,
    first_name: 'Sancho',
    last_name: 'Vautin',
    email: 'svautin0@yahoo.com',
    gender: 'Male',
    ip_address: '89.254.178.128'
  },
  {
    id: 2,
    first_name: 'Moshe',
    last_name: 'Haggar',
    email: 'mhaggar1@rakuten.co.jp',
    gender: 'Male',
    ip_address: '163.226.116.140'
  },
  {
    id: 3,
    first_name: 'Linus',
    last_name: 'McGiven',
    email: 'lmcgiven2@yahoo.com',
    gender: 'Male',
    ip_address: '43.48.178.43'
  },
  {
    id: 4,
    first_name: 'Sherie',
    last_name: 'Chasson',
    email: 'schasson3@parallels.com',
    gender: 'Female',
    ip_address: '220.61.179.138'
  },
  {
    id: 5,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  },
  {
    id: 6,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  }
];
