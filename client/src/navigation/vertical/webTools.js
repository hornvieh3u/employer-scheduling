// ** Icons Import
import { FaTasks } from 'react-icons/fa';
import { CheckCircle, Clock } from 'react-feather';

export default [
  {
    id: 'webtools',
    title: 'Web Tools',
    icon: <FaTasks size={20} />,
    children: [
      {
        id: 'social-proof',
        title: 'Social Proof',
        icon: <CheckCircle size={20} />,
        navLink: '/social-proof'
      },
      {
        id: 'social-scheduler',
        title: 'Social Scheduler',
        icon: <Clock size={20} />,
        navLink: '/social-scheduler'
      },
      {
        id: 'reputation',
        title: 'Reputation',
        icon: <CheckCircle size={20} />,
        navLink: '/reputation'
      }
    ]
  }
];
