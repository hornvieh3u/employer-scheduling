// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Menu } from 'react-feather';

// ** Email App Component Imports

import Layout from './layout';

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-email.scss';

const Progression = () => {
  // ** States
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount

  return (
    <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="container-xxl p-0 animate__animated animate__fadeIn">
        <Fragment>
          <div className="content-right-special">
            <div className="content-body">
              <div
                className={classnames('body-content-overlay', {
                  show: sidebarOpen
                })}
                onClick={() => setSidebarOpen(false)}
              ></div>
              <div className="email-app-list">
                <div className="app-fixed-search d-flex d-lg-none align-items-center">
                  <div
                    className="sidebar-toggle d-block d-lg-none ms-1"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu size="21" />
                  </div>
                </div>
                  <h2>Automations</h2>
                <Layout
                  title="Progression 1"
                  subtitle1="ProgressionSubTitle1"
                  subtitle2="ProgressionSubTitle2"
                  des1="des 1"
                  des2="des 2"
                />
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default Progression;
