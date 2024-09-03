import React, { Fragment, useState } from 'react';
import { ArrowRight, Star } from 'react-feather';
import { AiFillStar, AiOutlineCheck, AiOutlineCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { TiTick, TiTicket } from 'react-icons/ti';
import classnames from 'classnames';

import './index.css';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

function index() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState('#32a852')
  const [testimonial,setTestimonial]  = useState('Custmer Testimonial')
  
  const item = { rating: 3 };

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      return null;
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };
  function handleChangeOne(event) {
    setColor(event.target.value);
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeBtn = (
    <Button onClick={toggle} color="link">
      <AiOutlineCloseCircle size="30" />
    </Button>
  );
  return (
    <div className="overflow-hidden email-application">
      <Card className="p-1">
        <Row>
          <Col sm={2} md={2} lg={2}></Col>
          <Col sm={8} md={8} lg={8}></Col>
          <Col sm={2} md={2} lg={2} className="d-flex ">
            <Button className="ml-2" color="primary" onClick={toggle}>
              Send Review Invitation
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          <div className="d-flex">
            {/* <RiGroupLine size = '20'  /> */}
            <h3 className="">Client Check In</h3>
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
                <option className="p-1">Phone</option>
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

      <Card className="p-1">
        <Form>
          <FormGroup>
            <Label for="exampleEmail" className="mt-1">
              Review Link
            </Label>
            <Row>
              <Col xl="6">
                <Input></Input>
              </Col>
              <Col xl="6">
                <Button color="primary" outline>
                  Generate Link
                </Button>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <Button color="primary">
                  <TiTick color="white" size="22" />
                  Save
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </Card>

      <Card className="p-1">
        <Row>
          <Col xl="11">
            <h3>SMS Review Requests</h3>
          </Col>
          <Col xl="1">
            <Form>
              <FormGroup switch>
                <Input type="switch" role="switch" />
                <Label check></Label>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <div></div>
        <hr />
        <Row>
          <Col xl="6">
            <Row>
              <Col xl="10">
                {/* <div className='me-25'>
              <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
            </div> */}
                {/* <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Upload
                  <Input type='file' onChange={onChange} hidden accept='image/*' />
                </Button>
                <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Reset
                </Button>
                <p className='mb-0'>Allowed JPG, GIF or PNG. Max  size of 800kB</p>
              </div> */}
                <h4>Request with Image</h4>
                {image && (
                  <img src={image} alt="Generic placeholder image" height="200" width="200" />
                )}

                {/* <img className='rounded me-50'   src = '' alt='Generic placeholder image' height='200' width='200' /> */}
                <br />

                <Button
                  tag={Label}
                  className="mb-75 me-75 mt-1"
                  size="sm"
                  color="primary"
                  onChange={handleChange}
                >
                  Upload
                  <Input type="file" hidden accept="image/*" />
                </Button>
                <div className="me-25">
                  <div></div>
                </div>

                <p>SMS sent to User</p>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Message</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="message"
                  ></textarea>
                </div>
                <div className="mt-1">
                  <Button color="primary">
                    <TiTick color="white" size="22" />
                    Save
                  </Button>
                </div>
              </Col>
              <Col xl="2">
                <Form>
                  <FormGroup switch>
                    <Input type="switch" role="switch" />
                    <Label check></Label>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col className="border-start" xl="6">
            {' '}
            {image && (
              <div className="text-center m-2 p-2 rounded">
                <img src={image} alt="Generic placeholder image" height="600" width="500" />
              </div>
            )}
            {/* </div>
            </div> */}
          </Col>
        </Row>
      </Card>

      <Card className="p-1">
        <Row>
          <Col xl="11">
            <h3>Email Review Requests</h3>
          </Col>
          <Col xl="1">
            <Form>
              <FormGroup switch>
                <Input type="switch" role="switch" />
                <Label check></Label>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xl="6">
            <Row>
              <Col xl="10">
                <h4>Email Sent to the User</h4>
                {/* <p>Email Sent to the User</p> */}
                {/* <div class="form-group">
                  <label for="exampleFormControlTextarea1">Message</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="message"
                  ></textarea>
                </div> */}
                <Form>
                  <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="with a placeholder"
                      type="text"
                      autoComplete="off"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label for="exampleFormControlTextarea1">Title Color</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="message"
                    ></textarea>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleHeading">Positive Answer</Label>
                    <Input
                      id="exampleHeading"
                      name="password"
                      placeholder="Positive Answer"
                      type="text"
                    />
                  </FormGroup>
                </Form>
                <div className="mt-1">
                  <Button color="primary">
                    <TiTick color="white" size="22" />
                    Save
                  </Button>
                </div>
              </Col>
              <Col xl="2">
                <Form>
                  <FormGroup switch>
                    <Input type="switch" role="switch" />
                    <Label check></Label>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col className="border-start" xl="6">
            {' '}
            <h4>I am sury</h4>
          </Col>
        </Row>
      </Card>
      <Card className="p-1">
        <Row>
          <Col xl="11">
            <h3>Customize Review Widget</h3>
          </Col>
          <Col xl="1" className="d-none">
            <Form>
              <FormGroup switch>
                <Input type="switch" role="switch" />
                <Label check></Label>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xl="6">
            <Row>
              <Col xl="10">
                <h4>Review Widget Display</h4>
                {/* <p>Email Sent to the User</p> */}
                {/* <div class="form-group">
                  <label for="exampleFormControlTextarea1">Message</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="message"
                  ></textarea>
                </div> */}
                <Form>
                  <FormGroup>
                    <Label for="subject">Header Title</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Customer Testimonial"
                      type="text"
                      autoComplete="off"
                      // value = {testimonial}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleColor">Title Color</Label>
                    <Row>
                      <Col sm="5">
                        <Input
                          id="exampleColor"
                          name="color"
                          placeholder="color placeholder"
                          type="color"
                          value={color}
                          onChange={handleChangeOne}
                        />
                      </Col>
                      <Col sm="7"></Col>
                    </Row>
                  </FormGroup>
                  <FormGroup></FormGroup>
                  <FormGroup>
                    <Label for="exampleColor">Title Color</Label>
                    <Row>
                      <Col sm="5">
                        <Input
                          id="exampleColor"
                          name="color"
                          placeholder="color placeholder"
                          type="color"
                          value={color}
                          onChange={handleChangeOne}
                        />
                      </Col>
                      <Col sm="7"></Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleColor">Background Color</Label>
                    <Row>
                      <Col sm="5">
                        <Input
                          id="exampleColor"
                          name="color"
                          placeholder="color placeholder"
                          type="color"
                          value={color}
                          onChange={handleChangeOne}
                        />
                      </Col>
                      <Col sm="7"></Col>
                    </Row>
                  </FormGroup>
                </Form>
              </Col>
              <Col xl="2">
                <Form>
                  <FormGroup switch>
                    <Input type="switch" role="switch" />
                    <Label check></Label>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col className="border-start" xl="6">
            {/* <Row>
              <Col>
              <h1>suryasen</h1>
              </Col>
              <Col>
              <h1>suryasen</h1>
              </Col>


            </Row> */}

            <Card
              style={{
                width: '48rem'
              }}
            >
              <CardBody className="shadow-lg  m-5 p-2">
                <CardTitle tag="h5">Custmized Review</CardTitle>
                <hr />
                <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
                <CardText>
                  <div className="d-flex  fs-4 mt-3 m-1">
                    <div className=""> {testimonial}</div>
                    <div className=" d-flex justify-content-between ">
                      <div className="px-1">4</div>
                      <div className="item-rating ">
                        <ul className="unstyled-list list-inline">
                          {new Array(5).fill().map((listItem, index) => {
                            return (
                              <li key={index} className="ratings-list-item me-25">
                                {item.rating <= index ? (
                                  <Star
                                    className={classnames({
                                      'filled-star': index + 1 <= '3',
                                      'unfilled-star': index + 1 > '3'
                                    })}
                                  />
                                ) : (
                                  <AiFillStar size={26} style={{ color: '#ff9f43' }} />
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Card>
     
    </div>
  );
}

export default index;
