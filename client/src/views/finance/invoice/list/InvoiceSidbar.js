/* eslint-disable no-unused-vars */
// ** React Imports
import { Link, useParams } from 'react-router-dom';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { useState } from 'react';

const InvoiceSidbar = (props) => {
  const [active, setactive] = useState('THIS MONTH');
  // ** Props
  const handleActiveItem = (value) => {
    if (active === value) {
      return true;
    } else {
      return false;
    }
  };
  const handlechange = (value) => {
    setactive(value);
  };
  return (
    <div className={classnames('sidebar-left')}>
      <div className="sidebar h-100">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Button
                tag={Link}
                to={{
                  pathname: '/invoice/add',
                  state: {
                    type: 'add'
                  }
                }}
                color="primary"
                className='w-100'
              >
                Create Invoice
              </Button>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('This Week')}
                  onClick={() => {
                    handlechange('This Week');
                  }}
                >
                  <span className="align-middle">This Week</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('THIS MONTH')}
                  onClick={() => {
                    handlechange('THIS MONTH');
                  }}
                >
                  <span className="align-middle">This Month</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('NEXT MONTH')}
                  onClick={() => {
                    handlechange('NEXT MONTH');
                  }}
                >
                  <span className="align-middle">Next Month</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {0}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
              <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('personal')}
                  action
                  onClick={() => {
                    handlechange('personal');
                  }}
                >
                  <span className="bullet bullet-sm bullet-warning me-1"></span>
                  Waiting
                  <Badge className="float-end" color="light-primary" pill>
                    {0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('company')}
                  action
                  onClick={() => {
                    handlechange('company');
                  }}
                >
                  <span className="bullet bullet-sm bullet-primary me-1"></span>
                  Viewed
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('important')}
                  action
                  onClick={() => {
                    handlechange('important');
                  }}
                >
                  <span className="bullet bullet-sm bullet-success me-1"></span>
                  Completed
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('private')}
                  onClick={() => {
                    handlechange('private');
                  }}
                  action
                >
                  <span className="bullet bullet-sm bullet-danger me-1"></span>
                  Expired
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSidbar;
