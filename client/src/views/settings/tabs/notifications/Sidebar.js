// ** React Imports
import { useState } from 'react'
import { NavLink, TabContent, TabPane } from 'reactstrap'
import { Menu } from 'react-feather'
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Folder } from 'react-feather'
import { ListGroup, ListGroupItem, } from 'reactstrap'
import System from './tabs/system'
import Birthday from './tabs/birthday'
import Retention from './tabs/retention'
import Renewal from './tabs/renewal'
// ** Components imports live chat layout etc

// ** Reactstrap Imports

const Sidebar = (props) => {
    // ** Props
    const { sidebarOpen, setSidebarOpen } = props
    const [active, setActive] = useState('6')
    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>

            <div
                className={classnames('sidebar-left', {
                    show: sidebarOpen
                })}
            >
                <div className="sidebar">
                    <div className="sidebar-content email-app-sidebar">
                        <div className="email-app-menu">

                            <PerfectScrollbar
                                className="sidebar-menu-list"
                                options={{ wheelPropagation: false }}
                            >

                                <div className="form-group-compose text-center compose-btn">
                                <h3> Notifications</h3>

                                </div>
                                <ListGroup tag="div" className="list-group-labels">
                                    <ListGroupItem
                                        tag={NavLink}

                                        onClick={() => toggleTab('6')}
                                        active={active === '6'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        System

                                    </ListGroupItem>
                                    <ListGroupItem
                                        tag={NavLink}
                                        onClick={() => toggleTab('7')}
                                        active={active === '7'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        Retention
                                    </ListGroupItem>
                                    <ListGroupItem
                                        tag={NavLink}
                                        onClick={() => toggleTab('8')}
                                        active={active === '8'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        Birthday
                                    </ListGroupItem>
                                    <ListGroupItem
                                        tag={NavLink}
                                        onClick={() => toggleTab('9')}
                                        active={active === '9'}
                                    >
                                        <Folder size={18} className="me-75" />
                                        <span className="align-middle"></span>
                                        Renewal
                                    </ListGroupItem>
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
                    <div className="email-app-list">
                        <div className="app-fixed-search d-flex d-lg-none align-items-center">
                            <div
                                className="sidebar-toggle d-block d-lg-none ms-1"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu size="21" />
                            </div>
                        </div>
                        <PerfectScrollbar>
                            <TabContent activeTab={active} >
                                <TabPane tabId="6">
                                    <System />
                                </TabPane>
                                <TabPane tabId="7">
                                    <Retention />
                                </TabPane>
                                <TabPane tabId="8">
                                    <Birthday />
                                </TabPane>
                                <TabPane tabId="9">
                                    <Renewal />
                                </TabPane>

                            </TabContent>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
