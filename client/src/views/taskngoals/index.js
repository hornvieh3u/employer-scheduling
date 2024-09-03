// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import { ArrowRightCircle, ChevronLeft, ChevronRight, Share, UserPlus } from 'react-feather';
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
import { fetchLabelsApi } from '../tasks/label-management/store'

// ** Styles
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';

const TaskAndGoalsTabs = () => {
  const [active, setActive] = useState('1');
  const [collapse, setCollapse] = useState(false);
  // ** Store Vars
  const dispatch = useDispatch();

  const store = useSelector((state) => {
    return {
      ...state.workspace,
      ...state.label
    };
  });

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      dispatch(getSelectedWorkspaceData(res.payload[0]._id));
    });
    dispatch(fetchLabelsApi());
  }, [dispatch]);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleWorkspaceCollapse = () => setCollapse(!collapse);

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Fragment>
            <Nav pills className="mb-2 tab-header">
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
            <div className="tasks-border">
              {active !== '1' ? (
                <Collapse isOpen={!collapse} horizontal={true}>
                  <WorkspaceSidebar
                    collapse={collapse}
                    store={store}
                    // params={params}
                    addWorkspace={addWorkspace}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    dispatch={dispatch}
                  />
                </Collapse>
              ) : null}
              <div className="tasks-area">
                {active !== '1' ? (
                  <WorkspaceTitleBar
                    workspace={store.selectedWorkspace}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    collapse={collapse}
                  />
                ) : null}
                <TabContent activeTab={active}>
                  <TabPane tabId="1">
                    <TaskReporting />
                  </TabPane>
                  <TabPane tabId="2">
                    <TaskList store = {store} />
                  </TabPane>
                  <TabPane tabId="3">
                    <TaskBoard store = {store} />
                  </TabPane>
                  <TabPane tabId="4">
                    <TaskManagement />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default TaskAndGoalsTabs;
