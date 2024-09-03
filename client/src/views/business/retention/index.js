import { Fragment, useState } from 'react';
import Sidebar from './components/Sidebar';
import '@styles/react/apps/app-email.scss';
import Table from './components/Table';

const Retention = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Fragment>
        <Sidebar sidebarOpen={sidebarOpen} />
        <div className="content-right">
          <div className="content-body">
            <div>
              <Table />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Retention;
