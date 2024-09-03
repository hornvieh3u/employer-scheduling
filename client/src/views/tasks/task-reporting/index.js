// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

// ** Icons Import
import { MoreVertical } from 'react-feather';

// ** Components
import ListTabs from './ListTabs';
import BasicTimeline from './BasicTimeline';
import { useDispatch, useSelector } from 'react-redux';

// ** Style
import '@src/assets/styles/task-reporting.scss';

// ** Action
// import { fetchTaskListAction } from './store/action';

const Tasks = (props) => {
  const [selectedWorkingCheckList, setSelectedWorkingCheckList] = useState(null);
  const [taskTab, setTaskTab] = useState('today');

  // const dispatch = useDispatch();

  const buildProps = {
    ...props,
    selectedWorkingCheckList,
    setSelectedWorkingCheckList,
    setTaskTab,
    taskTab
  };

  // useEffect(() => {
  //   dispatch(fetchTaskListAction());
  // }, [dispatch]);

  const { userData } = useSelector((state) => state.auth);

  return (
    <div className="task-report">
      <Fragment>
        {/* {console.log('userData', userData)} */}
        {/* <Card> */}
        {/* <CardBody> */}
        <Row style={{ margin: 0 }}>
          <Col lg="4" md="4" sm="12" style={{ margin: 0 }}>
            {userData?.userType !== 'employee' && (
              <div className="mb-2 d-flex justify-content-between align-items-center">
                <Link to="/manage-task">
                  <Button color="primary">Manage Tasks</Button>
                </Link>
                <MoreVertical className="cursor-pointer" size={16} />
              </div>
            )}
            <div className="list-tabs">
              <ListTabs {...buildProps} />
            </div>
          </Col>
          <Col lg="8" md="8" sm="12" style={{ margin: 0 }}>
            <div className="basic-time-line">
              <BasicTimeline {...buildProps} />
            </div>
          </Col>
        </Row>
        {/* </CardBody> */}
        {/* </Card> */}
      </Fragment>
    </div>
  );
};

export default Tasks;
