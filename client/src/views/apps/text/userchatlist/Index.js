import React, { memo } from 'react';
import { ListGroup } from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
import { useDispatch } from 'react-redux';
import { activeTextContacts } from '../store';

function UserChatList({ query, filteredContacts, store }) {
  const dispatch = useDispatch();
  const { contacts } = store

  const UserChatActivity = async (event, Info, index) => {
    dispatch(activeTextContacts(Info));
  };

  if (contacts && contacts.length) {
    if (query.length && !filteredContacts.length) {
      return (
        <div className='no-results show'>
          <h6 className='mb-0'>No Chats Found</h6>
        </div>
      )
    } else {
      const arrToMap = query.length && filteredContacts.length ? filteredContacts : contacts
      return arrToMap.map(item => {
        return (
          <ListGroup className='m-0 p-0'>
            <div key={item.fullName}
              className="w-100 p-1 gap-1 d-flex align-items-center"
              onClick={(event) =>
                UserChatActivity(
                  event,
                  {
                    fullName: item?.fullName,
                    email: item?.email,
                    uid: item?._id,
                    phone: item?.phone
                  },
                )
              }
            >
              {item.photo ? (
                <Avatar img={item.photo} imgHeight="32" imgWidth="32" status="online" className="width-10-per" />
              ) : (
                <Avatar
                  className="width-10-per"
                  color="primary"
                  imgHeight="32"
                  imgWidth="32"
                  status="online"
                  content={item.fullName.charAt(0).toUpperCase() || 'N/A'}
                />
              )}
              <div className='chat-info flex-grow-1'>
                <h5 className='mb-0'>{item.fullName}</h5>
              </div>
            </div>
          </ListGroup>
        )
      })
    }
  } else {
    return null
  }
}

export default memo(UserChatList);
