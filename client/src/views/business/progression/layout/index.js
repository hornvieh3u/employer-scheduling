// ** React Imports
import { Fragment, useState } from 'react';
// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';

// ** User List Component
import DataTable from 'react-data-table-component';
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
  Input
} from 'reactstrap';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
import Modaldata from './Modaldata';
import Description from './Description';
const Layout = (props) => {
  const { title, subtitle1, subtitle2, des1, des2 } = props;

  const [descriptiondetails, setDescriptiondetails] = useState();
  const [showdetails, setShowdetails] = useState(false);
  const expandcard = (item) => {
    setDescriptiondetails(item);
    setShowdetails(true);
  };

  const [activecard, setActivecard] = useState('');
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  return !showdetails ? (
    <>
      <div>
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody className="p-3">
            <Modaldata />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancle
            </Button>{' '}
            <Button color="btn btn-primary" onClick={toggleitemmodal}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list p-1">
          <Row>
            {/* {carddata?.map((item, i) => (
                            <> */}
            <Col lg="4" sm="6">
              <div
                className={`card border${activecard === title ? ' border border-primary' : ''}`}
                onClick={() => {
                  setActivecard(title);
                  expandcard(props);
                }}
              >
                <Card
                  togglemodal={toggleitemmodal}
                  title={title}
                  subtitle1={subtitle1}
                  subtitle2={subtitle2}
                  des1={des1}
                  des2={des2}
                />
              </div>
            </Col>

            {/* </>))} */}
            <Col lg="4" sm="6">
              <div className="card w-100 p-1 ">
                <div className="card-body text-center p-3 w-100 ">
                  <button onClick={toggleitemmodal} className="btn btn-primary ">
                    Add New Item
                  </button>
                </div>
              </div>
            </Col>
            {/* <Col xl="12" className="p-2"><h4>Total Users with there role</h4><p>Find all your company adminstrator accounts and there roles</p></Col> */}
          </Row>

          {/* <DataTable
                        columns={columns}
                        data={tabledata}
                        pagination
                    /> */}
        </div>
      </Fragment>
    </>
  ) : (
    <Description setShowdetails={setShowdetails} descriptiondetails={descriptiondetails} />
  );
};

export default Layout;
