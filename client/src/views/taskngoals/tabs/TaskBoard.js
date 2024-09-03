import React from 'react';

import KanbanBoard from '../../apps/kanban';

const TaskBoard = (props) => {
  const {store} = props;
  return (
    <div className="kanban-application">
      <KanbanBoard store={store} />
    </div>
  );
};

export default TaskBoard;
