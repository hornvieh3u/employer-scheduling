import React, { Fragment, useState } from "react";
import { Calendar, Columns, Filter, List, MoreVertical, Search, Users, X } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, Col, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
// import Tasks from "../../goals/Tasks";
// import { getTasks, updateTask, selectTask, addTask, deleteTask, reOrderTasks } from '../../store/index';
import Avatar from '@components/avatar'
import blankAvatar from '@src/assets/images/avatars/avatar-blank.png'
import moment from "moment";
import PerfectScrollbar from 'react-perfect-scrollbar'
import HabitCalendar from "./HabitCalendar";
// import "../style.css"


const HabitMain = () => {
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState('');
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const store = useSelector((state) => state.todo);
    const paramsURL = useParams();
    const params = {
        filter: paramsURL.filter || '',
        q: query || '',
        sortBy: sort || '',
        tag: paramsURL.tag || ''
    };
    const handleFilter = () => {

    }

    return (
        // <Tasks
        //     store={store}
        //     tasks={store.tasks}
        //     sort={sort}
        //     query={query}
        //     params={params}
        //     setSort={setSort}
        //     setQuery={setQuery}
        //     dispatch={dispatch}
        //     getTasks={getTasks}
        //     paramsURL={paramsURL}
        //     updateTask={updateTask}
        //     selectTask={selectTask}
        //     reOrderTasks={reOrderTasks}
        //     // handleMainSidebar={handleMainSidebar}
        //     // handleTaskSidebar={handleTaskSidebar}
        // />
        <Fragment>
            <div>
                <Row className="">
                    <Col sm={6} md={6} lg={6} classNamed="d-flex align-items-end">
                        <h3 className="ms-1">Personal Goals</h3>
                    </Col>
                </Row>
            </div>
            <div style={{ borderTop: "1px solid #e6e6e6", borderBottom: "1px solid #e6e6e6" }}>
                <Row style={{ marginTop: "5px" }}>
                    <Col sm={6} md={6} lg={6}>
                        <Input type="search"
                            placeholder="Search"
                            style={{
                                marginBottom: "2px",
                            }}
                        >
                            <Search />
                        </Input>
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <div className="d-flex justify-content-end align-items-center">
                            <div style={{ border: "1px solid #756df0", borderRadius: "4px", padding: "5px" }}>
                                <List size={20} style={{ color: "#756df0" }} />
                            </div>
                            <div className="ms-1" style={{ border: "1px solid #756df0", borderRadius: "4px", padding: "5px" }}>
                                <Calendar size={20} style={{ color: "#756df0" }} />
                            </div>
                            <div className="ms-1" style={{ border: "1px solid #756df0", borderRadius: "4px", padding: "5px" }}>
                                <Columns size={20} style={{ color: "#756df0" }} />
                            </div>
                            <Button
                                className=" ms-1 d-flex align-items-center"
                                color="light-secondary"
                            >
                                <Filter size={14} />
                                <span>Filter</span>
                            </Button>
                            <Button
                                className="  d-flex align-items-center"
                                color="light-secondary"
                            >
                                <Users size={14} />
                                <span>Assignee</span>
                            </Button>
                            <div className="me-1">
                                <MoreVertical size={16} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="mt-1">
                <Card onClick={() => setOpen(true)} className="cursor-pointer m-0 p-1">
                    <Row>
                        <Col sm={6} md={6} lg={6}   >
                            <div className="  d-flex align-items-center">
                                <Input type="checkbox" />
                                <span className="ms-1">
                                    Fix Responsiveness for new structure 💻
                                </span>
                            </div>
                        </Col>
                        <Col sm={6} md={6} lg={6}   >
                            <div className="  d-flex justify-content-end align-items-center">
                                <Badge
                                    className="text-capitalize me-1"
                                    color="light-success"
                                    pill
                                >
                                    Low
                                </Badge >
                                <small className="me-1">{moment(new Date()).format("MMM D")}</small>
                                <Avatar className="mb-0" img={blankAvatar} imgHeight="30" imgWidth="30" />
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card onClick={() => setOpen(true)} className="cursor-pointer m-0 p-1">
                    <Row>
                        <Col sm={6} md={6} lg={6}   >
                            <div className="  d-flex align-items-center">
                                <Input type="checkbox" />
                                <span className="ms-1">
                                    Fix Responsiveness for new structure 💻
                                </span>
                            </div>
                        </Col>
                        <Col sm={6} md={6} lg={6}   >
                            <div className="  d-flex justify-content-end align-items-center">
                                <Badge
                                    className="text-capitalize me-1"
                                    color="light-success"
                                    pill
                                >
                                    Low
                                </Badge >
                                <small className="me-1">{moment(new Date()).format("MMM D")}</small>
                                <Avatar className="mb-0" img={blankAvatar} imgHeight="30" imgWidth="30" />
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card onClick={() => setOpen(true)} className="cursor-pointer m-0 p-1">
                    <Row>
                        <Col sm={6} md={6} lg={6}   >
                            <div className="  d-flex align-items-center">
                                <Input type="checkbox" />
                                <span className="ms-1">
                                    Fix Responsiveness for new structure 💻
                                </span>
                            </div>
                        </Col>
                        <Col sm={6} md={6} lg={6}   >
                            <div className="  d-flex justify-content-end align-items-center">
                                <Badge
                                    className="text-capitalize me-1"
                                    color="light-success"
                                    pill
                                >
                                    Low
                                </Badge >
                                <small className="me-1">{moment(new Date()).format("MMM D")}</small>
                                <Avatar className="mb-0" img={blankAvatar} imgHeight="30" imgWidth="30" />
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
            <Modal
                isOpen={open}
                // className="sidebar-xl"
                style={{ width: "500px" }}
                toggle={() => setOpen(false)}
                contentClassName="p-0 overflow-hidden"
                modalClassName="modal-slide-in event-sidebar"
            >
                <ModalHeader
                    className="mb-1"
                    toggle={() => setOpen(false)}
                    close={<X className="cursor-pointer" size={15} onClick={() => setOpen(false)} />}
                    tag="div"
                >
                    <Button outline size="sm" color="secondary">
                        Mark Complete
                    </Button>
                </ModalHeader>
                <PerfectScrollbar options={{ wheelPropagation: false }}>
                    <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
                        {/* <HabitCalendar /> */}
                        <Button
                            color="secondary"
                            type="reset"
                            onClick={() => setOpen(false)}
                            outline
                        >
                            Close
                        </Button>
                    </ModalBody>
                </PerfectScrollbar>
            </Modal>
        </Fragment >
    )
}
export default HabitMain