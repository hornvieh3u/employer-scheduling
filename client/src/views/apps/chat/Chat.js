// ** React Imports
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef, useMemo, useContext } from 'react';

// ** Custom Components0
import Avatar from '@components/avatar';

// ** Store & Actions
import { getChatContacts, selectChat, sendMsg } from './store';
import { useDispatch } from 'react-redux';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  MessageSquare,
  Menu,
  PhoneCall,
  Video,
  Search,
  MoreVertical,
  Mic,
  Image,
  Send
} from 'react-feather';

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown
} from 'reactstrap';
import { formatToShortName, getUserData } from '../../../utility/Utils';
import { SocketContext } from '../../../utility/context/Socket';

const ChatLog = (props) => {
  // ** Props & Store
  const { handleUser, handleUserSidebarRight, handleSidebar, store, userSidebarLeft } = props;
  const { userProfile, selectedUser } = store;

  // ** Refs & Dispatch
  const chatArea = useRef(null);
  const dispatch = useDispatch();

  // ** Socket Context
  const socket = useContext(SocketContext);

  // ** State
  const [msg, setMsg] = useState('');

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current);
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  // ** Selected Chat User Avatar
  const shortName = useMemo(() => {
    if (selectedUser && selectedUser.contactId) {
      const nameOrArr = selectedUser.contactId.fullName.split(' ');
      const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
      const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
      const firstLetter = firstPart[0].toUpperCase();
      const lastLetter = lastPart[0] ? lastPart[0].toUpperCase() : '';

      return firstLetter + ' ' + lastLetter;
    }
  }, [selectedUser]);

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    const selectedUserLen = Object.keys(selectedUser).length;
    if (selectedUserLen) {
      scrollToBottom();
    }
  }, [selectedUser]);

  // ** Init function
  useEffect(() => {
    // socket.on("adminMsgRev", (data) => {
    //   console.log("admin Message Rev", data)
    //   dispatch(getChatContacts())
    //   if(data.channelId === selectedUser._id) dispatch(selectChat(selectedUser._id))
    // })
    socket.onAny((eventName, data) => {
      switch (eventName) {
        case 'adminMsgRev':
          if (selectedUser._id == data.channelId) {
            dispatch(selectChat(selectedUser._id));
          }
          dispatch(getChatContacts());
          break;
        case 'clientMsgRev':
          if (selectedUser._id == data.channelId) {
            dispatch(selectChat(selectedUser._id));
          }
          dispatch(getChatContacts());

          break;
        case 'startChat':
          dispatch(getChatContacts());
      }
    });
    return () => {
      socket.off('adminMsgRev');
      socket.off('startChat');
      socket.off('clientMsgRev');
    };
  }, [selectedUser]);

  // ** Formats chat data based on sender
  const formattedChatData = () => {
    let chatLog = [];
    if (selectedUser.messages) {
      chatLog = selectedUser.messages;
    }

    const formattedChatLog = [];
    let chatMessageType = chatLog[0] ? chatLog[0].type : undefined;
    let msgGroup = {
      senderId: chatMessageType,
      messages: []
    };
    chatLog.forEach((msg, index) => {
      if (chatMessageType === msg.type) {
        msgGroup.messages.push({
          msg: msg.msg,
          time: msg.createdAt
        });
      } else {
        chatMessageType = msg.type;
        formattedChatLog.push(msgGroup);
        msgGroup = {
          senderId: msg.type,
          messages: [
            {
              msg: msg.msg,
              time: msg.createdAt
            }
          ]
        };
      }
      if (index === chatLog.length - 1) formattedChatLog.push(msgGroup);
    });
    return formattedChatLog;
  };

  // ** Renders user chat
  const renderChats = () => {
    return formattedChatData().map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.senderId !== 'adminMessage'
          })}
        >
          <div className="chat-avatar">
            <Avatar
              imgWidth={36}
              imgHeight={36}
              className="box-shadow-1 cursor-pointer"
              // img={item.senderId === 11 ? userProfile.avatar : selectedUser.contact.avatar}
              color="primary"
              content={
                item.senderId === 'adminMessage'
                  ? formatToShortName(getUserData()?.fullName)
                  : formatToShortName(selectedUser.contactId?.fullName)
              }
            />
          </div>

          <div className="chat-body">
            {item.messages.map((chat) => (
              <div key={chat._id} className="chat-content">
                <p>{chat.msg}</p>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = (obj) => {
    handleUserSidebarRight();
    handleUser(obj);
  };

  // ** On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {
    if (!Object.keys(selectedUser).length && !userSidebarLeft && window.innerWidth < 992) {
      handleSidebar();
    }
  };

  // ** Sends New Msg
  const handleSendMsg = (e) => {
    e.preventDefault();
    if (msg.length) {
      // dispatch(sendMsg({ channelId: selectedUser._id, message: msg, messageType: 'adminMessage' }))
      socket.emit('adminMsgSend', {
        channelId: selectedUser._id,
        message: msg
      });
      setMsg('');
    }
  };

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper =
    Object.keys(selectedUser).length && selectedUser.messages ? PerfectScrollbar : 'div';

  return (
    <div className="chat-app-window">
      <div
        className={classnames('start-chat-area', {
          'd-none': Object.keys(selectedUser).length
        })}
      >
        <div className="start-chat-icon mb-1">
          <MessageSquare />
        </div>
        <h4 className="sidebar-toggle start-chat-text" onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {Object.keys(selectedUser).length ? (
        <div
          className={classnames('active-chat', {
            'd-none': selectedUser === null
          })}
        >
          <div className="chat-navbar">
            <header className="chat-header">
              <div className="d-flex align-items-center">
                <div className="sidebar-toggle d-block d-lg-none me-1" onClick={handleSidebar}>
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight="36"
                  imgWidth="36"
                  color="primary"
                  // img={selectedUser.contact.avatar}
                  content={shortName || 'N/A'}
                  // Todo: status={selectedUser.contact.status}
                  status="online"
                  className="avatar-border user-profile-toggle m-0 me-1"
                  onClick={() => handleAvatarClick(selectedUser.contactId)}
                />
                <h6 className="mb-0">{selectedUser.contactId?.fullName}</h6>
              </div>
              <div className="d-flex align-items-center">
                <PhoneCall size={18} className="cursor-pointer d-sm-block d-none me-1" />
                <Video size={18} className="cursor-pointer d-sm-block d-none me-1" />
                <Search size={18} className="cursor-pointer d-sm-block d-none" />
                <UncontrolledDropdown className="more-options-dropdown">
                  <DropdownToggle className="btn-icon" color="transparent" size="sm">
                    <MoreVertical size="18" />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </header>
          </div>

          <ChatWrapper ref={chatArea} className="user-chats" options={{ wheelPropagation: false }}>
            {selectedUser ? <div className="chats">{renderChats()}</div> : null}
          </ChatWrapper>

          <Form className="chat-app-form" onSubmit={(e) => handleSendMsg(e)}>
            <InputGroup className="input-group-merge me-1 form-send-message">
              <InputGroupText>
                <Mic className="cursor-pointer" size={14} />
              </InputGroupText>
              <Input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message or use speech to text"
              />
              <InputGroupText>
                <Label className="attachment-icon mb-0" for="attach-doc">
                  <Image className="cursor-pointer text-secondary" size={14} />
                  <input type="file" id="attach-doc" hidden />
                </Label>
              </InputGroupText>
            </InputGroup>
            <Button className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
};

export default ChatLog;
