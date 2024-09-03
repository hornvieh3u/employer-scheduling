// ** React Imports
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Briefcase, Menu, Package, Users, TrendingUp, GitMerge, User, Folder, X } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

// custom import
import Relationship from './tabs/relationship';

// ** Components imports live chat layout etc

// ** Reactstrap Imports

const Sidebar = (props) => {
  // store
  const store = useSelector((state) => state.formBuilder);
  // ** Props
  const { sidebarOpen, setSidebarOpen, id } = props;
  const [active, setActive] = useState('7');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  let formData;
  if(store.currentForm != null){
    formData = store.currentForm.data;
  } else{
    store.forms.map((item) => {
      if(item._id == id)
        formData = item;
    })
  }

  return (
    <>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <div className="form-group-compose text-center compose-btn">
                <h2 className='mb-2'>{formData.name}</h2>
                  <Button color="primary" className='d-flex w-100 justify-content-center'>Add Step</Button>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('7')}
                    active={active === '7'}
                  >
                    {/* <span className="align-middle"></span> */}
                    Form
                    <X size={18} className="float-end" />
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
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
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="7">{/* <Relationship /> */}</TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
