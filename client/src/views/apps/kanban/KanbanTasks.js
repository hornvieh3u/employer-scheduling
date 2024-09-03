// ** Reactstrap Imports
import { Badge, Card, CardBody, UncontrolledTooltip } from 'reactstrap';

// ** Custom Components
import AvatarGroup from '@components/avatar-group';
import Avatar from '@components/avatar';

// ** Third Party Imports
import classnames from 'classnames';
import { Paperclip, MessageSquare } from 'react-feather';

// ** Redux Imports
import { useDispatch } from 'react-redux';

// ** Actions
import { handleSelectTask } from '../workspace/store';
import { useEffect, useState } from 'react';

const KanbanTasks = (props) => {
  // ** Props
  const { task, labelColors, handleTaskSidebarToggle } = props;
  const [mouseDownState, setMouseDownState] = useState(true);
  const [selectTaskId, setSelectTaskId] = useState('');
  window.selectTaskId;

  useEffect(() => {
    setSelectTaskId(window.selectTaskId);
  }, [window.selectTaskId]);
  useEffect(() => {
    if (selectTaskId === task._id) {
      window.mouseDownState = mouseDownState;
    }
  }, [mouseDownState]);

  // ** Hooks
  const dispatch = useDispatch();

  const handleTaskClick = () => {
    dispatch(handleSelectTask(task));
    handleTaskSidebarToggle();
  };

  const renderLabels = () => {
    if (task.labels.length) {
      return (
        <div className="mb-1">
          {task.labels.map((label, index) => {
            const isLastChip = task.labels[task.labels.length - 1] === label;

            return (
              <Badge
                pill
                key={index}
                label={label}
                color={labelColors[label]}
                className={classnames({ 'me-75': !isLastChip })}
              >
                {label}
              </Badge>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderAssignee = (row) => {
    let tmpValue = 0;
    Array.from(row.title).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    return (
      <div className="own-avatar">
        {row.title ? (
          <UncontrolledTooltip placement={row.placement} target={row.title.split(' ').join('-')}>
            {row.title}
          </UncontrolledTooltip>
        ) : null}
        {row?.img ? (
          <Avatar
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            img={row.img}
            width="32"
            height="32"
            {...(row.title ? { id: row.title.split(' ').join('-') } : {})}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            className={classnames('pull-up', {
              [row.className]: row.className
            })}
            content={row.title || 'John Doe'}
            {...(row.title ? { id: row.title.split(' ').join('-') } : {})}
            initials
          />
        )}
      </div>
    );
  };

  const renderAssignees = (data) => {
    return <div className="own-avatar-group">{data.map((row) => renderAssignee(row))}</div>;
  };

  const renderAttachmentsComments = () => {
    if ((task.attachments && task.attachments.length) || (task.comments && task.comments.length)) {
      return (
        <div className="d-flex align-items-center">
          {task.attachments && task.attachments.length ? (
            <div className="d-flex align-items-center cursor-pointer me-75">
              <Paperclip size={16} className="me-25" />
              <span>{task.attachments.length}</span>
            </div>
          ) : null}
          {task.comments && task.comments.length ? (
            <div className="d-flex align-items-center cursor-pointer">
              <MessageSquare size={16} className="me-50" />
              <span>{task.comments.length}</span>
            </div>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  };

  const taskFooterClasses = () => {
    if (task.comments && !task.comments.length && task.attachments && !task.attachments.length) {
      return 'justify-content-end';
    } else {
      return 'justify-content-between';
    }
  };

  const renderTaskFooter = () => {
    return (task.attachments && task.attachments.length) ||
      (task.comments && task.comments.length) ||
      (task.assignedTo && task.assignedTo.length) ? (
      <div className={`task-footer d-flex align-items-center mt-1 ${taskFooterClasses()}`}>
        {renderAttachmentsComments()}
        {task.assignedTo.length ? (
          <div>{task.assignedTo.length ? renderAssignees(task.assignedTo) : null}</div>
        ) : null}
      </div>
    ) : null;
  };

  const setCardMouseState = (event) => {
    if (event.type === 'mouseup') {
    } else {
    }
  };

  return (
    <Card
      onClick={handleTaskClick}
      className="task"
      data-board-id={task.boardId}
      data-task-id={task._id}
      onMouseUp={(e) => setCardMouseState(e)}
      onMouseDown={(e) => setCardMouseState(e)}
    >
      <CardBody data-task-id={task._id}>
        {renderLabels()}

        {task.coverImage ? (
          <img className="img-fluid rounded task-img mb-1" alt={task.title} src={task.coverImage} />
        ) : null}

        <span className="task-title">{task.title}</span>

        {renderTaskFooter()}
      </CardBody>
    </Card>
  );
};

export default KanbanTasks;
