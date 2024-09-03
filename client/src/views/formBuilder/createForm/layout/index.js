// ** React Imports
import { Fragment, useState } from 'react';

// ** React Router Import
import { Link } from 'react-router-dom'

// ** User List Component
import DataTable from 'react-data-table-component';
import { MoreVertical, Edit, Eye } from 'react-feather';

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Card,
  CardTitle,
  CardText
} from 'reactstrap';
import { Plus } from 'react-feather';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';

const Layout = () => {

  const [activecard, setActivecard] = useState('');
  const [tabledata, setTabledata] = useState([]);
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [rankmodal, setRankmodal] = useState(false);
  const togglerankmodal = () => setRankmodal(!rankmodal);
  return (
    <div className="m-1 col-md-3">
      <Fragment>
          <Card body className="my-2" style={{width: '18rem' }}>
          <CardTitle tag="h5">
            Add New Template
          </CardTitle>
            <Plus size={80} stroke="purple" className="d-flex align-self-center my-2"/>
          <Button color="primary">
            Add
          </Button>
      </Card>            
      </Fragment>
    </div>
  );
};

export default Layout;
