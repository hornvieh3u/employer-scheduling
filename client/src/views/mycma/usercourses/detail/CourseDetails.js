// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ** Third Party Components
import axios from 'axios';
import classnames from 'classnames';

// ** Components
import Sidebar from './CourseSidebar';
import Avatar from '@components/avatar';

// ** Icons Impots
import { GiNotebook } from 'react-icons/gi';
import { FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { BsCalendar2Date, BsFillPlayCircleFill, BsInfoCircle } from 'react-icons/bs';
import { MdOutlineReviews, MdOutlineWatchLater } from 'react-icons/md';
import { GrResources } from 'react-icons/gr';
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
  Star,
  ShoppingCart,
  Heart,
  Youtube,
  Instagram
} from 'react-feather';

// ** Utils
import { kFormatter } from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  Input,
  Label,
  Button,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap';

// ** Styles
import '@styles/base/pages/page-blog.scss';

// ** Images
import cmtImg from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import { AiFillLock } from 'react-icons/ai';

const Course = (props) => {
  // ** Props
  const {
    data: cartData,
    deleteWishlistItem,
    dispatch,
    addToWishlist,
    getProduct,
    productId,
    addToCart
  } = props;

  // ** State
  const [data, setData] = useState(null);
  const [active, setActive] = useState('1');
  const [open, setOpen] = useState('');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const toggleAccordion = (id) => {
    open === id ? setOpen() : setOpen(id);
  };

  useEffect(() => {
    axios.get('/blog/list/data/detail').then((res) => setData(res.data));
  }, []);

  const badgeColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  };

  const renderTags = () => {
    return data.blog.tags.map((tag, index) => {
      return (
        <a key={index} href="/" onClick={(e) => e.preventDefault()}>
          <Badge
            className={classnames({
              'me-50': index !== data.blog.tags.length - 1
            })}
            color={badgeColorsArr[tag]}
            pill
          >
            {tag}
          </Badge>
        </a>
      );
    });
  };

  const renderComments = () => {
    return data.comments.map((comment) => {
      return (
        <Card className="mb-3" key={comment.userFullName}>
          <CardBody>
            <div className="d-flex">
              <div>
                <Avatar className="me-75" img={comment.avatar} imgHeight="38" imgWidth="38" />
              </div>
              <div>
                <h6 className="fw-bolder mb-25">{comment.userFullName}</h6>
                <CardText>{comment.commentedAt}</CardText>
                <CardText>{comment.commentText}</CardText>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <div className="d-inline-flex align-items-center">
                    <CornerUpLeft size={18} className="me-50" />
                    <span>Reply</span>
                  </div>
                </a>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    });
  };

  // ** Handle Wishlist item toggle
  const handleWishlist = (val) => {
    if (val) {
      dispatch(deleteWishlistItem(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
    dispatch(getProduct(productId));
  };

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id));
    }
    dispatch(getProduct(productId));
  };

  // ** Condition btn tag
  const CartBtnTag = cartData.isInCart ? Link : 'button';

  return (
    <Fragment>
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {data !== null ? (
              <Row>
                <Col sm="12">
                  <Card className="mb-0">
                    <CardImg src={data.blog.img} className="img-fluid" top />
                    <CardBody>
                      <CardTitle tag="h4">Fitness Training Basics</CardTitle>
                      <div className="d-flex">
                        <Avatar
                          className="me-50"
                          img={data.blog.avatar}
                          imgHeight="24"
                          imgWidth="24"
                        />
                        <div>
                          <small className="text-muted me-25">by</small>
                          <small>
                            <a className="text-body" href="/" onClick={(e) => e.preventDefault()}>
                              {data.blog.userFullName}
                            </a>
                          </small>
                          <span className="text-muted ms-50 me-25">|</span>
                          <small className="text-muted">{data.blog.createdTime}</small>
                        </div>
                      </div>
                      <div className="my-1 py-25">{renderTags()}</div>
                      <div className="ecommerce-details-price d-flex flex-wrap mt-1">
                        <h4 className="item-price me-1">$585</h4>
                        <ul className="unstyled-list list-inline">
                          {new Array(5).fill().map((listItem, index) => {
                            return (
                              <li key={index} className="ratings-list-item me-25">
                                <Star
                                  className={classnames({
                                    'filled-star': index + 1 <= 4,
                                    'unfilled-star': index + 1 > data.rating
                                  })}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <ul className="product-features list-unstyled">
                        <li className="d-flex justify-content-between mb-1">
                          <span className="d-flex align-items-center">
                            <FaChalkboardTeacher className="me-1" /> Instructor
                          </span>
                          <span>Nahidzz</span>
                        </li>
                        <li className="d-flex justify-content-between mb-1">
                          <span className="d-flex align-items-center">
                            <VscTypeHierarchy className="me-1" /> Type
                          </span>
                          <span>Online Course</span>
                        </li>
                        <li className="d-flex justify-content-between mb-1">
                          <span className="d-flex align-items-center">
                            <BsCalendar2Date className="me-1" /> Date
                          </span>
                          <span>Mar 17, 2015 - Mar 21, 2019</span>
                        </li>
                        <li className="d-flex justify-content-between mb-1">
                          <span className="d-flex align-items-center">
                            <FaGraduationCap className="me-1" /> Students Enrolled
                          </span>
                          <span>7837</span>
                        </li>
                        <li className="d-flex justify-content-between mb-1">
                          <span className="d-flex align-items-center">
                            <MdOutlineWatchLater className="me-1" /> Duration
                          </span>
                          <span>7Hrs 45Mins</span>
                        </li>
                        <li className="d-flex justify-content-between mb-1">
                          <span className="d-flex align-items-center">
                            <GiNotebook className="me-1" /> Curriculum
                          </span>
                          <span>5</span>
                        </li>
                      </ul>
                      <div className="d-flex flex-column flex-sm-row pt-1">
                        <Button
                          tag={CartBtnTag}
                          className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
                          color="primary"
                          onClick={() => handleCartBtn(cartData.id, cartData.isInCart)}
                          /*eslint-disable */
                          {...(cartData.isInCart
                            ? {
                                to: '/ecommerce/checkout'
                              }
                            : {})}
                          /*eslint-enable */
                        >
                          <ShoppingCart className="me-50" size={14} />
                          {cartData.isInCart ? 'View in cart' : 'Move to cart'}
                        </Button>
                        <Button
                          className="btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0"
                          color="secondary"
                          outline
                          onClick={() => handleWishlist(cartData.isInWishlist)}
                        >
                          <Heart
                            size={14}
                            className={classnames('me-50', {
                              'text-danger': cartData.isInWishlist
                            })}
                          />
                          <span>Wishlist</span>
                        </Button>
                        <UncontrolledButtonDropdown className="dropdown-icon-wrapper btn-share">
                          <DropdownToggle
                            className="btn-icon hide-arrow"
                            color="secondary"
                            caret
                            outline
                          >
                            <Share2 size={14} />
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                              <Facebook size={14} />
                            </DropdownItem>
                            <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                              <Twitter size={14} />
                            </DropdownItem>
                            <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                              <Youtube size={14} />
                            </DropdownItem>
                            <DropdownItem tag="a" href="/" onClick={(e) => e.preventDefault()}>
                              <Instagram size={14} />
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledButtonDropdown>
                      </div>
                      <hr />
                      <div className="mt-1">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              active={active === '1'}
                              onClick={() => {
                                toggle('1');
                              }}
                            >
                              <BsInfoCircle size={16} />
                              <span className="align-middle">About</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={active === '2'}
                              onClick={() => {
                                toggle('2');
                              }}
                            >
                              <GiNotebook size={16} />
                              <span className="align-middle">Curriculum</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={active === '3'}
                              onClick={() => {
                                toggle('3');
                              }}
                            >
                              <MdOutlineReviews size={16} />
                              <span className="align-middle">Reviews</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={active === '4'}
                              onClick={() => {
                                toggle('4');
                              }}
                            >
                              <GrResources size={16} />
                              <span className="align-middle">Resources</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent className="py-50" activeTab={active}>
                          <TabPane tabId="1">
                            <div className="d-flex mb-2">
                              <div>
                                <Avatar
                                  img={cmtImg}
                                  className="me-2"
                                  imgHeight="60"
                                  imgWidth="60"
                                />
                              </div>
                              <div>
                                <h6 className="fw-bolder">Willie Clark</h6>
                                <CardText className="mb-0">
                                  Based in London, Uncode is a blog by Willie Clark. His posts
                                  explore modern design trends through photos and quotes by
                                  influential creatives and web designer around the world.
                                </CardText>
                              </div>
                            </div>
                            <h4>Description</h4>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: data.blog.content
                              }}
                            ></div>
                          </TabPane>
                          <TabPane tabId="2">
                            <div className="d-flex justify-content-between">
                              <h5 className="mb-1">12 Lessons - 232 Lectures</h5>
                              <h5 className="mb-1">Total Length: 123Hrs 34 Mins</h5>
                            </div>
                            <Accordion open={open} toggle={toggleAccordion}>
                              <AccordionItem>
                                <AccordionHeader targetId="1">
                                  Lession 1: Getting up and running
                                </AccordionHeader>
                                <AccordionBody accordionId="1">
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                </AccordionBody>
                              </AccordionItem>
                              <AccordionItem>
                                <AccordionHeader targetId="2">
                                  Lession 2: The Basics - Data Types
                                </AccordionHeader>
                                <AccordionBody accordionId="2">
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                </AccordionBody>
                              </AccordionItem>
                              <AccordionItem>
                                <AccordionHeader targetId="3">
                                  Lession 3: Conditions and Loops
                                </AccordionHeader>
                                <AccordionBody accordionId="3">
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                </AccordionBody>
                              </AccordionItem>
                              <AccordionItem>
                                <AccordionHeader targetId="4">
                                  Lession 4: Functions!
                                </AccordionHeader>
                                <AccordionBody accordionId="4">
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-1">
                                    <div className="d-flex align-items-center">
                                      <BsFillPlayCircleFill className="me-1" />
                                      <Link>
                                        <span>How to install Python</span>
                                      </Link>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <AiFillLock size={18} className="me-2" />
                                      <span>04:34</span>
                                    </div>
                                  </div>
                                </AccordionBody>
                              </AccordionItem>
                            </Accordion>
                          </TabPane>
                          <TabPane tabId="3">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center me-1">
                                  <a className="me-50" href="/" onClick={(e) => e.preventDefault()}>
                                    <MessageSquare size={21} className="text-body align-middle" />
                                  </a>
                                  <a href="/" onClick={(e) => e.preventDefault()}>
                                    <div className="text-body align-middle">
                                      {kFormatter(data.blog.comments)}
                                    </div>
                                  </a>
                                </div>
                                <div className="d-flex align-items-cente">
                                  <a className="me-50" href="/" onClick={(e) => e.preventDefault()}>
                                    <Bookmark size={21} className="text-body align-middle" />
                                  </a>
                                  <a href="/" onClick={(e) => e.preventDefault()}>
                                    <div className="text-body align-middle">
                                      {data.blog.bookmarked}
                                    </div>
                                  </a>
                                </div>
                              </div>
                              <UncontrolledDropdown className="dropdown-icon-wrapper">
                                <DropdownToggle tag="span">
                                  <Share2 size={21} className="text-body cursor-pointer" />
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <DropdownItem className="py-50 px-1">
                                    <GitHub size={18} />
                                  </DropdownItem>
                                  <DropdownItem className="py-50 px-1">
                                    <Gitlab size={18} />
                                  </DropdownItem>
                                  <DropdownItem className="py-50 px-1">
                                    <Facebook size={18} />
                                  </DropdownItem>
                                  <DropdownItem className="py-50 px-1">
                                    <Twitter size={18} />
                                  </DropdownItem>
                                  <DropdownItem className="py-50 px-1">
                                    <Linkedin size={18} />
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                            <Col sm="12" id="blogComment">
                              <h6 className="section-label mt-2">
                                What the students are saying...
                              </h6>
                              {renderComments()}
                            </Col>
                            <Col sm="12">
                              <h6 className="section-label">Leave a Comment</h6>
                              <Card>
                                <CardBody>
                                  <Form className="form" onSubmit={(e) => e.preventDefault()}>
                                    <Row>
                                      <Col sm="6">
                                        <div className="mb-2">
                                          <Input placeholder="Name" />
                                        </div>
                                      </Col>
                                      <Col sm="6">
                                        <div className="mb-2">
                                          <Input type="email" placeholder="Email" />
                                        </div>
                                      </Col>
                                      <Col sm="6">
                                        <div className="mb-2">
                                          <Input type="url" placeholder="Website" />
                                        </div>
                                      </Col>
                                      <Col sm="12">
                                        <div className="mb-2">
                                          <Input
                                            className="mb-2"
                                            type="textarea"
                                            rows="4"
                                            placeholder="Comment"
                                          />
                                        </div>
                                      </Col>
                                      <Col sm="12">
                                        <div className="form-check mb-2">
                                          <Input type="checkbox" id="save-data-checkbox" />
                                          <Label
                                            className="form-check-label"
                                            for="save-data-checkbox"
                                          >
                                            Save my name, email, and website in this browser for the
                                            next time I comment.
                                          </Label>
                                        </div>
                                      </Col>
                                      <Col sm="12">
                                        <Button color="primary">Post Comment</Button>
                                      </Col>
                                    </Row>
                                  </Form>
                                </CardBody>
                              </Card>
                            </Col>
                          </TabPane>
                          <TabPane tabId="4">
                            <p>
                              Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears
                              chocolate cake topping powder. Sweet marzipan cheesecake jelly-o
                              powder wafer lemon drops lollipop cotton candy.
                            </p>
                            <p>
                              Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears
                              chocolate cake topping powder. Sweet marzipan cheesecake jelly-o
                              powder wafer lemon drops lollipop cotton candy. Lorem ipsum dolor sit,
                              amet consectetur adipisicing elit. Eligendi, expedita maxime nulla
                              provident vitae sed repellendus fuga? Provident, quas. Ea eius dolor
                              ratione obcaecati voluptas nihil quisquam, odio nesciunt alias.
                            </p>
                            <ul>
                              <li className="mb-1">
                                <Link to="#">Resourse 1</Link>
                              </li>
                              <li className="mb-1">
                                <Link to="#">Resourse 2</Link>
                              </li>
                              <li className="mb-1">
                                <Link to="#">Resourse 3</Link>
                              </li>
                              <li className="mb-1">
                                <Link to="#">Resourse 4</Link>
                              </li>
                              <li className="mb-1">
                                <Link to="#">Resourse 5</Link>
                              </li>
                              <li className="mb-1">
                                <Link to="#">Resourse 6</Link>
                              </li>
                            </ul>
                          </TabPane>
                        </TabContent>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default Course;
