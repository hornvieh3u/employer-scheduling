// ** Icons Import
import { PieChart, Minimize, BarChart2, Trello } from 'react-feather';
import { GrCertificate } from 'react-icons/gr';
import { FaBirthdayCake } from 'react-icons/fa';
import { MdOutlineBusinessCenter } from 'react-icons/md';

export default [
  {
    id: 'business',
    title: 'My Business',
    icon: <MdOutlineBusinessCenter size={20} />,
    action: 'manage',
    resource: 'business',
    children: [
      {
        id: 'projectManager',
        title: 'Projects',
        icon: <Trello size={20} />,
        navLink: '/business/projectmanager',
        action: 'manage',
        resource: 'business/projectManager',
      },
      {
        id: 'retention',
        title: 'Retention',
        icon: <PieChart size={20} />,
        navLink: '/business/retention',
        action: 'manage',
        resource: 'business/retention',
      },
      {
        id: 'birthday',
        title: 'Birthday',
        icon: <FaBirthdayCake size={20} />,
        navLink: '/business/birthday',
        action: 'manage',
        resource: 'business/birthday',
      },
      {
        id: 'expired',
        title: 'Expired',
        icon: <Minimize size={20} />,
        navLink: '/business/expired',
        action: 'manage',
        resource: 'business/expired',
      },
      {
        id: 'statistics',
        title: 'Statistics',
        icon: <BarChart2 size={20} />,
        navLink: '/business/statistics',
        action: 'manage',
        resource: 'business/statistics',
      },
      {
        id: 'certifications',
        title: 'Progression',
        icon: <GrCertificate size={20} />,
        navLink: '/business/progression',
        action: 'manage',
        resource: 'business/certifications',
      }
    ]
  }
];
