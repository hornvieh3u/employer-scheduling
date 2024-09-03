// ** React Imports
import { Fragment, useMemo } from 'react';

// ** Custom Components
import Timeline from '@components/timeline';

// ** Reactstrap Imports
import { Button } from 'reactstrap';

// ** Icons Imports
import { Check, Edit } from 'react-feather';

// ** Timeline Data
import useTodoList from './useTodoList';

import { saveTodosAnsAction } from './store/action';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../lib/useMessage';
import { saveTaskListTodosReset } from './store/reducer';

const BasicTimeline = (props) => {
  const dispatch = useDispatch();

  const { selectedWorkingCheckList, setSelectedWorkingCheckList, taskTab } = props;

  const { todoList } = useTodoList({
    selectedWorkingCheckList,
    setSelectedWorkingCheckList,
    taskTab
  });

  const { saveTaskListTodos } = useSelector((state) => state.tasks);

  const { loading, success } = saveTaskListTodos;
  const { error, success: successMsg } = useMessage();
  useMemo(() => {
    if (success) {
      // reset
      dispatch(saveTaskListTodosReset());
      // show message
      successMsg('Checklist todo saved !');
    }
  }, [success]);

  function saveCheckList() {
    let tmpCheckList = selectedWorkingCheckList?.schedule[0]?.checkList;
    tmpCheckList = tmpCheckList.map((x) => {
      return x.pre_ans ? { ...x, ans: x.pre_ans } : x;
    });
    console.log('tmpCheckList', tmpCheckList);
    let tmpWorkingCheckList = {
      ...selectedWorkingCheckList,
      schedule: [
        {
          ...selectedWorkingCheckList.schedule[0],
          checkList: tmpCheckList
        }
      ]
    };
    console.log('tmpWorkingCheckList', tmpWorkingCheckList);
    setSelectedWorkingCheckList((p) => {
      return {
        ...p,
        schedule: [
          {
            ...p.schedule[0],
            checkList: tmpCheckList
          }
        ]
      };
    });
    dispatch(saveTodosAnsAction(tmpWorkingCheckList));
  }

  return (
    <Fragment>
      {selectedWorkingCheckList && (
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <h4 className="m-0">{selectedWorkingCheckList?.taskName} Checklist To-Do's</h4>
          </div>
          <div>
            <Button.Ripple
              onClick={saveCheckList}
              color="success"
              outline
              className="me-1"
              disabled={loading}
            >
              <Check size={14} />
              <span className="align-middle ms-25">{loading ? 'saving...' : 'Submit'}</span>
            </Button.Ripple>
          </div>
        </div>
      )}

      {!selectedWorkingCheckList && (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
            <br />
            <br />
            <span style={{ paddingLeft: 15 }}>No active task</span>
          </div>
        </div>
      )}

      <Timeline data={todoList} />
    </Fragment>
  );
};

export default BasicTimeline;
