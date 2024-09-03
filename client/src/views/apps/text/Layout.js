import React, { memo, useState, useEffect } from 'react';
import { Card } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch, useSelector } from 'react-redux';
const ProfileAvatar = React.lazy(() => import('../../apps/text/Profile'));
const UserChatList = React.lazy(() => import('../../apps/text/userchatlist/Index'));
const RenderChats = React.lazy(() => import('../../apps/text/renderChats/Index'));
const ChatRoomHeader = React.lazy(() => import('./chatroomHeader'));
const ChatRoom = React.lazy(() => import('./chartroom/index'));
const MessageInput = React.lazy(() => import('./MessageServes/index'));
// ** Third Party Components
import msgImg from '../../../assets/images/messages/unselect_msg.png';
import SidebarHeader from './SidebarHeader';
import { selectChat } from './store'

import { isObjEmpty } from '@utils'

//fake data
const data = {
  profileUser: {
    id: 11,
    avatar: require('@src/assets/images/portrait/small/avatar-s-11.jpg').default,
    fullName: 'John Doe',
    role: 'admin',
    about:
      'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  },
  contacts: [
    {
      id: 1,
      fullName: 'Felecia Rower',
      role: 'Frontend Developer',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',

      avatar: require('@src/assets/images/portrait/small/avatar-s-2.jpg').default,
      status: 'offline'
    },
    {
      id: 2,
      fullName: 'Adalberto Granzin',
      role: 'UI/UX Designer',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-1.jpg').default,
      status: 'busy'
    },
    {
      id: 3,
      fullName: 'Joaquina Weisenborn',
      role: 'Town planner',
      about:
        'Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Verla Morgano',
      role: 'Data scientist',
      about:
        'Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-4.jpg').default,
      status: 'online'
    },
    {
      id: 5,
      fullName: 'Margot Henschke',
      role: 'Dietitian',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      avatar: require('@src/assets/images/portrait/small/avatar-s-5.jpg').default,
      status: 'busy'
    },
    {
      id: 6,
      fullName: 'Sal Piggee',
      role: 'Marketing executive',
      about:
        'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
      status: 'online'
    },
    {
      id: 7,
      fullName: 'Miguel Guelff',
      role: 'Special educational needs teacher',
      about:
        'Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
      status: 'online'
    },
    {
      id: 8,
      fullName: 'Mauro Elenbaas',
      role: 'Advertising copywriter',
      about:
        'Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
      status: 'away'
    },
    {
      id: 9,
      fullName: 'Bridgett Omohundro',
      role: 'Designer, television/film set',
      about:
        'Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.',
      avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
      status: 'offline'
    },
    {
      id: 10,
      fullName: 'Zenia Jacobs',
      role: 'Building surveyor',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',
      avatar: require('@src/assets/images/portrait/small/avatar-s-10.jpg').default,
      status: 'away'
    }
  ],
  chats: [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 0,
      contact: {
        fullName: 'Felecia Rower',
      role: 'Frontend Developer',
      about: 'Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing',

      photo: require('@src/assets/images/portrait/small/avatar-s-2.jpg').default,
      status: 'offline',
      },
      chat: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hello. How can I help You?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'We need to check if we can provide you such information.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'I will inform you as I get update on this.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 2
        },
        // {
        //   message: 'If it takes long you can mail me at my mail address.',
        //   time: dayBeforePreviousDay,
        //   senderId: 11
        // }
      ]
    },
    {
      id: 2,
      userId: 2,
      unseenMsgs: 1,
      contact: {
        fullName: 'Adalberto Granzin',
        role: 'UI/UX Designer',
        about:
          'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
          photo: require('@src/assets/images/portrait/small/avatar-s-1.jpg').default,
        status: 'busy',
      },
      chat: [
        {
          message: "How can we help? We're here for you!",
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'It should be Bootstrap 5 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Modern admin is the responsive bootstrap 5 admin template.!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Looks clean and fresh UI.',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: "It's perfect for my next project.",
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'How can I purchase it?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Thanks, from ThemeForest.',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 11
        },
        // {
        //   message: 'I will purchase it for sure. 👍',
        //   time: previousDay,
        //   senderId: 1
        // }
      ]
    }
  ]
}

function Layout() {
  const dispatch = useDispatch();
  const [studentType, setStudentType] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('')
  const [sidebar, setSidebar] = useState(false)
  const [filteredChat, setFilteredChat] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [active, setActive] = useState(0)
  const { userData } = useSelector((state) => state.auth);
  const store = useSelector((state) => state.text);
  const { chats, contacts } = store

  const handleSidebar = () => setSidebar(!sidebar)

  // ** Handles User Chat Click
  const handleUserClick = id => {
    dispatch(selectChat(id))
    setActive(id)
    if (sidebar === true) {
      handleSidebar()
    }
  }

  useEffect(() => {
    if (!isObjEmpty(store.selectedUser)) {
      if (store.selectedUser.chat) {
        setActive(store.selectedUser.chat.id)
      } else {
        setActive(store.selectedUser.contact.id)
      }
    }
  }, [])

  const handleEventType = async (e) => {
    let { value } = e;
    await setLoading(true);
    await setStudentType(value);
    await setLoading(false);
  };

  const handleFilter = e => {
    setQuery(e.target.value)
    const searchFilterFunction = contact => contact.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    const filteredChatsArr = chats.filter(searchFilterFunction)
    const filteredContactssArr = contacts.filter(searchFilterFunction)
    setFilteredChat([...filteredChatsArr])
    setFilteredContacts([...filteredContactssArr])
  }
  // its dummy variable
  let chatTextListIndex = 'dummy data';
  return (
    <div className="d-flex w-100">
      <div className="width-30-per p-1">
        <Card className="shadow-sm sidebar-content">
          <SidebarHeader userData={userData} store={store} handleFilter={handleFilter} query={query} />
          <div className='chat-user-list-wrapper list-group py-2' options={{ wheelPropagation: false }}>
            <h4 className='py-2'>Chats</h4>
            {/* <ul className='chat-users-list chat-list media-list'>{renderChats()}</ul> */}
            <RenderChats store={store} query={query} handleUserClick={handleUserClick} active={active} data={data} />
            <ProfileAvatar
              studentType={studentType}
              handleEventType={handleEventType}
            />
            <UserChatList className="chat-users-list contact-list media-list"
              loading={loading} setLoading={setLoading}
              studentType={studentType} store={store} query={query} filteredContacts={filteredContacts}
            />
          </div>
        </Card>
      </div>
      <div className='vr' style={{opacity: 0.3}} />
      {chatTextListIndex === null ? (
        <div className="width-70-per">
          <Card style={{ backgroundColor: '#FAFBFF' }} className="rounded-0 shadow-sm">
            <div
              style={{
                position: 'relative',
                overflow: 'auto',
                height: '60vh',
                justifyContent: 'center',
                display: 'flex'
              }}
              className="w-100"
            >
              <img src={msgImg} alt="logo" className="mr-1" />
            </div>
          </Card>
        </div>
      ) : (
        <div className="width-70-per">
          <ChatRoomHeader />
          <Card className="rounded-0 mb-0">
            <div
            className='bg-light'
              style={{
                position: 'relative',
                overflow: 'auto',
                height: '65vh'
              }}
            >
              <ChatRoom />
            </div>
            <MessageInput />
          </Card>
        </div>
      )}
    </div>
  );
}

export default memo(Layout);
