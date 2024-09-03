// ** React Imports
import { useEffect, useState } from 'react';
import { TrendingUp, Menu, MoreVertical } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Row,
  Col,
  Button,
  Modal,
  Label,
  Input,
  Form,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavLink,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

//for redux
import { useSelector, useDispatch } from 'react-redux';
import {
  progressionAddAction,
  progressionFetchAction,
  progressionCategoriesFetchAction,
  progressionDeleteAction,
  progressionCategoriesRankResetAction,
  progressionEditAction
} from './store/actions';
import Layout from './tabs/layout';

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [itemmodal, setItemmodal] = useState(false);
  const [isModalEditable, setIsModalEditable] = useState(false);
  const store = useSelector((state) => state.progression);
  const progressionList = store?.progressionList;
  const tabelData = store?.progressionCategoriesRank;

  const toggleitemmodal = () => setItemmodal(!itemmodal);
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState(0);
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const [progressiondata, setProgressiondata] = useState();
  const [activecard, setActivecard] = useState('');
  const handleProgressionName = (e) => {
    isModalEditable
      ? setProgressiondata({ ...progressiondata, [e.target.name]: e.target.value })
      : setProgressiondata({ [e.target.name]: e.target.value });
  };
  const handleProgressionAdd = (e) => {
    e.preventDefault();
    if (progressiondata?.progressionName === '' || progressiondata?.progressionName === undefined) {
      toast.error('Please Enter Name');
    } else {
      dispatch(progressionAddAction(progressiondata));
      toggleitemmodal();
    }
  };
  const handleProgressionEdit = (e) => {
    e.preventDefault();
    dispatch(progressionEditAction(progressiondata));
  };
  const fetchData = () => {
    dispatch(progressionFetchAction());
    dispatch(progressionCategoriesFetchAction());
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (store?.progressionAddSuccess === true) {
      toast.success('Progression Added');
    }
    if (store?.progressionCategoriesDeleteSuccess) {
      toast.success('Category Deleted Successfully');
    }
    if (store?.progressionDeleteSuccess) {
      toast.success('Progression Deleted Succesfully');
    }
    if (store?.progressionEditSuccess) {
      toast.success('Progression Edited Succesfully');
    }
    if (store?.progressionCategoriesAddSuccess) {
      toast.success('Category Added Succesfully');
    }
    if (store?.progressionCategoriesEditSuccess) {
      toast.success('Category Edited Succesfully');
    }
    if (store?.progressionCategoriesRankAddSuccess) {
      toast.success('Rank Added Succesfully');
    }
    if (store?.progressionCategoriesRankDeleteSuccess) {
      toast.success('Rank Deleted Succesfully');
    }
    if (store?.progressionCategoriesRankEditSuccess) {
      toast.success('Rank Edited Succesfully');
    }
  }, [
    store?.progressionAddSuccess,
    store?.progressionAddFail,
    store?.progressionCategoriesAddSuccess,
    store?.progressionCategoriesAddFail,
    store?.progressionCategoriesEditSuccess,
    store?.progressionCategoriesEditFail,
    store?.progressionDeleteSuccess,
    store?.progressionDeleteFail,
    store?.progressionEditSuccess,
    store?.progressionEditFail,
    store?.progressionCategoriesDeleteSuccess,
    store?.progressionCategoriesRankAddSuccess,
    store?.progressionCategoriesRankDeleteSuccess,
    store?.progressionCategoriesRankEditSuccess
  ]);
  return (
    <>
      <Modal isOpen={itemmodal} toggle={toggleitemmodal} centered={true} size="md">
        <ModalHeader toggle={toggleitemmodal}>
          {isModalEditable ? 'Edit Progression' : 'Add Progression'}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={isModalEditable ? handleProgressionEdit : handleProgressionAdd}>
            <FormGroup>
              <Label for="progressionName">Progression Name</Label>
              <Input
                onChange={handleProgressionName}
                type="text"
                value={progressiondata?.progressionName}
                name="progressionName"
                id="progressionName"
                placeholder=""
              />
            </FormGroup>
            <FormGroup hidden={isModalEditable ? true : false}>
              <Label for="progressionType">Progression Type</Label>
              <Input type="select" name="type" id="progressionType">
                <option>By Action</option>
                <option>By time</option>
                <option>By Attendence</option>
              </Input>
            </FormGroup>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-primary">
              {isModalEditable ? 'Edit' : 'Add'}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <PerfectScrollbar className="sidebar-menu-list">
                <div className="form-group-compose text-center compose-btn">
                  <Button
                    color="primary"
                    onClick={() => {
                      toggleitemmodal();
                      setIsModalEditable(false);
                      setProgressiondata();
                    }}
                  >
                    New Progression
                  </Button>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  {progressionList?.map((progressionItem, index) => (
                    <ListGroupItem
                      tag={NavLink}
                      key={index}
                      onClick={() => {
                        toggleTab(index);
                        dispatch(progressionCategoriesRankResetAction());
                        setActivecard('');
                      }}
                      active={active === index}
                    >
                      <div className="d-flex">
                        <Col md="2">
                          <TrendingUp size={18} className="me-75" />
                        </Col>
                        <Col md="8">{progressionItem.progressionName}</Col>
                        <Col md="2">
                          <UncontrolledDropdown>
                            <DropdownToggle tag="div" className="btn btn-sm">
                              <MoreVertical size={14} className="cursor-pointer" />
                            </DropdownToggle>

                            <DropdownMenu>
                              <DropdownItem
                                tag="span"
                                className="w-100"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsModalEditable(true);
                                  setProgressiondata({
                                    id: progressionItem._id,
                                    progressionName: progressionItem?.progressionName
                                  });
                                  toggleitemmodal();
                                  // setEditModalData(row)
                                  // toggle2();
                                }}
                              >
                                <FiEdit size={14} className="me-50" />
                                <span className="align-middle">Edit</span>
                              </DropdownItem>
                              <DropdownItem
                                tag="span"
                                // href="/"
                                className="w-100"
                                onClick={() => {
                                  dispatch(progressionDeleteAction(progressionItem._id));
                                }}
                              >
                                <AiOutlineDelete size={14} className="me-50" />
                                <span className="align-middle">Remove Progression</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Col>
                      </div>

                      <span className="align-middle"></span>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list h-75">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>
            <div className="card p-2">
              <h3>Progressions</h3>
            </div>
            <PerfectScrollbar>
              {progressionList?.map((ProgressionItem, index) => (
                <TabContent activeTab={active}>
                  <TabPane tabId={index}>
                    <Layout
                      key={index}
                      activecard={activecard}
                      setActivecard={setActivecard}
                      tabelData={tabelData}
                      progressionId={ProgressionItem._id}
                      categories={ProgressionItem.categoryId}
                    />
                  </TabPane>
                </TabContent>
              ))}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
