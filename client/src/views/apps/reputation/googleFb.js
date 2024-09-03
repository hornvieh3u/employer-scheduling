import React, { Fragment, useState } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
// client/src/views/apps/email/Sidebar.js
import Sidebar from './Sidebar'
import {
    Button,
    Card,
    Col,
    Input,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
// import { FaFacebookF, FaGoogle } from 'react-icons/fa';

import { FaFacebook} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";

// import GridView from './GridView';
// import FeedView from './FeedView';
// import CalendarView from './CalendarView';
import { Edit2 } from 'react-feather';

function index() {
    const [active, setActive] = useState('today');
      const [viewType, setViewType] = useState('Grid View');
      const toggle = (tab) => {
        // if (active !== tab) {
        setActive(tab);
        // setSelectedWorkingCheckList(null)
        // setTaskTab(tab)
        // }
      };
      const handleViewType = (e) => {
        setViewType(e.target.value);
      };
    return (
        <>
            <Card className="p-1">
                <Row>
                    <Col sm={2} md={2} lg={2}>
                       
                    </Col>
                    <Col sm={8} md={8} lg={8}>
                        <Nav className="justify-content-center mb-0" tabs>
                            <NavItem>
                                <NavLink
                                    active={active === 'today'}
                                    onClick={() => {
                                        toggle('today');
                                    }}
                                >
                                    <FaFacebook size={38} color = 'blue'/>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={active === 'completed'}
                                    onClick={() => {
                                        toggle('completed');
                                    }}
                                >
                                    <FcGoogle size={38} />
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={2} md={2} lg={2} className="d-flex justify-content-end">
                    </Col>
                </Row>
            </Card>
        </>
    )
}
export default index

