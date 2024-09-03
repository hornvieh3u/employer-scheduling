// ** React Imports
import { Fragment, useState } from 'react';

// ** Reactstrap Imports
import { Row, Col, Card, CardBody } from 'reactstrap';

// ** Components
import LeftSidebar from './LeftSidebar';
import NewTodo from './NewTodo';

// ** Style
import '@src/assets/styles/task-reporting-task-manage.scss';

const NewTask = (props) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const buildProps = { ...props, selectedTask, setSelectedTask };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col lg="4" md="4" sm="12">
              <LeftSidebar {...buildProps} />
            </Col>
            <Col lg="8" md="8" sm="12">
              <NewTodo {...buildProps} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NewTask;
