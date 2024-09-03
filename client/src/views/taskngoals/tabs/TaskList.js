import React from 'react';

import TasksList from '../../tasks/task-list';

const TaskList = (props) => {
  const {store} = props;
  return (
    <div className="task-application">
      <TasksList store={store} />
    </div>
  );
};

export default TaskList;
