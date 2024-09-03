// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';

// ** Todo App Components
import Tasks from './Tasks';
import Sidebar from './Sidebar';
import TaskSidebar from './TaskSidebar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  getTasks,
  updateTask,
  selectTask,
  addTask,
  deleteTask,
  reOrderTasks,
  getFileAndFolders
} from './store';

// ** Styles
import '@styles/react/apps/app-todo.scss';

const TODO = () => {
  // ** States
  const drivers = [
    {
      id: 1,
      driverName: 'Google drive',
      totalStore: 50,
      usedStore: 35,
      img: require('@src/assets/images/icons/drive.png').default
    },
    {
      id: 2,
      driverName: 'Dropbox',
      totalStore: 2,
      usedStore: 1.2,
      img: require('@src/assets/images/icons/dropbox.png').default
    },
    {
      id: 3,
      driverName: 'OneDrive',
      totalStore: 2,
      usedStore: 1.6,
      img: require('@src/assets/images/icons/onedrivenew.png').default
    },
    {
      id: 4,
      driverName: 'iCloud',
      totalStore: 3,
      usedStore: 1.8,
      img: require('@src/assets/images/icons/icloud-1.png').default
    }
  ];

  const folders = [
    {
      id: 1,
      folderName: 'Projects',
      size: '2gb',
      lastModified: '01 Jan 2023',
      description: 'Last: 12 days ago'
    },
    {
      id: 2,
      folderName: 'Design',
      size: '5gb',
      lastModified: '05 Jan 2023',
      description: 'Last: 14 hours ago'
    },
    {
      id: 3,
      folderName: 'UI Kit',
      size: '7gb',
      lastModified: '05 Jan 2023',
      description: 'Last: 21 hours ago'
    },
    {
      id: 4,
      folderName: 'Documents',
      size: '6gb',
      lastModified: '05 Jan 2023',
      description: 'Last: 5 days ago'
    },
    {
      id: 5,
      folderName: 'Videos',
      size: '34gb',
      lastModified: '01 Jan 2023',
      description: 'Last: 2 hours ago'
    },
    {
      id: 6,
      folderName: 'Styles',
      size: '12gb',
      lastModified: '06 Jan 2023',
      description: 'Last: 23 hours ago'
    }
  ];

  const files = [
    {
      id: 7,
      folderName: 'Profile.jpg',
      size: '2gb',
      lastModified: '01 Jan 2023',
      description: 'Last: 12 days ago',
      img: require('@src/assets/images/icons/jpg.png').default
    },
    {
      id: 8,
      folderName: 'account.doc',
      size: '5gb',
      lastModified: '05 Jan 2023',
      description: 'Last: 14 hours ago',
      img: require('@src/assets/images/icons/doc.png').default
    },
    {
      id: 9,
      folderName: 'notes.txt',
      size: '7gb',
      lastModified: '05 Jan 2023',
      description: 'Last: 21 hours ago',
      img: require('@src/assets/images/icons/txt.png').default
    },
    {
      id: 10,
      folderName: 'users.json',
      size: '6gb',
      lastModified: '05 Jan 2023',
      description: 'Last: 5 days ago',
      img: require('@src/assets/images/icons/json.png').default
    }
  ];

  const [sort, setSort] = useState('');
  const [query, setQuery] = useState('');
  const [mainSidebar, setMainSidebar] = useState(false);
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.todo);

  // ** URL Params
  const paramsURL = useParams();
  const params = {
    filter: paramsURL.filter || '',
    q: query || '',
    sortBy: sort || '',
    tag: paramsURL.tag || ''
  };

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar);
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  // ** Get Tasks on mount & based on dependency change
  useEffect(() => {
    dispatch(
      getTasks({
        filter: paramsURL.filter || '',
        q: query || '',
        sortBy: sort || '',
        tag: paramsURL.tag || ''
      })
    );
    dispatch(getFileAndFolders('/'));
  }, [store.tasks.length, paramsURL.filter, paramsURL.tag, query, sort]);

  return (
    <Fragment>
      <Sidebar
        store={store}
        params={params}
        getTasks={getTasks}
        dispatch={dispatch}
        mainSidebar={mainSidebar}
        urlFilter={paramsURL.filter}
        setMainSidebar={setMainSidebar}
        handleTaskSidebar={handleTaskSidebar}
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            <div
              className={classnames('body-content-overlay', {
                show: mainSidebar === true
              })}
              onClick={handleMainSidebar}
            ></div>

            {store ? (
              <Tasks
                cols={{ md: '3', sm: '6', xs: '12' }}
                store={store}
                drivers={drivers}
                tasks={store.tasks}
                sort={sort}
                query={query}
                params={params}
                setSort={setSort}
                setQuery={setQuery}
                dispatch={dispatch}
                getTasks={getTasks}
                paramsURL={paramsURL}
                updateTask={updateTask}
                selectTask={selectTask}
                reOrderTasks={reOrderTasks}
                handleMainSidebar={handleMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
              />
            ) : null}

            <TaskSidebar
              store={store}
              params={params}
              addTask={addTask}
              dispatch={dispatch}
              open={openTaskSidebar}
              updateTask={updateTask}
              selectTask={selectTask}
              deleteTask={deleteTask}
              handleTaskSidebar={handleTaskSidebar}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TODO;
