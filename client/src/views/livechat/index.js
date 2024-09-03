import { Fragment, useState } from 'react';
import Sidebar from './components/Sidebar';
import '@styles/react/apps/app-email.scss';

const liveChatSettingPage = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
        <Fragment>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Fragment>
      </div>
    </div>
  );
};

export default liveChatSettingPage;
