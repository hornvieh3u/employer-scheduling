/* eslint-disable no-unused-vars */
import { Fragment } from 'react';

// ** myforms App Component Imports
import Sidebar from './components/Sidebar';

// ** Third Party Components
import '@styles/react/apps/app-email.scss';
import Table from './components/Table';

const Birthday = ({}) => {
  return (
    <Fragment>
      <Sidebar sidebarOpen={false} />
      <div className="content-right">
        <div className="content-body">
          <div>
            <Table />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Birthday;
