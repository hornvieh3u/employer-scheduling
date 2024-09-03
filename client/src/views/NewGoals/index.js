// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import {
    ArrowRightCircle,
    ChevronLeft,
    ChevronRight,
    Home,
    Share,
    Sun,
    Target,
    UserPlus
} from 'react-feather';
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiFilePaperLine } from 'react-icons/ri';
import { Code } from 'react-feather';
import { CiCircleList } from 'react-icons/ci';
import { Button, Col, Collapse, Row } from 'reactstrap';

// ** User Components
import TaskReporting from './tabs/TaskReporting';
import TaskList from './tabs/TaskList';
import TaskBoard from './tabs/TaskBoard';
import TaskManagement from './tabs/TaskManagement';
import WorkspaceSidebar from './WorkspaceSidebar';
import WorkspaceTitle from '../apps/workspace';
import WorkspaceTitleBar from './WorkspaceTitlebar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
import { BiSun } from 'react-icons/bi';
import HabitMain from './Habits';

const TaskAndGoalsTabs = () => {
    const [active, setActive] = useState('3');
    const [collapse, setCollapse] = useState(false);
    // ** Store Vars
    const dispatch = useDispatch();
    const store = useSelector((state) => {
        return {
            ...state.workspace
        };
    });

    // useEffect(() => {
    //     dispatch(fetchWorkspaceApi()).then((res) => {
    //         dispatch(getSelectedWorkspaceData(res.payload[0]._id));
    //     });
    // }, [dispatch]);

    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab);
        }
    };

    const handleWorkspaceCollapse = () => setCollapse(!collapse);

    return (
        <>
            <Row style={{ width: '100%' }}>
                <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
                    <Fragment>
                        <Nav pills className="mb-2 tab-header">
                            <NavItem>
                                <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                                    <Home className="font-medium-1 me-50" />
                                    <span className="fs-6">Dashboard</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                                    <Target className="font-medium-1 me-50" />
                                    <span className="fs-6">Target</span>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                                    <Sun className="font-medium-1 me-50" />
                                    <span className="fs-6">Habit</span>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                                    <BsUiChecks className="font-medium-1 me-50" />
                                    <span className="fs-6">My Manager</span>
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                                    <FiSettings className="font-medium-1 me-50" />
                                    <span className="fs-6">Setting</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <div className="tasks-border">
                            <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 200, hide: 500 }}>
                                <WorkspaceSidebar
                                    collapse={collapse}
                                    store={store}
                                    // params={params}
                                    addWorkspace={addWorkspace}
                                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                                    dispatch={dispatch}
                                />
                            </Collapse>
                            {collapse ? (
                                <div className="sidebar-expand-panel">
                                    <Button color="flat" onClick={handleWorkspaceCollapse}></Button>
                                </div>
                            ) : null}
                            <div className="tasks-area">
                                {/* <WorkspaceTitleBar
                                    workspace={store.selectedWorkspace}
                                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                                    collapse={collapse}
                                /> */}
                                <TabContent activeTab={active}>
                                    <TabPane tabId="1">
                                        <TaskReporting />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <TaskList />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <HabitMain />
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <TaskManagement />
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <TaskReporting />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </Fragment>
                </Col>
            </Row>
            {/* <div className="tab-header">
        <Nav pills className="mb-0">
          <NavItem>
            <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
              <FiSettings className="font-medium-1 me-50" />
              <span className="fs-6">Task Reporting</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
              <GiRank2 className="font-medium-1 me-50" />
              <span className="fs-6">Task List</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
              <BsUiChecks className="font-medium-1 me-50" />
              <span className="fs-6">Task Board</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
              <BsListCheck className="font-medium-1 me-50" />
              <span className="fs-6">Task Management</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div> */}
            {/* <div className="tasks-border">
        <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 200, hide: 500 }}>
          <WorkspaceSidebar
            collapse={collapse}
            store={store}
            // params={params}
            addWorkspace={addWorkspace}
            handleWorkspaceCollapse={handleWorkspaceCollapse}
            dispatch={dispatch}
          />
        </Collapse>
        {collapse ? (
          <div className="sidebar-expand-panel">
            <Button color="flat" onClick={handleWorkspaceCollapse}></Button>
          </div>
        ) : null}
        <div className="tasks-area">
          <Fragment>
            <WorkspaceTitleBar
              workspace={store.selectedWorkspace}
              handleWorkspaceCollapse={handleWorkspaceCollapse}
              collapse={collapse}
            />
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <TaskReporting />
              </TabPane>
              <TabPane tabId="2">
                <TaskList />
              </TabPane>
              <TabPane tabId="3">
                <TaskBoard />
              </TabPane>
              <TabPane tabId="4">
                <TaskManagement />
              </TabPane>
            </TabContent>
          </Fragment>
        </div>
      </div> */}
        </>
    );
};
export default TaskAndGoalsTabs;
