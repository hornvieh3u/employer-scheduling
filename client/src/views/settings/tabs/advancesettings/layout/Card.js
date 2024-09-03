import React, { useState } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Edit, Copy, Trash, Download, MoreVertical } from 'react-feather';
import { Link } from 'react-router-dom';
//**timeline component
import AvatarGroup from '@components/avatar-group';
import { format } from 'date-fns';
// ** Store & Actions
import { removeSmartListItem, getDataItem, updateSmartListItem } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Modaldata from './Modaldata';

function Card(props) {
  const avatarGroupArr = [
    // {
    //     imgWidth: 25,
    //     imgHeight: 25,
    //     title: 'Progression ',
    //     placement: 'bottom',
    //     img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    // },
    // {
    //     imgWidth: 25,
    //     imgHeight: 25,
    //     title: 'Amy Carson',
    //     placement: 'bottom',
    //     img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default
    // },
    // {
    //     imgWidth: 25,
    //     imgHeight: 25,
    //     title: 'Brandon Miles',
    //     placement: 'bottom',
    //     img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default
    // },
    // {
    //     imgWidth: 25,
    //     imgHeight: 25,
    //     title: 'Daisy Weber',
    //     placement: 'bottom',
    //     img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
    // },
    // {
    //     imgWidth: 25,
    //     imgHeight: 25,
    //     title: 'Jenny Looper',
    //     placement: 'bottom',
    //     img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
    // }
  ];
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [modalData, setModalData] = useState({});

  const {
    title,
    date,
    creteria,
    contactType,
    customInfo,
    afterCamp,
    membershipInfo,
    itemId,
    listId
  } = props;
  const dispatch = useDispatch();

  const changeTab = (index) => {
    setModalData(index);
  };

  const removeItem = () => {
    dispatch(
      removeSmartListItem({
        listId: listId,
        itemId: itemId
      })
    );
    dispatch(
      getDataItem({
        listId: listId
      })
    );
  };

  const btnUpdateSmartListItem = () => {
    dispatch(
      updateSmartListItem({
        itemId: itemId,
        value: {
          afterCamp: modalData.afterCamp,
          contactType: modalData.contactType,
          customInfo: modalData.customInfo,
          membershipInfo: modalData.membershipInfo,
          creteria: modalData.creteria,
          title: modalData.title
        }
      })
    );
    dispatch(
      getDataItem({
        listId: listId
      })
    );
    setItemmodal(!itemmodal);
  };

  return (
    <>
      <div>
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody className="p-3">
            <Modaldata
              changeTab={changeTab}
              title={title}
              creteria={creteria}
              contactType={contactType}
              customInfo={customInfo}
              afterCamp={afterCamp}
              membershipInfo={membershipInfo}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancle
            </Button>{' '}
            <Button color="btn btn-primary" onClick={btnUpdateSmartListItem}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="card-body p-2">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">{title}</h4>
          <UncontrolledDropdown className="chart-dropdown">
            <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
              <MoreVertical size={18} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className="w-100" onClick={toggleitemmodal}>
                <Edit size={18} className="cursor-pointer" /> &nbsp; Edit
              </DropdownItem>
              <DropdownItem className="w-100" onClick={removeItem}>
                <Trash size={18} className="cursor-pointer" /> &nbsp; Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="">
            Date <br />
            <small className="text-muted">{format(new Date(date), 'MM/dd/yy')}</small>
          </h6>
          <h6 className="">{creteria}</h6>
        </div>
      </div>
    </>
  );
}

export default Card;
