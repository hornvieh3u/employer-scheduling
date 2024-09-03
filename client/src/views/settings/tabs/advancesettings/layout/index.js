// ** React Imports
import { Fragment, useState, useEffect } from 'react';
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

// ** Store & Actions
import { getDataItem, createSmartListItem } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const Layout = (props) => {
  const [descriptiondetails, setDescriptiondetails] = useState();
  const [showdetails, setShowdetails] = useState(false);
  const expandcard = (item) => {
    setDescriptiondetails(item);
    setShowdetails(true);
  };
  const dispatch = useDispatch();
  const store = useSelector((state) => state.smartList);

  const [activecard, setActivecard] = useState('');
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [modalData, setModalData] = useState({});

  const saveSmartListItem = () => {
    dispatch(
      createSmartListItem({
        listId: store.listId,
        afterCamp: modalData.afterCamp,
        contactType: modalData.contactType,
        customInfo: modalData.customInfo,
        membershipInfo: modalData.membershipInfo,
        creteria: modalData.creteria,
        title: modalData.title
      })
    );
    dispatch(
      getDataItem({
        listId: store.listId
      })
    );
    setItemmodal(!itemmodal);
  };
  const changeTab = (index) => {
    setModalData(index);
  };
  useEffect(() => {
    dispatch(
      getDataItem({
        listId: store.listId
      })
    );
  }, [dispatch, store.listId]);
  return !showdetails ? (
    <>
      <div>
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody className="p-3">
            <Modaldata
              changeTab={changeTab}
              title=""
              creteria=""
              contactType={[]}
              customInfo={[]}
              afterCamp={[]}
              membershipInfo={[]}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancle
            </Button>{' '}
            <Button color="btn btn-primary" onClick={saveSmartListItem}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list p-1">
          <Row>
            {store.smartListsItem.map((item, index) => (
              <Col lg="4" sm="6">
                <div
                  className={`card border${
                    activecard === item.title ? ' border border-primary' : ''
                  }`}
                  onClick={() => {
                    setActivecard(item.title);
                    expandcard(item);
                  }}
                >
                  <Card
                    togglemodal={toggleitemmodal}
                    title={item.title}
                    date={item.createdAt}
                    creteria={item.creteria}
                    contactType={item.contactType}
                    customInfo={item.customInfo}
                    afterCamp={item.afterCamp}
                    membershipInfo={item.membershipInfo}
                    itemId={item._id}
                    listId={store.listId}
                  />
                </div>
              </Col>
            ))}
            <Col lg="4" sm="6">
              <div className="card w-100 p-1 ">
                <div className="card-body text-center p-3 w-100 ">
                  <button onClick={toggleitemmodal} className="btn btn-primary ">
                    Add New Item
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    </>
  ) : (
    <Description setShowdetails={setShowdetails} descriptiondetails={descriptiondetails} />
  );
};

export default Layout;
