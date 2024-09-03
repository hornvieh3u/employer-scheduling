// ** React Imports
import { Link, useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Star, Info, Trash, PhoneCall } from 'react-feather';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { log } from '@craco/craco/lib/logger';

const Sidebar = (props) => {
  // ** Props
  const {
    store,
    sidebarOpen,
    toggleCompose,
    dispatch,
    // getMails,
    // resetSelectedMail,
    setSidebarOpen,
    setActiveItem,
    activeItem
  } = props;

  // ** Vars
  const params = useParams();

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    setActiveItem(folder);
    // dispatch(getMails({ ...store.params, folder }))
    // dispatch(resetSelectedMail())
  };

  const handleLabel = (label) => {
    // dispatch(getMails({ ...store.params, label }))
    // dispatch(resetSelectedMail())
  };

  const handleComposeClick = () => {
    toggleCompose();
    setSidebarOpen(false);
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    const params1 = window.location.pathname.split('/apps/depositfunds/');

    if (params1[1] === value) {
      return true;
    }
    // if (
    //     (params.folder && params.folder === value) ||
    //     (params.label && params.label === value)
    // ) {
    //     return true
    // } else {
    //     return false
    // }
  };

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Button className="compose-email" color="primary" block
                onClick={() => handleFolder('buy_number')}
                action
                active={
                  activeItem == 'buy_number'
                  //    handleActiveItem('buy_number')
                }>
                My Number
              </Button>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem
                  // tag={Link}
                  // to="/apps/depositfunds/sms"
                  onClick={() => handleFolder('sms')}
                  action
                  active={
                    activeItem == 'sms'
                    //!Object.keys(params).length ||
                    // handleActiveItem('sms')
                  }
                >
                  <Mail size={18} className="me-75" />
                  <span className="align-middle">Sms</span>
                </ListGroupItem>
                <ListGroupItem
                  // tag={Link}
                  // to="/apps/depositfunds/voice"
                  onClick={() => handleFolder('voice')}
                  action
                  active={
                    activeItem == 'voice'
                    //    handleActiveItem('voice')
                  }
                >
                  <Send size={18} className="me-75" />
                  <span className="align-middle">Voice</span>
                </ListGroupItem>

                <ListGroupItem
                  // tag={Link}
                  // to="/apps/depositfunds/wallet"
                  onClick={() => handleFolder('wallet')}
                  action
                  active={
                    activeItem == 'wallet'
                    //    handleActiveItem('wallet')
                  }
                >
                  <Edit2 size={18} className="me-75" />
                  <span className="align-middle">Wallet</span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
