// ** Icons Import

import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { AiOutlineCalculator } from 'react-icons/ai';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { User } from 'react-feather';

export default [
  {
    id: 'myCMA',
    title: 'MYCMA',
    icon: <RiMoneyDollarBoxLine size={20} />,
    action: 'manage',
    resource: 'myCMA',
    children: [
      {
        id: 'myaccount',
        title: 'My Account',
        icon: <RiMoneyDollarBoxLine size={20} />,
        navLink: '/mycma/myaccount',
        action: 'manage',
        resource: 'mycma/myaccount',
      },
      {
        id: 'members',
        title: 'Members',
        icon: <GiReceiveMoney size={20} />,
        navLink: '/mycma/members',
        action: 'manage',
        resource: 'mycma/members',
      },
      // {
      //     id: 'onlineuniv',
      //     title: 'CMA Online University',
      //     icon: <GiPayMoney size={20} />,
      //     children: [
      //         {
      //             id: 'little-tigers',
      //             title: 'Little Tigers',
      //             icon: <GiPayMoney size={20} />,
      //             navLink: '/mycma/onlineuniv/little-tiger'
      //         },
      //         {
      //             id: 'color-belts',
      //             title: ' Color Belts',
      //             icon: <GiPayMoney size={20} />,
      //             navLink: '/mycma/onlineuniv/color-belts'
      //         },
      //         {
      //             id: 'black-belts',
      //             title: 'Black Belts',
      //             icon: <GiPayMoney size={20} />,
      //             navLink: '/mycma/onlineuniv/black-belts'
      //         },
      //         {
      //             id: 'general-tips',
      //             title: 'General Tips',
      //             icon: <GiPayMoney size={20} />,
      //             navLink: '/mycma/onlineuniv/general-tips'
      //         },
      //         {
      //             id: 'parent-tips',
      //             title: 'Parent Tips',
      //             icon: <GiPayMoney size={20} />,
      //             navLink: '/mycma/onlineuniv/parent-tips'
      //         },
      //         {
      //             id: 'tournament-tips',
      //             title: 'Tournament Tips',
      //             icon: <GiPayMoney size={20} />,
      //             navLink: '/mycma/onlineuniv/tournament-tips'
      //         }
      //     ]
      // },
      // {
      //     id: 'businessuniv',
      //     title: 'Business University',
      //     icon: <AiOutlineCalculator size={20} />,
      //     navLink: '/mycma/business-university'
      // },
      {
        id: 'courses',
        title: 'MY Courses',
        icon: <AiOutlineCalculator size={20} />,
        navLink: '/mycma/courses',
        action: 'manage',
        resource: 'mycma/courses',
      },
      {
        id: 'userCourses',
        title: 'User Courses',
        icon: <User size={20} />,
        navLink: '/mycma/usercourses',
        action: 'manage',
        resource: 'mycma/myaccount',
      },
      {
        id: 'hostEvent',
        title: 'Host an Event',
        icon: <AiOutlineCalculator size={20} />,
        navLink: '/mycma/event',
        action: 'manage',
        resource: 'mycma/hostEvent',
      },
      {
        id: 'faq',
        title: 'FAQ',
        icon: <AiOutlineCalculator size={20} />,
        navLink: '/mycma/faq',
        action: 'manage',
        resource: 'mycma/faq',
      }
    ]
  }
];
