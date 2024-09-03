// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button } from 'reactstrap';
import { Menu } from 'react-feather';
import { BsFillEyeFill } from 'react-icons/bs';

// ** Email App Component Imports

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Styles
import '@styles/react/apps/app-email.scss';
//Role
import Role from './tabs/roles';
// import GoogleMapReact from ''

const Contact = () => {
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
    <>
      <div className="overflow-hidden email-application">
        <div className="content-overlay"></div>
        <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
          <Fragment>
            <div className="content-right-formBuilder">
              <div className="content-body">
                <div
                  className={classnames('body-content-overlay', {
                    show: sidebarOpen
                  })}
                  onClick={() => setSidebarOpen(false)}
                ></div>
                <div className="email-app-list">
                  <div className="app-fixed-search d-flex d-lg-none align-items-center"></div>
                  <div className="card p-2">
                    <Form>
                      <Row noGutters className="d-flex flex-row-reverse">
                        <Col md="6">
                          <Input id="search" name="searchInput" placeholder="search" type="text" />
                        </Col>
                        <Col md={6} lg={6} sm={4}>
                          <h2>Contacts</h2>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  <Role />
                </div>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
};

export default Contact;
