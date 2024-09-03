import React, { memo, useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getMessageContacts } from '../store';

function ChatRoom() {
  const dispatch = useDispatch();

  const { ActiveContact, messages } = useSelector((state) => state.text);

  const [getMessages, setMessages] = useState([]);
  const [Daywisedata, setDayWisedata] = useState([]);
  const chatContainer = React.createRef(null);

  useEffect(() => {
    dispatch(getMessageContacts(ActiveContact?.uid));
  }, [ActiveContact]);

  useEffect(() => {
    chatContainer.current.scrollIntoView();
  }, [getMessages]);

  let scrollToBottom = () => {
    const section = document.querySelector('#last_message');
    const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
    if (section) {
      section.scrollIntoView({ overscrollBehavior: 'none' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  });

  const getdata = () => {
    let modifydata = [];
    if (getMessages?.length > 0) {
      let list = [];
      let time = getMessages[0]['time'];
      for (var i of getMessages) {
        if (moment(i?.time).format('MM/DD/YYYY') !== moment(time).format('MM/DD/YYYY')) {
          time = moment(i?.time).format('MM/DD/YYYY');
          list.push(time);
        }
      }
      let uniqueChars = [...new Set(list)];
      for (var date of uniqueChars) {
        const filterdata = getMessages.filter(
          (item) => date === moment(item?.time).format('MM/DD/YYYY')
        );
        modifydata.push({ time: date, item: filterdata });
      }
    }
    setDayWisedata(modifydata);
  };
  useEffect(() => {
    getdata();
  }, [getMessages]);

  return (
    <div
      style={{
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
      id={'chats'}
      className="chats"
    >
      <div>
        <div className="chatsMsg">
          {Object.keys(ActiveContact).length > 0 &&
            messages.length > 0 &&
            messages?.map((chat, i) => {
              return (
                <div
                  key={i}
                  id={i === messages.length - 1 ? 'last_message' : null}
                  // className="chat-left"
                  className={`${chat?.email === chat?.email ? 'chat-right' : 'chat-left'}`}
                >
                  <div className="chat-body">
                    <div
                      // style={{ maxWidth: '50%' }}
                      className="chat-content"
                    >
                      {' '}
                      {chat.textContent}
                      {/* <p>{chat.message}</p> */}
                    </div>
                    <div className="chat-time">{/* <p>{timeFormat(chat.timestamp)}</p> */}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div ref={chatContainer} id={'last_message'} />
    </div>
  );
}

export default memo(ChatRoom);
